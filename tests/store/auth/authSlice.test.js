import { authSlice } from '../../../src/store/auth/authSlice';
import { initialState } from '../../__fixtures__/authStates';

describe('authSlice', () => {

    test('should return the initial state', () => {

        expect(authSlice.getInitialState()).toEqual(initialState);
    });
});