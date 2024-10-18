import { createSlice } from '@reduxjs/toolkit';

//Temporal
import { addHours } from 'date-fns';

const tempEvents = {
    _id: new Date().getTime(),
    title: 'My temporal event',
    notes: 'my temporal note event',
    start: new Date(),
    end: addHours(new Date(), 2),
    bgcolor: '#fafafa',
    user: {
        _id: '123',
        name: 'John Doe',
    },
}

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
       events: [
        tempEvents
       ],
       activeEvent: null
    },
    reducers: {
        onSetActiveEvent: (state, {payload}) => {
            state.activeEvent = payload;
        }
   }
});


// Action creators are generated for each case reducer function
export const {
    onSetActiveEvent
} = calendarSlice.actions;