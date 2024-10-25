import calendarApi from '../../src/api/calendarApi';

describe('Calendar API', () => {

    test('should have the default config', () => {
        
        expect(calendarApi.defaults.baseURL).toBe(process.env.VITE_API_URL);
    });

    test('should incluse the custom token header', async() => {
        
        localStorage.setItem('token', '123456');
        const resp = await calendarApi.get('/auth');

        expect(resp.config.headers['x-token']).toBe('123456');
    });
});