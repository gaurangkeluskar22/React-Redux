import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRequestedHeader } from "../../Utils/Utils";
import { env } from "../../env";
import axios from "axios";
const headers = getRequestedHeader()

//Action
export const fetchAllPost = createAsyncThunk("fetchAllPost", async () => {
    const response = await axios.get(env.REACT_APP_BASE_URL)
    return response.data
})


//reducer
const AllPostSlice = createSlice({
    name: 'AllPost',
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
        builder.addCase(fetchAllPost.pending, (state, action)=>{
            state.isLoading = true;
        });
        builder.addCase(fetchAllPost.fulfilled, (state,action)=>{
            state.isLoading = false;
            state.data = action.payload
        });
        builder.addCase(fetchAllPost.rejected, (state, action)=>{
            state.isLoading = true;
            state.data = []
        });
    }
})

export const {setNotification} = AllPostSlice.actions;
export default AllPostSlice.reducer;