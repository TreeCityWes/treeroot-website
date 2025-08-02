import './Blog.css'

function Blog() {
  const posts = [
    {
      title: "$ROOT launch commentary",
      excerpt: "Deep dive into the fair-launch mechanics and community building around TreeCityWes' content token.",
    },
    {
      title: "Analyzing trend coins: drought vs forest",
      excerpt: "Market analysis on sustainable meme coin ecosystems versus quick pump-and-dump schemes.",
    },
    {
      title: "On-chain rug indicators to watch",
      excerpt: "Technical signals and behavioral patterns that indicate potential rug pulls in the meme coin space.",
    },
  ]

  return (
    <section className="blog">
      <div className="container">
        <h2 className="section-title">Latest Commentary</h2>
        <div className="blog-grid">
          {posts.map((post, index) => (
            <article key={index} className="blog-card">
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <a href="#" className="read-more">Read More →</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Blog