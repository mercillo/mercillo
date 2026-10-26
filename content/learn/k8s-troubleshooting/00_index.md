# Kubernetes Troubleshooting

Built via `/troubleshootingk8s` — signal-driven diagnostic flowcharts for scenario-based K8s troubleshooting interviews. Each file teaches reading signals and reasoning to the next check, not memorizing a flat cause list. Files are grouped by **entry signal** — what you'd actually observe first — not by component name, since telling similar-looking signals apart is the real interview skill.

## Signal Map — start here

| What you'd actually observe first | Go to | The question that resolves it |
|---|---|---|
| A pod never leaves `Pending` | [01-pending-pods.md](01-pending-pods.md) | Is `spec.nodeName` set? (scheduler-side vs. kubelet-side) |
| `kubectl` doesn't respond at all, or every command errors | [02-apiserver-unreachable.md](02-apiserver-unreachable.md) | Did any response come back at all — even a rejection? |
| `kubectl` works fine, but new pods never *place*, or deleted pods never get *replaced* | [03-scheduler-vs-controller-manager.md](03-scheduler-vs-controller-manager.md) | Is it placement that's missing, or replacement? |
| Cluster feels slow/inconsistent, or a direct health check already failed | [04-etcd-failure.md](04-etcd-failure.md) | Is etcd responding at all, even slowly, or fully unresponsive? |
| A pod got Running, then started dying repeatedly | [05-crashloopbackoff.md](05-crashloopbackoff.md) | Does it crash immediately, or after running for a while? |
| Pods are Running and Ready, but something's still unreachable | [06-networking-services.md](06-networking-services.md) | Pod IP direct → ClusterIP → DNS name — which rung first fails? |

**How to use this table live:** start at the left column with whatever you'd *actually* notice first, not the component name — "kubectl just hangs" and "kubectl says Forbidden" both route to file 02, but "a pod's stuck Pending with no events" can mean either file 01 (one pod, a `schedulerName`/gate issue) or file 03 (every new pod, the scheduler component itself is down) — the files cross-reference each other exactly where this ambiguity exists.

---

## File Details (sub-signals within each file)

### 1. [Pending Pods](01-pending-pods.md)
First glance: STATUS text + RESTARTS=0 rules out CrashLoop/OOM. Fork: is `spec.nodeName` set?
- **No node (scheduler-side):** Insufficient cpu/memory, untolerated taint, affinity mismatch, unbound PVC/zone conflict, no scale-up, silent/no-events
- **Node set (kubelet-side):** ImagePullBackOff, Init:N/M, CreateContainerConfigError, FailedMount/FailedAttachVolume, FailedCreatePodSandBox
- **Off-path:** CrashLoopBackOff, OOMKilled, quota rejection, Node NotReady reschedule

### 2. [apiserver Unreachable](02-apiserver-unreachable.md)
First glance: try any `kubectl` command. Fork: did any response come back at all?
- **No response (transport/TLS):** connection refused, timeout, certificate expired/invalid
- **Response came back (HTTP-level):** 401 Unauthorized, 403 Forbidden
- **Off-path:** wrong kubectl context, client-side DNS failure, LB/VIP down with apiservers fine, firewall blocking just you

### 3. [Scheduler vs. Controller-Manager](03-scheduler-vs-controller-manager.md)
Assumes apiserver is healthy (file 02 ruled out). Fork: is placement missing, or replacement missing?
- **Placement missing (scheduler):** pod Pending with zero events (cluster-wide), kube-scheduler pod itself down
- **Replacement missing (controller-manager):** deleted/crashed pod never replaced, kube-controller-manager pod itself down
- **Off-path:** a real scheduling constraint (→ file 01), ReplicaSet intentionally scaled to 0, HPA/autoscaler not reacting

### 4. [etcd Failure](04-etcd-failure.md)
Assumes apiserver is reachable (file 02 ruled out). Fork: is etcd responding at all, even slowly?
- **Degraded but responding (resource):** slow disk I/O, NOSPACE alarm (disk full), DB large/uncompacted
- **Unresponsive (quorum):** one member down (quorum intact), majority down (true quorum loss), members up but can't reach consensus (peer TLS)
- **Off-path:** apiserver itself down (→ file 02), scheduler/controller-manager down (→ file 03), client-side network latency

### 5. [CrashLoopBackOff](05-crashloopbackoff.md)
Pairs with Pending Pods — pod got Running, then started dying. Fork: crashes immediately, or after running for a while?
- **Immediate (startup/config):** Exit Code 1, Exit Code 127 (command not found), Exit Code 0 but still restarting (one-shot script on `restartPolicy: Always`), CreateContainerError
- **After a while (resource/runtime):** Exit Code 137/OOMKilled, liveness probe failing, unhandled crash triggered by a later event
- **Off-path:** still Pending/ContainerCreating (→ file 01), ImagePullBackOff (→ file 01), Job/CronJob pod exiting on purpose

### 6. [Networking/Services](06-networking-services.md)
A sequential ladder, not a single fork — pods are already Running/Ready, test bottom-up until one rung fails.
- **Rung 1, Pod IP direct, fails → CNI:** plugin down on a node, overlay broken cross-node, NetworkPolicy blocking (selective, not total)
- **Rung 2, ClusterIP direct, fails → kube-proxy:** proxy down, stale iptables/ipvs rules, Service has zero Endpoints (selector mismatch)
- **Rung 3, DNS name, fails → CoreDNS:** CoreDNS pods down, kube-dns Service has zero Endpoints, pod's own `resolv.conf` misconfigured
- **Off-path:** pod never Ready (not a networking problem), NetworkPolicy working as intended, missing namespace in the DNS name, external LB/Ingress issue (different layer)

---

## Build Status

All core troubleshooting scenarios are now built: Pending, apiserver, scheduler/controller-manager, etcd, CrashLoopBackOff, and the CNI/kube-proxy/CoreDNS networking cluster. Nothing currently queued — name a new state (e.g. a storage-specific deep dive, node draining/cordoning as a live scenario) whenever one's wanted.
