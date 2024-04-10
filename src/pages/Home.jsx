import { useEffect, useState } from 'react'
import { Post } from '../components/Post'

export const Home = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch('http://localhost:8080/posts').then((response) => {
      response.json().then((posts) => setPosts(posts))
    })
  }, [])
  return <>{posts.length > 0 && posts.map((post) => <Post {...post} />)}</>
}
