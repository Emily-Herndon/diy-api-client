import { useState } from 'react'

export default function BlogForm({submitHandler, initialForm}) {
  const [form, setForm] = useState(initialForm)
  return (
    <form onSubmit={e => submitHandler(e, form, setForm)}
    style  ={{display: 'grid', gridTemplateColumns: "2", width: "20rem"}}>
        <label htmlFor='name'>Name:</label>
        <input
            type='text'
            id='name'
            value={form.name}
            onChange={e => setForm({...form, name: e.target.value})}
            style={{gridColumnStart: 2}}
        />
        <label htmlFor='title'>Title:</label>
        <input
            type='text'
            id='title'
            value={form.title}
            onChange={e => setForm({...form, title: e.target.value})}
            style={{gridColumnStart: 2}}
        />
        <label htmlFor='content'>What do you want to say?:</label>
        <input
            type='text'
            id='content'
            value={form.content}
            onChange={e => setForm({...form, content: e.target.value})}
            style={{gridColumnStart: 2}}
        />
        <button type='submit'>Submit</button>
    </form>    
  )
}
