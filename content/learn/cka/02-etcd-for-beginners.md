# 02 — ETCD For Beginners (CKA)

*Digested from Udemy CKA course lecture notes, 2026-10-14. Restructured, condensed, and paraphrased — not a transcript. Standalone etcd primer, before the next lecture covers its specific role inside a Kubernetes cluster.*

---

## Slide 1 — What is etcd?

- **etcd is a distributed, reliable key-value store** — described by its own creators as simple, secure, and fast.
- It's general-purpose — not Kubernetes-specific software (Kubernetes is just one of its users).

## Slide 2 — Key-Value Store vs. Relational vs. Document Store

| Model | Structure | Schema | Complex queries | Flexibility | Best for |
|---|---|---|---|---|---|
| **Relational (SQL)** | Rows & columns (tables) | Strict | Yes (joins, SQL) | Rigid — adding one new field affects the whole table, leaves gaps for rows that don't use it | Structured data |
| **Document store** | One file/document per entity, any shape | None required | Limited (no cross-document joins) | High — each document can have its own fields independently | Semi-structured data |
| **Key-value store (etcd)** | A value stored against a key | None | No | Very high — store almost anything without touching other entries | Simple, fast lookups |

- A key-value pair can be simple (`name` → `John`) or structured (`user:JohnDoe` → an entire JSON document as the value).
- **The core tradeoff:** key-value stores give up schema structure and complex querying entirely, in exchange for very fast, very flexible, very simple lookups.

## Slide 3 — Getting Started with etcd

```bash
# Download the etcd binary for your OS from the GitHub releases page, extract, and run it
./etcd
```

- Running the binary starts a server listening on **port 2379** by default.
- This is the simplest possible way to run it — in practice, it's run as a system service or as a Pod inside a Kubernetes cluster, not a bare manual binary.
- **`etcdctl`** is etcd's own default command-line client, used to store/retrieve key-value pairs:

```bash
etcdctl put key1 value1     # store a key-value pair
etcdctl get key1             # retrieve it
etcdctl                      # run with no arguments to see all available commands
```

## Slide 4 — Version History: v2 vs. v3

- **v0.1** (Aug 2013) → **v2.0** (Feb 2015, the first official stable release — redesigned Raft consensus, 1000+ writes/sec) → **v3** (Jan 2017, major performance optimizations) → CNCF incubator (Nov 2018) → CNCF graduated project (Nov 2020) → **v3.5** (June 2021).
- **The practical reason this matters:** the CLI command set itself changed between v2 and v3 — older docs/blogs may reference the v2 commands, which look different from what you'd use today:

| | v2 (older) | v3 (current) |
|---|---|---|
| Set a value | `etcdctl set` | `etcdctl put` |
| Get a value | `etcdctl get` | `etcdctl get` |
| Remove a value | `etcdctl rm` | `etcdctl delete` |
| Transactions | Not supported | Supported |

```bash
etcdctl version   # check which version/API you're actually running
```

---

## Key Terms

- **etcd** — a distributed, reliable key-value store; general-purpose, not Kubernetes-specific.
- **Key-value store** — a storage model with no schema and no complex query support, trading that away for very fast, flexible lookups.
- **`etcdctl`** — etcd's own default CLI client for storing/retrieving key-value pairs.
- **v2 vs. v3 API** — the command set changed (`set`/`get`/`rm` → `put`/`get`/`delete`); v3 also added transaction support. Check with `etcdctl version`.
