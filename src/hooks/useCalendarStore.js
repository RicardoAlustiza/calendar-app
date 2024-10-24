import { useSelector, useDispatch } from 'react-redux'
import { onAddNewEvent, onSetActiveEvent, onUpdateEvent, onDeleteEvent, onLoadEvents } from '../store'
import { calendarApi } from '../api'
import { convertsToDateEvents } from '../helpers'
import Swal from 'sweetalert2'

export const useCalendarStore = () => {

    const dispatch = useDispatch()
    const { events, activeEvent } = useSelector((state) => state.calendar);
    const { user } = useSelector((state) => state.auth);

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent))
    }

    const startSavingEvent = async(calendarEvent) => {

        try {
            if(activeEvent.id) {
                // Update event
                await calendarApi.put(`/events/${activeEvent.id}`, calendarEvent);
                dispatch(onUpdateEvent({...calendarEvent, user}));
                return;
            }

            // Create event
            const { data } = await calendarApi.post('/events', calendarEvent);
            dispatch(onAddNewEvent({...calendarEvent, id: data.event.id, user}));           
        }
        catch(error) {
            console.error(error);
            Swal.fire('There was an error saving the event', error.response.data.msg, 'error');
        }
    }

    const startDeleteEvent = async() => {
        
        try {
            await calendarApi.delete(`/events/${activeEvent.id}`);
            dispatch(onDeleteEvent());
        }
        catch(error) {
            console.error(error);
            Swal.fire('There was an error deleting the event', error.response.data.msg, 'error');
        }
    }

    const startLoadingEvents = async() => {
        try {
            const { data } = await calendarApi.get('/events');
            const events = convertsToDateEvents(data.events);

            dispatch(onLoadEvents(events));
        }
        catch (error) {
            console.error(error);
        }
    }

    return {
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,
        setActiveEvent,
        startSavingEvent,
        startDeleteEvent,
        startLoadingEvents
    }
}