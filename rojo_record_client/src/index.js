import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
// Import the css file
import './styles/main.css'
// Import the note from components
import { Note } from './components/note'

// The main url for our backend
const baseURL='http://localhost:8000'

const App = () => {
    // Variable to track if the form model should be visible or not
    const [modelVisible, setModelVisible]=useState(false);

    // Sets the default values for the form texts
    const [title,setTitle] = useState('')
    const [content,setContent]= useState('')
    
    const [posts,setPosts]=useState([])

    // Function for saving a created note
    const createNote = async (event) => {
        event.preventDefault();

        const new_request= new Request(
            `${baseURL}/posts/`,
            {
                body:JSON.stringify({title,content}),
                headers:{
                    'Content-Type':'Application/Json'
                },
                method:'POST'
            }
        );
        const response = await fetch(new_request);
        const data = await response.json();

        if (response.ok){
            console.log(data)
        }
        else{
            console.log("Failed Network Request")
        }

        // Logs the inputs
        // console.log(title)
        // console.log(content)

        // Resets the inputs
        setTitle('')
        setContent('')

        // Closes the model
        setModelVisible(false)

        getAllPosts()

    }

    // Function for retrieving the notes
    const getAllPosts = async () =>{
        const response = await fetch(`${baseURL}/posts/`);
        const data = await response.json()

        if (response.ok){
            console.log(data)
            setPosts(data)
        }
        else{
            console.log("Failed Network Request")
        }

    }

    useEffect(
        ()=>{
            getAllPosts()
        },[]
    )

    // Function for deleting a note
    const deleteItem= async (noteId)=>{
        console.log(noteId)

        const response = await fetch(`${baseURL}/posts/${noteId}/`,{
            method:'DELETE'
        })

        if(response.ok){
            console.log(response.status)
        }

        getAllPosts()
    }

    return (
        <div>
            <div className="header">
                <div className="logo">
                    <p className="title">The Rojo Records</p>
                </div>

                <div className="add-section">
                    <a href="#" className="add-button" onClick={()=>setModelVisible(true)}>Add a New Note</a>
                </div>

            </div>

            {posts.length > 0?
                (<div className="post-list">
                    {
                        posts.map(
                            (item)=>(
                                <Note title={item.title} 
                                    content={item.content} 
                                    onclick={()=>deleteItem(item.id)}
                                    key={item.id}
                                />
                            )
                        )
                    }
                </div>)
                :(
                    <div className="posts">
                        <p className="centerText">No Posts</p>
                    </div>
                )
        
            }

            <div className={modelVisible? 'model':'model-not-visible'}>
                <div className="form">
                    <div className="title">
                        <div className='form-header'>
                            <div>
                                <p className="form-header-text">Create a New Note</p>
                            </div>
                            
                            <div>
                                <a href="#" className="close-button" onClick={()=>setModelVisible(!modelVisible)}>X</a>
                            </div>
                        </div>
                        <form action=''>
                            <div className="form-group">
                                <label htmlFor='title'>Title</label>
                                <input type="text" name="title" id="title" className="form-control" required
                                value={title}
                                onChange={(e)=>setTitle(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor='content'>Message</label>
                                <textarea name="content" id="content" cols="30" rows="5" className='form-control' required
                                value={content}
                                onChange={(e)=>setContent(e.target.value)}
                                >

                                </textarea>
                            </div>

                            <div className="form-group">
                                <input type="submit" value="Create!" className='button' onClick={createNote}/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

ReactDOM.render(<App/>,document.querySelector('#root'));