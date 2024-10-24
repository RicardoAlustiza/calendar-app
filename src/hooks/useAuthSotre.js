import { useDispatch, useSelector } from 'react-redux';
import { calendarApi } from '../api';
import { clearErrorMessage, onChecking, onLogin, onLogout } from '../store';

export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const startLogIn = async ({ email, password }) => {

        dispatch(onChecking());

        try {
            const { data } = await calendarApi.post('/auth', { email, password });
            
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(onLogin({ name: data.name, uid: data.uid }));
        } catch (error) {
            dispatch(onLogout('Invalid credentials'));
            console.log(error);

            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    }

    const startRegister = async({ name, email, password }) => {

        dispatch(onChecking());

        try {
            const { data } = await calendarApi.post('/auth/new', { name, email, password });

            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(onLogin({ name: data.name, uid: data.uid }));
        } catch(error) {
            dispatch(onLogout(error.response.data?.message || 'Error on registry'));
            console.log(error);

            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    }

    const checkAuthToken = async() => {
        const token = localStorage.getItem('token');

        if(!token) {
            dispatch(onLogout());
            return;
        }

        try {
            const { data } = await calendarApi.get('/auth/renew');

            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({ name: data.name, uid: data.uid }));
        }
        catch(error) {
            localStorage.clear();
            dispatch(onLogout());
            
            console.log(error);
        }
    }

    return {
        status,
        user,
        errorMessage,
        startLogIn,
        startRegister,
        checkAuthToken
    }
}