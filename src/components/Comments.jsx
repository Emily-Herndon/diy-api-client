import {useState, useEffect} from 'react'
import CommentForm from './CommentForm'
import axios from 'axios'


export default function Comments({comment, id, initialCommentForm}) {
    const [showCommentForm, setShowCommentForm] = useState(false)
    const[commentForm, setCommentForm] = useState(initialCommentForm)
    const [thisComment, setThisComment] = useState({comment})
    const handleCommentEditSubmit = async (e, form) => {
      e.preventDefault()
      try {
        
          const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/comment/`, form)
          setThisComment(response.data)
          setShowCommentForm(false)
      } catch (error) {
          console.log(error)
      }
  }
  return (
    <div>
        {
            showCommentForm ?
            <CommentForm
            initialCommentForm={comment}
            submitCommentHandler={handleCommentEditSubmit}
            />
            :
            <div>{comment}</div>
        }
        <button
          onClick={() => setShowCommentForm(!showCommentForm)}
        >
          {showCommentForm ? 'Cancel' : 'Edit'}
          
        </button>
    </div>
  )
}
