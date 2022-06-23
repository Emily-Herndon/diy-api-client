import { useState } from 'react'

export default function CommentForm({submitCommentHandler, initialCommentForm}) {
    const[commentForm, setCommentForm] = useState(initialCommentForm)
    
  return (
    <form onSubmit={e => submitCommentHandler(e, commentForm, setCommentForm)}
    style  ={{display: 'grid', gridTemplateColumns: "2", width: "20rem"}}>
        <label htmlFor='content'>Comment:</label>
        <input
            type='text'
            id='content'
            value={commentForm.content || ''}
            onChange={e => setCommentForm({...commentForm, content: e.target.value})}
            style={{gridColumnStart: 2}}
        />
        <button type='submit'>Submit</button>
    </form>
  )
}
