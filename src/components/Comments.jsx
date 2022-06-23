import {useState, useEffect} from 'react'
import CommentForm from './CommentForm'
import axios from 'axios'


export default function Comments({comments, id, initialCommentForm}) {
    const [showCommentForm, setShowCommentForm] = useState(false)
    const[commentForm, setCommentForm] = useState(initialCommentForm)
    const [thisComment, setThisComment] = useState({})
    const allComments = comments.map((comment) => {
      return(
          <div key={comment._id}>
              {comment.content}
            <button
              onClick={() => setShowCommentForm(!showCommentForm)}
            >
              {showCommentForm ? 'Cancel' : 'Edit'}
            </button>
          </div>
      )
  })
    const handleCommentEditSubmit = async (e, form) => {
      e.preventDefault()
      try {

          const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/comment/${id}`, form)
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
            <><CommentForm
            initialCommentForm={thisComment}
            submitCommentHandler={handleCommentEditSubmit}
            />
            <button
              onClick={() => setShowCommentForm(!showCommentForm)}
            >
              {showCommentForm ? 'Cancel' : 'Edit'}
            </button>
            </>
            :
            <div>{allComments}</div>
          
        }
       
    </div>
  )
}
