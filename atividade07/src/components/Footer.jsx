function Footer({ year, email }) {
  return (
    <footer className="site-footer" id="contato">
      <p>© {year} Meu Blog de Viagens</p>
      <a href={`mailto:${email}`}>{email}</a>
    </footer>
  )
}

export default Footer
