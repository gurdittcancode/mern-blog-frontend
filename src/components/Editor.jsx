import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

export const Editor = ({ value, onChange }) => {
  const quillConfig = {
    modules: {
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [
          { list: 'ordered' },
          { list: 'bullet' },
          { indent: '-1' },
          { indent: '+1' },
        ],
        ['link', 'image'],
        ['clean'],
      ],
    },
    formats: [
      'header',
      'bold',
      'italic',
      'underline',
      'strike',
      'blockquote',
      'list',
      'bullet',
      'indent',
      'link',
      'image',
    ],
  }

  return (
    <ReactQuill
      value={value}
      modules={quillConfig.modules}
      formats={quillConfig.formats}
      onChange={onChange}
    />
  )
}
