import { createSlice } from "@reduxjs/toolkit";

const urlSlice = createSlice({
    name: 'url',
    initialState: [],
    reducers:{
        setURL: (state,action)=>{
            state.push(action.payload)
            console.log("url slice",action.payload)
        }
    }
})

export const { setURL } = urlSlice.actions
export default urlSlice.reducer