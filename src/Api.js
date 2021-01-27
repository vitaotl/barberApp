import AsyncStorage from "@react-native-community/async-storage";
import { add } from "react-native-reanimated";

const BASE_API = "https://api.b7web.com.br/devbarber/api";

export default {
  checkToken: async (token) => {
    const req = await fetch(`${BASE_API}/auth/refresh`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });
    const json = await req.json();
    return json;
  },
  signIn: async (email, password) => {
    const req = await fetch(`${BASE_API}/auth/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const json = await req.json();
    return json;
  },
  signUp: async (name, email, password) => {
    const req = await fetch(`${BASE_API}/user`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const json = await req.json();
    return json;
  },
  getBarbers: async (lat = null, long = null, address = null) => {
    const token = await AsyncStorage.getItem("token");
    console.log(lat, long, address);

    const req = await fetch(
      `${BASE_API}/barbers?token=${token}&lat=${lat}&long=${long}&address=${address}`
    );
    const json = await req.json();
    return json;
  },
  logout: async () => {
    const token = await AsyncStorage.getItem("token");

    const req = await fetch(`${BASE_API}/auth/logout`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });
    const json = await req.json();
    return json;
  },
  getBarber: async (id) => {
    const token = await AsyncStorage.getItem("token");

    const req = await fetch(`${BASE_API}/barber/${id}?token=${token}`);
    const json = await req.json();
    console.log(json);
    return json;
  },
  setAppointment: async (
    userId,
    service,
    selectedHour,
    selectedMonth,
    selectedYear,
    selectedDay
  ) => {
    const token = await AsyncStorage.getItem("token");

    const req = await fetch(`${BASE_API}/user/appointment`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        id: userId,
        service,
        year: selectedHour,
        month: selectedMonth,
        day: selectedYear,
        hour: selectedDay,
      })
    });
    const json = await req.json();
    return json;
  },
};
