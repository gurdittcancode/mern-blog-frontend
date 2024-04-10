import { formatISO9075 } from 'date-fns'
import { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { Pencil } from 'lucide-react'

export const PostPage = () => {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const { userInfo } = useContext(UserContext)

  useEffect(() => {
    fetch(`http://localhost:8080/post/${id}`).then((res) => {
      res.json().then((postInfo) => {
        setPost(postInfo)
      })
    })
  }, [])

  if (!post) return ''

  return (
    <div className="post-page">
      <h1>{post.title}</h1>
      <time>{formatISO9075(new Date(post.createdAt))}</time>
      <div className="author">by @{post.author.username}</div>
      {userInfo.id === post.author._id && (
        <div className="edit-div">
          <Link className="edit-btn" to={`/edit/${post._id}`}>
            <Pencil />
            Edit this post
          </Link>
        </div>
      )}
      <div className="image">
        <img src={`http://localhost:8080/${post.image}`} alt="" />
      </div>
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  )
}
