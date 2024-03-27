import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../axios/api";

export const getCollaborations=createAsyncThunk("collaborations/getCollaborations",async ({category},{rejectWithValue})=>{
    try {
        const res=await api.get(`/collaborator/all?category=${category}`)
   
        return res.data.collaborations
    } catch (error) {
        console.error("Error fetching collaborations:", error);
        return rejectWithValue(error.response.data.message)
    }
})