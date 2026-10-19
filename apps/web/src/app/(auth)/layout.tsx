export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm rounded-organic border border-border bg-card p-8 shadow-sm">
        {children}
      </div>
    </div>
  );
}
