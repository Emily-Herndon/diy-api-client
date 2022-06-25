import {useState, useEffect} from 'react'
import CommentForm from './CommentForm'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'


export default function Comments({com, blogId, setComments}) {
    const [showCommentForm, setShowCommentForm] = useState(false)
    // const[commentForm, setCommentForm] = useState(initialCommentForm)
    // const [thisComment, setThisComment] = useState({})
    const [comment, setComment] = useState({})
    const navigate = useNavigate()
   

    const startEditForm = (content) => {
      setShowCommentForm(!showCommentForm)
      setComment({content})
    }
    
   
    const handleCommentEditSubmit = async (form) => {
      try {
          await axios.put(`${process.env.REACT_APP_SERVER_URL}/comment/${com._id}`, form)
          const blog = await axios.get(`${process.env.REACT_APP_SERVER_URL}/blogs/${blogId}`)
          setComments(blog.data.comments)
          setShowCommentForm(false)

      } catch (error) {
          console.log(error)
      }
  }
  const handleCommentDelete = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_SERVER_URL}/comment/${com._id}`)
      const blog = await axios.get(`${process.env.REACT_APP_SERVER_URL}/blogs/${blogId}`)
      setComments(blog.data.comments)
      navigate(`/blogs/${blogId}`)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
        
           {!showCommentForm ?
  
                <p>{com.content}</p>
                :
                <div>
                  <input type="text" value={comment.content} onChange={(e) => setComment({content: e.target.value})}/>
                  <button type='submit' onClick={() => handleCommentEditSubmit(comment)}>Submit</button>
                </div>
                }
              <button
                onClick={() =>startEditForm(com.content)}
              >
                {showCommentForm ? 'Cancel' : 'Edit'}
              </button>
              <button 
                onClick={handleCommentDelete}
                > Delete Comment</button>
    </div>
  )
}
