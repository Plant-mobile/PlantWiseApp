import { translation } from '../translateService';


const API_URL = 'http://192.168.1.87:5000/api/users/auth';

export async function fetchWithTimeout(url: string, options: any = {}, timeoutMs = 5000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });

    clearTimeout(timeout);
    return response;

  } catch (error: any) {
    clearTimeout(timeout);

    throw new Error("NETWORK_ERROR");
  }
}

export async function post(url: string, body: any, headers: any = {}) {
  try {
    const response = await fetchWithTimeout(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Something went wrong",
      };
    }

    return { success: true, ...data };

  } catch (err: any) {

    return {
      success: false,
      message: translation("errors.server_error")
    };

  }
}


export async function loginUser(email: string, password: string) {
  return await post(`${API_URL}/login`, { email, password }, { 'Content-Type': 'application/json' });
}

export async function registerUser(email: string, password: string, userName: string) {
  return await post(`${API_URL}/register`, { email, password, userName }, { 'Content-Type': 'application/json' });
}

export async function sendEmailUser(email: string) {
  return await post(`${API_URL}/forgot-password`, { email }, { 'Content-Type': 'application/json' });
}

export async function verifyResetCodeUser(email: string, code: string) {
  return await post(`${API_URL}/verify-reset-code`, { email, code }, { 'Content-Type': 'application/json' });
}

export async function resetPasswordUser(token: string, newPassword: string) {
  return await post(`${API_URL}/reset-password`, { newPassword }, {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  });
}

export async function logoutUser(token: string, refreshToken: string) {
  return await post(`${API_URL}/logout`, { refreshToken }, {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    "x-refresh-token": refreshToken,
  });
}
