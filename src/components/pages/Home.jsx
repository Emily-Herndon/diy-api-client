import {useEffect, useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import BlogForm from '../BlogForm'

export default function Home() {
    // blog from the backend
    const [blogs, setBlogs] = useState([])
    // error message state
    const [error, setError] = useState('')
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/blogs`)
                // console.log(response)
                setBlogs(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchBlogs()
    },[]) //get all the blogs when the page loads

    // submit handler function
    const handleSubmit = async (e, form, setForm) => {
        e.preventDefault()
        console.log('the form data is:', form)
        try {
            // post to the backend
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/blogs`, form)
            // const blogResponse = await axios.get(`${process.env.REACT_APP_SERVER_URL}/blogs`)
            // setBlogs(blogResponse.data)
            setBlogs([...blogs, response.data])
            console.log(response)
            // clear form once it submits successfully
            setForm({
                name:"",
                title:'',
                content:''
            })
            setError('')
        } catch (error) {
            console.warn('submit error: ', error)
            if(error.response) {
                if(error.response.status === 400)
                // this error is a validation error from our backend
                setError(error.response.data.msg)
            }
        }
        
    }
    // list all blogs in db & make them links to details pages
    const blogLinks = blogs.map((blog) => {
        return(
            <div key={blog._id}>
                <Link to={`/blogs/${blog._id}`}>{blog.title}
                </Link>
            </div>
        )
    })

  return (
    <div>
        <h1>Create New Blog:</h1>
        <p>{error}</p>
        <BlogForm
            submitHandler={handleSubmit}
            initialForm={{
                name:"",
                title:'',
                content:''
            }}
        />
        <h1>Current Blogs:</h1>

        {blogLinks}
    </div>
  )
}
