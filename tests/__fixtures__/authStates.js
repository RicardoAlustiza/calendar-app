export const initialState = {
    status: 'checking', //auth, not-auth, chekcing
    user: {},
    errorMessage: undefined
}

export const authenticatedState = {
    status: 'authenticated', //auth, not-auth, chekcing
    user: {
        uid: '123',
        name: 'Test'
    },
    errorMessage: undefined
}

export const notAuthenticatedState = {
    status: 'not-authenticated', //auth, not-auth, chekcing
    user: {},
    errorMessage: undefined
}