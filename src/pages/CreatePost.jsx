import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Editor } from '../components/Editor'

export const CreatePost = () => {
  //image, heading, summary, main content
  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [content, setContent] = useState('')
  const [files, setFiles] = useState('')

  const navigate = useNavigate()

  //taken from react-quill docs

  async function handleSubmit(ev) {
    const formData = new FormData()
    formData.append('title', title)
    formData.append('summary', summary)
    formData.append('content', content)

    ev.preventDefault()
    formData.append('file', files[0])

    // for(let key of formData.entries()) {
    //     console.log(`${key[0]}: ${key[1]}`)
    // }

    const response = await fetch('http://localhost:8080/post', {
      method: 'POST',
      body: formData,
      credentials: 'include',
    })
    if (response.ok) navigate('/')
    else alert('Something went wrong... Please try again later')
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
      <Editor value={content} onChange={setContent} />
      <button style={{ marginTop: '20px' }}>Create Post</button>
    </form>
  )
}
