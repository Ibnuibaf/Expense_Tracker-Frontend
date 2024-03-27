import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../axios/api";

export const getCategories=createAsyncThunk("categories/getCategories",async (_,{rejectWithValue})=>{
    try {
        const res=await api.get('/category/all')
   
        return res.data.categories
    } catch (error) {
        console.error("Error fetching categories:", error);
        return rejectWithValue(error.response.data.message)
    }
})