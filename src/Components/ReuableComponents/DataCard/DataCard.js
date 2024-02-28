import { Box, Button, Typography } from "@mui/material"
import './DataCard.css'
import { useEffect, useState } from "react"
import ItemData from "../../../Utils/ItemData"
import { useDispatch } from "react-redux"
import { deletePost } from "../../../redux/slices/MyPostSlice"
import { useNavigate } from "react-router-dom"


const DataCard = ({data, isMyPost}) => {
    const [randomNumber, setRandomNumber] = useState(0)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const generateRandomNumber = () => {
        return Math.floor(Math.random() * 6)
    }

    useEffect(()=>{
        setRandomNumber(generateRandomNumber())
    },[])

    const handleDeletePost = () => {
        dispatch(deletePost(data?.id))
    }

    const handleUpdate = () => {
        navigate('/create', {
            state: {
                data : data
            }
        })
    }

    return (
        <Box className="data-card" sx={{background:`${ItemData[randomNumber]?.lightColor}`}}>
            <Box>
            <Typography className="data-card__title" sx={{color:`${ItemData[randomNumber]?.darkColor}`}}>{data?.title}</Typography>
            <Typography className="data-card__description" pt={2}>{data?.body}</Typography>
            </Box>
            {
                isMyPost && (
                    <Box sx={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                        <Button variant="outlined" onClick={handleUpdate}>Update</Button>
                        <Button variant="outlined" color="error" onClick={handleDeletePost}>Delete</Button>
                    </Box>    
                )
            }
        </Box>
    )
}

export default DataCard