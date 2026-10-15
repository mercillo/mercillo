import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Lecture({ markdown }: { markdown: string }) {
  return (
    <div className="space-y-4 text-sm leading-relaxed sm:text-base">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h2 className="mt-8 text-xl font-semibold text-foreground">
              {children}
            </h2>
          ),
          h2: ({ children }) => (
            <h2 className="mt-8 text-xl font-semibold text-foreground">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mt-6 text-base font-semibold text-foreground">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="mt-6 text-base font-medium text-foreground">
              {children}
            </h4>
          ),
          p: ({ children }) => <p className="text-muted">{children}</p>,
          ul: ({ children }) => (
            <ul className="list-disc space-y-1.5 pl-5 text-muted">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal space-y-1.5 pl-5 text-muted">
              {children}
            </ol>
          ),
          a: ({ href, children }) =>
            href?.endsWith(".md") ? (
              <span className="text-muted">{children}</span>
            ) : (
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className="text-accent underline underline-offset-2"
              >
                {children}
              </a>
            ),
          hr: () => <hr className="border-line" />,
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-accent pl-4 text-muted">
              {children}
            </blockquote>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">{children}</table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border border-line bg-surface px-3 py-1.5 text-left text-foreground">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-line px-3 py-1.5 text-muted">
              {children}
            </td>
          ),
          pre: ({ children }) => (
            <pre className="overflow-x-auto rounded-lg border border-line bg-surface p-4 text-xs leading-relaxed text-foreground">
              {children}
            </pre>
          ),
          code: ({ className, children }) => {
            const language = /language-(\w+)/.exec(className ?? "")?.[1];
            const isBlock =
              Boolean(language) || String(children).includes("\n");
            if (!isBlock) {
              return (
                <code className="rounded bg-surface px-1 py-0.5 text-xs text-accent">
                  {children}
                </code>
              );
            }
            return (
              <code
                className={language === "mermaid" ? "text-accent-dim" : undefined}
              >
                {children}
              </code>
            );
          },
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
