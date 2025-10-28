export const AuthActionTypes = {
    LOGIN_REQUEST: 'LOGIN_REQUEST',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAILURE: 'LOGIN_FAILURE',
    LOGOUT: 'LOGOUT',
    REFRESH_TOKEN: 'REFRESH_TOKEN',
} as const;

export type AuthActionType = typeof AuthActionTypes[keyof typeof AuthActionTypes];
