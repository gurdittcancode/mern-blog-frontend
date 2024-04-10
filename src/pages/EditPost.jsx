import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Editor } from '../components/Editor'

export const EditPost = () => {
  const { id } = useParams()
  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [content, setContent] = useState('')
  const [files, setFiles] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    fetch(`http://localhost:8080/post/${id}`).then((response) => {
      response.json().then((postInfo) => {
        setTitle(postInfo.title)
        setContent(postInfo.content)
        setSummary(postInfo.summary)
      })
    })
  }, [])

  async function handleSubmit(evt) {
    evt.preventDefault()
    const formData = new FormData()
    formData.append('title', title)
    formData.append('summary', summary)
    formData.append('content', content)
    formData.append('id', id)
    if (files?.[0]) formData.append('file', files?.[0])

    const response = await fetch(`http://localhost:8080/posts`, {
      method: 'PUT',
      body: formData,
      credentials: 'include',
    })

    if (response.ok) navigate(`/post/${id}`)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Summary"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />
      <input type="file" onChange={(ev) => setFiles(ev.target.files)} />
      <Editor onChange={setContent} value={content} />
      <button style={{ marginTop: '20px' }} type="submit">
        Edit Post
      </button>
    </form>
  )
}
