import axios from "axios";
import { uuidv7 } from "uuidv7";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;
const API_VERSION = "v1";

export const login = async (email, password) => {
  try {
    // Solicita la cookie CSRF
    await axios.get("/sanctum/csrf-cookie");

    // Luego realiza la solicitud de login
    const response = await axios.post(`/api/${API_VERSION}/login`, {
      email,
      password,
    });

    return response; // Retorna la respuesta
  } catch (error) {
    console.error("Error en login:", error.response?.data || error.message);
    throw error; // Lanza el error para poder manejarlo en el onSubmit
  }
};

export const register = async (name, email, password) => {
  try {
    // Solicita la cookie CSRF
    await axios.get("/sanctum/csrf-cookie");

    const id = uuidv7();
    // Luego realiza la solicitud de registro
    const response = await axios.post(`/api/${API_VERSION}/register`, {
      id,
      name,
      email,
      password,
    });

    return response; // Retorna la respuesta
  } catch (error) {
    console.error("Error en register:", error.response?.data || error.message);
    throw error; // Lanza el error para poder manejarlo en el onSubmit
  }
};

export const logout = async () => {
  try {
    const response = await axios.post(`/api/${API_VERSION}/logout`);
    return response.data;
  } catch (error) {
    console.error("Error en logout:", error.response?.data || error.message);
    throw error;
  }
};

export const getData = async (endpoint) => {
  try {
    const response = await axios.get(`/api/${API_VERSION}/${endpoint}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error en recoger los documentos:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getUser = async () => {
  try {
    const response = await axios.get(`/api/${API_VERSION}/user`);
    return response.data;
  } catch (error) {
    console.error(
      "Error en recoger el usuario:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const postData = async (endpoint, data) => {
  console.log(
    `📡 Enviando petición a /api/${API_VERSION}/${endpoint} con:`,
    data
  );
  try {
    const response = await axios.post(`/api/${API_VERSION}/${endpoint}`, data);

    console.log("✅ Respuesta completa de la API:", response);
    console.log("📦 Datos recibidos:", response.data);

    return response.data; // `axios` ya devuelve la data directamente
  } catch (error) {
    console.error("❌ Error en postData:", error);

    if (error.response) {
      console.error(
        "⚠️ Respuesta del servidor:",
        error.response.status,
        error.response.data
      );
    } else {
      console.error("🚨 Error sin respuesta del servidor:", error.message);
    }

    throw error; // Lanza el error para que `getRelevantChunks` lo capture
  }
};

export const deleteData = async (endpoint) => {
  try {
    const response = await axios.delete(`/api/${API_VERSION}/${endpoint}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error al eliminar los datos:",
      error.response?.data || error.message
    );
    throw error;
  }
};
