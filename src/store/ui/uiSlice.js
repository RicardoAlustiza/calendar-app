import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
       isDateModalOpen: false,
    },
    reducers: {
        onOpenDateModel: (state) => {
            state.isDateModalOpen = true;
        },
        onCloseDateModel: (state) => {
            state.isDateModalOpen = false;
        },
   }
});


// Action creators are generated for each case reducer function
export const { 
    onOpenDateModel,
    onCloseDateModel
} = uiSlice.actions;