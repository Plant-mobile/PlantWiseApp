import AsyncStorage from '@react-native-async-storage/async-storage';
import { translation } from '../translateService';
import { ToastMessages } from '../ToastService';
const FERTILIZERS_KEY = "fertilizers_cache";
const UPDATED_KEY = "fertilizers_last_updated";


const API_URL = 'http://192.168.1.87:5000/api/items';

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

export async function get(url: string, headers: any = {}) {
  try {
    const response = await fetchWithTimeout(url, {
      method: "GET",
      headers,
    });

    const data = await response.json();


    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Something went wrong",
      };
    }
    const newAccessToken = response.headers.get("x-access-token");

    return { success: true, ...data, newAccessToken };

  } catch (err: any) {

    return {
      success: false,
      message: translation("errors.server_error")
    };

  }
}

export async function getAllFertilizers(token: string, refreshToken: string, cached: string, lastUpdated: string) {

  const data = await get(`${API_URL}/fertilizers${lastUpdated ? `?since=${lastUpdated}` : ""
    }`, {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    "x-refresh-token": refreshToken,
  });


  if (!data.success) {

    // logout required
    if (data.message === "Refresh token expired or invalid") {
      ToastMessages.error(data.message);

      return { success: false, error: "LOGOUT_REQUIRED", fertilizers: null };
    }

    // بما ان get() لا يرجع headers، يجب تعديل fetchWithTimeout لو أردت headers
    // حاليا نحذف هذا الجزء لأنه خاطئ
    // const newAccessToken = data.headers.get("x-access-token");

    return { success: false, error: "SERVER_ERROR", fertilizers: null };
  }

  if (data.newAccessToken) {
    await AsyncStorage.setItem("token", data.newAccessToken);
  }

  const current = JSON.parse(cached || "[]");


  const newFertilizers = mergeFertilizers(current, data.fertilizers);

  await AsyncStorage.setItem(FERTILIZERS_KEY, JSON.stringify(newFertilizers));
  await AsyncStorage.setItem(UPDATED_KEY, data.last_updated);
  return { success: true, error: null, fertilizers: newFertilizers };
}



const mergeFertilizers = (oldList, newList) => {
  const map = new Map();
  [...oldList, ...newList].forEach((item) => {
    if (item.isDeleted) {
      map.delete(item.id);
    } else {
      map.set(item.id, item);
    }
  });
  return Array.from(map.values());
};


