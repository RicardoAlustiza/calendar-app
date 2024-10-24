import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { CalendarPage } from '../calendar';
import { LogInPage } from '../auth';
import { useAuthStore } from '../hooks';

export const AppRouter = () => {

    const { status, checkAuthToken } = useAuthStore();

    useEffect(() => {
        checkAuthToken();
    },[])

    if(status === 'checking') {
        return <h3>Loading...</h3>
    }

    return (
        
        <Routes>
            {
                status === 'not-authenticated' 
                ? (
                    <>
                        <Route path="/auth/*" element={<LogInPage />} />
                        <Route path="/*" element={<Navigate to="/auth/login"/>} />
                    </>
                )
                : (
                    <>
                        <Route path="/" element={<CalendarPage />} />
                        <Route path="/*" element={<Navigate to="/"/>} />
                    </>
                )
            }
        </Routes>
    )
}
