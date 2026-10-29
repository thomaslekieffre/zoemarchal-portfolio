export default function SiteLink({
  href,
  className = "",
  children,
}: {
  href?: string;
  className?: string;
  children: React.ReactNode;
}) {
  if (!href) return <div className={className}>{children}</div>;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`block cursor-pointer transition-transform duration-300 ease-out hover:scale-105 ${className}`}
    >
      {children}
    </a>
  );
}
