import React from 'react'
import {getBlogUrl} from 'lib/helpers'
import {Link} from 'gatsby'
const CategoryPage = ({title, description, posts}) => {
  return (
        <section>
          <h1>Category: {title}</h1>
          <p>{description}</p>
          <ul>
            {posts.map((post, index) => (
                <li key={post._id}>
                  <Link to={getBlogUrl(post.slug.current)}>
                    {post.title}
                  </Link>
                </li>
              ))}
          </ul>
        </section>
  )
}

export default CategoryPage
