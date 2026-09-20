function Header({ title, children }) {
  return (
    <header className="site-header">
      <div className="header-inner">
        <p className="eyebrow">Caderno de bordo · histórias pelo caminho</p>
        <h1>{title}</h1>
        {children}
      </div>
    </header>
  )
}

export default Header
