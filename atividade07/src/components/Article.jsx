function Article({ post }) {
  return (
    <article className="post" id="sobre">
      <div className="post-heading">
        <p className="post-category">{post.category}</p>
        <h2>{post.title}</h2>
        <div className="post-meta">
          <span>{post.author}</span>
          <span aria-hidden="true">/</span>
          <time dateTime={post.dateTime}>{post.date}</time>
        </div>
      </div>

      <div className="post-body">
        {post.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <figure className="post-figure">
        <img src={post.image.src} alt={post.image.alt} width="1200" height="800" />
        <figcaption>{post.image.caption}</figcaption>
      </figure>
    </article>
  )
}

export default Article
