export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-6 py-10 text-sm text-muted sm:flex-row">
        <p>© {year} Mercillo</p>
      </div>
    </footer>
  );
}
