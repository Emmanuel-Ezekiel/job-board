import axios from "axios";

export const Api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
    "x-rapidapi-host": process.env.NEXT_PUBLIC_HOST,
  },
});
