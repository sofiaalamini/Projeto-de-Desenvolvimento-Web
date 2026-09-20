function Sidebar({ posts }) {
  return (
    <aside className="sidebar" aria-labelledby="posts-relacionados">
      <p className="sidebar-label">Continue explorando</p>
      <h2 id="posts-relacionados">Posts relacionados</h2>
      <ul>
        {posts.map((post, index) => (
          <li key={post.href}>
            <span className="post-number">0{index + 1}</span>
            <a href={post.href}>{post.title}</a>
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default Sidebar
