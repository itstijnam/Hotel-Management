import { createSlice } from "@reduxjs/toolkit";

const dietMealSlice = createSlice({
    name:'meal',
    initialState: {
        dietMeal:null,
        allPatient: null
    },
    reducers:{
        setDietMeal: (state, action)=>{
            state.dietMeal = action.payload
        },
        setAllPatient: (state, action)=>{
            state.allPatient = action.payload
        }
    }
});
export const {setDietMeal, setAllPatient} = dietMealSlice.actions;
export default dietMealSlice.reducer;