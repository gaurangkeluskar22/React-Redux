import { Box, Button } from "@mui/material"
import Header from "../../Components/ReuableComponents/Header";
import './CreatePost.css'
import { useEffect, useState } from "react";
import { env } from "../../env";
import { useDispatch, useSelector } from "react-redux";
import { createPost, setNotification } from "../../redux/slices/MyPostSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { updatePost } from "../../redux/slices/MyPostSlice";


const CreatePost = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const dispatch = useDispatch()
    const notification = useSelector((state)=>state?.MyPost?.notification)
    const navigate = useNavigate()
    const location = useLocation()
    const [isUpdate, setIsUpdate] = useState(false)

    useEffect(()=>{
        if(location?.state?.data){
            setTitle(location?.state?.data?.title)
            setDescription(location?.state?.data?.body)
            setIsUpdate(true)
        }
    },[])
    
    const handleTitleChange = (e) => {
        const value = e?.target?.value;
        setTitle(value)
    }

    const handleDescriptionChange = (e) => {
        const value = e?.target?.value;
        setDescription(value)
    }

    const handleCreate = () => {
        const payload = {
            title: title,
            body: description,
            userId: parseInt(env.REACT_APP_USER_ID),
        }
        dispatch(createPost(payload)) 
    }

    useEffect(()=>{
        if(notification!==''){
            toast(notification)
        
            setTimeout(()=>{
                dispatch(setNotification())
                navigate('/')
            },4000)
        }
    },[notification])

    const handleUpdate = () => {
        const payload = {
            ...location?.state?.data,
            title: title,
            body: description,
        }
        dispatch(updatePost(payload))
    }

    return(
        <Box>
            <Header/>
            <Box className="create-post">
                <input type="text" placeholder="Enter Title" className="create-post__input" onChange={handleTitleChange} value={title}></input>
                <textarea type="text" placeholder="Enter Description" rows={3} className="create-post__input" onChange={handleDescriptionChange} value={description}></textarea>
                {
                    isUpdate ? 
                    <Button variant="contained" sx={{width:'325px'}} onClick={handleUpdate}>Update</Button>
                    :
                    <Button variant="contained" sx={{width:'325px'}} onClick={handleCreate}>Create</Button>
                }
                <ToastContainer />
            </Box>
        </Box>
    )
}

export default CreatePost;