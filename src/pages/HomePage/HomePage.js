import { Box } from "@mui/material"
import Header from "../../Components/ReuableComponents/Header"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { fetchAllPost } from "../../redux/slices/AllPostSlice"
import DataCard from "../../Components/ReuableComponents/DataCard/DataCard"
import './HomePage.css'


const HomePage = () => {
    const dispatch = useDispatch()
    const allPost = useSelector((state)=>state?.AllPost)

    useEffect(()=>{
            dispatch(fetchAllPost())
    },[])

    return(
        <Box>
            <Header/>
            {
                allPost?.isLoading ? 
                <Box>
                    Loading
                </Box>
                :
                allPost?.data?.length ? 
                    <Box className="card-grid">
                        {
                            allPost?.data?.map((data, index) => {
                                return(
                                    <DataCard data={data} key={index}/>
                                )
                            })
                        }
                    </Box>    
                :
                    <Box>No Data</Box>
            }
        </Box>
    )    
}

export default HomePage

