import { useState } from 'react'
import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import {addHours} from 'date-fns'
import { CalendarEvent, NavBar, CalendarModals } from "../"
import { localizer, getMessagesES } from '../../helpers'
import { useDispatch } from 'react-redux'
import { useUiStore } from '../../hooks'

const myEventsList = [{
    title: 'My event',
    notes: 'notes',
    start: new Date(),
    end: addHours(new Date(), 2),
    bgcolor: '#fafafa',
    user: {
        _id: '123',
        name: 'John Doe',
    },
}]

export const CalendarPage = () => {

    const dispatch = useDispatch()
    const { openDateModal } = useUiStore()

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week')

    const eventStyleGetter = (event, start, end, isSelected) => {

        const style = {
            backgroundColor: '#367CF7',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white',
        }

        return {
            style
        }
    }

    const onDoubleClick = (e) => {
        dispatch(openDateModal())
    }
    const onSelect = (e) => {
        console.log({ click: e })
    }
    const onViewChange = (e) => {
        localStorage.setItem('lastView', e)
        setLastView(e)
    }

    return (
        <>
            <NavBar />

            <Calendar
                culture='es'
                localizer={localizer}
                events={myEventsList}
                defaultView={lastView}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 'calc(100vh - 80px)' }}
                messages={getMessagesES()}
                eventPropGetter={ eventStyleGetter }
                components={{
                    event: CalendarEvent
                }}
                onDoubleClickEvent={ onDoubleClick }
                onSelectEvent={ onSelect }
                onView={ onViewChange }
            />

            <CalendarModals />
        </>
    )
}
