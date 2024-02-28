import { Box } from "@mui/material"
import Header from "../Components/ReuableComponents/Header"
import DataCard from "../Components/ReuableComponents/DataCard/DataCard"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { fetchMyPost } from "../redux/slices/MyPostSlice"
import { ToastContainer,toast } from "react-toastify"
import { setNotification } from "../redux/slices/MyPostSlice"


const MyPost = () => {
    const myPost = useSelector((state)=> state?.MyPost)
    const notification = myPost?.notification
    const dispatch = useDispatch()
    
    useEffect(()=>{
        dispatch(fetchMyPost())
    },[])

    useEffect(()=>{
        if(notification!==''){
            toast(notification)
        }
        dispatch(setNotification())
    },[notification])

    return(
        <Box>
            <Header/>
            {
                myPost?.isLoading ? 
                <Box>
                    Loading
                </Box>
                :
                myPost?.data?.length ? 
                    <Box className="card-grid">
                        {
                            myPost?.data?.map((data, index) => {
                                return(
                                    <DataCard data={data} key={index} isMyPost={true}/>
                                )
                            })
                        }
                    </Box>    
                :
                    <Box>No Data</Box>
            }
            <ToastContainer/>
        </Box>
    )
}

export default MyPost