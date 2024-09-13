export default function BlogLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="flex-1">
      <div className="container max-w-screen-xl mx-auto p-8">
        {children}
      </div>
    </main>
  );
}