import { useState, useEffect } from 'react'
import{useParams, useNavigate} from 'react-router-dom'
import axios from 'axios'
import BlogForm from '../BlogForm'
import BlogDetails from '../BlogDetails'
import Comments from "../Comments"
import CommentForm from '../CommentForm'

export default function Blog() {
    const navigate = useNavigate()
    // state to get the blog
    const [blog, setBlog] = useState({})
    // whether or not the form is shown
    const [showForm, setShowForm] = useState(false)
    // grab comments
    const [comment, setComment] = useState({})
    const [comments, setComments] = useState([])

    
    const { id } = useParams()

    // retrieve blog from server
    useEffect(() => {
        const displayBlogInfo = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/blogs/${id}`)
                setBlog(response.data)
                setComments(response.data.comments)
            } catch (error) {
                console.log(error)
            }
        }
        displayBlogInfo()
    }, [id])


    const handleCommentSubmit = async (e, form) => {
        e.preventDefault()
        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/blogs/${id}/comment`, form)
            setComment(response.data)
            setComments([...comments, comment])
            // setCommentForm({content:''})
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = async (e, form, setShowForm) => {
        e.preventDefault()
        try {
           const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/blogs/${id}`, form)
           setBlog(response.data)
           setShowForm(false)
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/blogs/${id}`)
            // navigate away from this page back to the homepage
            navigate('/')
            
        } catch (error) {
            console.log(error)
        }
    }

    const allComments = comments.map((comment) => {
        return(
            <div key={comment._id}>
                <Comments comment={comment.content} initialCommentForm = {{content: comment.content}} id={id} />
            </div>
        )
    })
  return (
    <div>
        {
            showForm ?
            <BlogForm
            initialForm={blog}
            submitHandler={handleSubmit}
            />
            :
            <BlogDetails
            blog={blog}
            />
        }
        <button 
            onClick={() => {setShowForm(!showForm)}}
        >
            { showForm ? 'Cancel' : 'Edit Blog'}
        </button>
    
        {allComments}
         <h1>Add a comment:</h1> 
         <CommentForm 
         submitCommentHandler={handleCommentSubmit}
         initialCommentForm = {{content:''}}
         />
        
        {
            showForm ?
            <button
                onClick={handleDelete}>
                Delete
            </button> 
            :
            ''
        }
    </div>
  )
}
