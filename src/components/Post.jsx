import { format } from 'date-fns'
import { Link } from 'react-router-dom'

export const Post = ({ _id, title, summary, image, content, createdAt, author }) => {
  return (
    <div className="post">
      <div className="image">
        <Link to={`/post/${_id}`}>
          <img src={`http://localhost:8080/${image}`} alt="" />
        </Link>
      </div>

      <div className="texts">
        <Link to={`/post/${_id}`}>
          <h2 className="title">{title}</h2>
        </Link>
        <p className="info">
          <a className="author">{author.username}</a>
          <time>{format(new Date(createdAt), 'd MMM, yyyy')}</time>
        </p>
        <p className="summary">{summary}</p>
      </div>
    </div>
  )
}
