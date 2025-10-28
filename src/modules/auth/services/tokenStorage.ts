const TOKEN_KEY = 'access_token';
const REFRESH_KEY = 'refresh_token';

export const tokenStorage = {
    set(access: string, refresh?: string) {
        localStorage.setItem(TOKEN_KEY, access);
        if (refresh) localStorage.setItem(REFRESH_KEY, refresh);
    },
    getAccess() {
        return localStorage.getItem(TOKEN_KEY);
    },
    getRefresh() {
        return localStorage.getItem(REFRESH_KEY);
    },
    clear() {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(REFRESH_KEY);
    }
};
