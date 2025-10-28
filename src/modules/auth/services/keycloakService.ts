import axios from 'axios';
import type { KeycloakTokenResponse, LoginCredentials } from '../../../models/types/authTypes';

const BASE = import.meta.env.VITE_KEYCLOAK_URL;
const REALM = import.meta.env.VITE_KEYCLOAK_REALM;
const CLIENT = import.meta.env.VITE_KEYCLOAK_CLIENT_ID;

export async function loginToKeycloak(credentials: LoginCredentials) {
    const params = new URLSearchParams();
    params.append('grant_type', 'password');
    params.append('client_id', CLIENT);
    params.append('username', credentials.email);
    params.append('password', credentials.password);

    const { data } = await axios.post<KeycloakTokenResponse>(
        `${BASE}/realms/${REALM}/protocol/openid-connect/token`,
        params,
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );

    return data;
}

export async function refreshKeycloakToken(refreshToken: string) {
    const params = new URLSearchParams();
    params.append('grant_type', 'refresh_token');
    params.append('client_id', CLIENT);
    params.append('refresh_token', refreshToken);

    const { data } = await axios.post<KeycloakTokenResponse>(
        `${BASE}/realms/${REALM}/protocol/openid-connect/token`,
        params,
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );

    return data;
}

export async function logoutFromKeycloak(refreshToken: string) {
    const params = new URLSearchParams();
    params.append('client_id', CLIENT);
    params.append('refresh_token', refreshToken);

    await axios.post(
        `${BASE}/realms/${REALM}/protocol/openid-connect/logout`,
        params,
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );
}
