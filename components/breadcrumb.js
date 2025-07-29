export function Breadcrumb({ items }) {
  return (
    <nav className="flex text-s text-primary mb-8">
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {index > 0 && <span className="mx-2">/</span>}
          {item.href ? (
            <a href={item.href} className="hover:text-foreground transition-colors">
              {item.label}
            </a>
          ) : (
            <span className="text-foreground font-semibold">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  )
}
