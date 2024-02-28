import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRequestedHeader } from "../../Utils/Utils";
import { env } from "../../env";
import axios from "axios";
const headers = getRequestedHeader()

//Action
export const fetchMyPost = createAsyncThunk("fetchMyPost", async () => {
    const response = await axios.get(`${env.REACT_APP_BASE_URL}?userId=${env.REACT_APP_USER_ID}`)
    return response.data
})

export const deletePost = createAsyncThunk("deletePost", async (id) => {
    await axios.delete(`${env.REACT_APP_BASE_URL}/${id}`) 
    return id
})

export const updatePost = createAsyncThunk("updatePost", async(payload)=>{
    await axios.put(`${env.REACT_APP_BASE_URL}/${payload.id}`, payload, headers)
})

export const createPost = createAsyncThunk("createPost", async (payload) => {
    await axios.post(env.REACT_APP_BASE_URL, payload, headers)
})

//reducer
const MyPostSlice = createSlice({
    name: 'MyPost',
    initialState: {
        isLoading: false,
        data: [],
        notification: '',
    },
    reducers : {
        setNotification : (state, action) => {
            state.notification = ''
        }
    },
    extraReducers : (builder) => {
        builder.addCase(fetchMyPost.pending, (state, action)=>{
            state.isLoading = true;
        });
        builder.addCase(fetchMyPost.fulfilled, (state,action)=>{
            state.isLoading = false;
            state.data = action.payload
        });
        builder.addCase(fetchMyPost.rejected, (state, action)=>{
            state.isLoading = true;
            state.data = []
        });
        builder.addCase(deletePost.fulfilled, (state, action)=> {
            console.log("state:",state)
            state.notification = 'Post has been deleted Successfully!'
            const newData = state.data.filter((element)=> element.id !== action.payload)
            state.data = newData
        });
        builder.addCase(deletePost.rejected, (state, action)=>{
            state.notification = 'Some error has occured!'
        });
        builder.addCase(createPost.fulfilled, (state, action)=> {
            state.notification = 'Post has been created Sucessfully!';  
        });
        builder.addCase(createPost.rejected, (state, action)=>{
            state.notification = 'Some error has occured!';
        });
        builder.addCase(updatePost.fulfilled, (state, action)=>{
            state.notification = "Post has been updated Successfully!"
        })
        builder.addCase(updatePost.rejected, (state, action)=>{
            state.notification = 'Some error has occured!'
        });
    }
})

export const {setNotification} = MyPostSlice.actions;
export default MyPostSlice.reducer;