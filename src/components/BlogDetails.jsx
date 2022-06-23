

export default function BlogDetails({blog}) {
  console.log(blog)
  return (
    <div>
      <h1>{blog.title}</h1>
      <p>{blog.name}</p>
      <p>{blog.content}</p>
    </div>
  )
}
