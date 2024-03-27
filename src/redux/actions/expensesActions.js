import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../axios/api";

export const getExpenses=createAsyncThunk("expenses/getExpenses",async ({search,category},{rejectWithValue})=>{
    try {
        const res=await api.get(`/expense/all?category=${category}&search=${search}`)
   
        return res.data.expenses
    } catch (error) {
        console.error("Error fetching expenses:", error);
        return rejectWithValue(error.response.data.message)
    }
})