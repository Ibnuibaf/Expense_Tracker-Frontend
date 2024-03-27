import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import expensesSlice from "./slices/expensesSlice";
import collaborationsSlice from "./slices/collaborationsSlice";
import categoriesSlice from "./slices/categoriesSlice";
import budgetsSlice from "./slices/budgetsSlice";

const store=configureStore({
    reducer:{
        user:userSlice,
        expenses:expensesSlice,
        collaborations:collaborationsSlice,
        categories:categoriesSlice,
        budgets:budgetsSlice
    }
})

export default store