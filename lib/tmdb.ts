import axios from "redaxios";

const tmdb = axios.create({
  baseURL: process.env.NEXT_PUBLIC_TMDB_API_BASE_URL,
  params: { api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY },
  headers: {
    // "Cache-Control": "no-cache",
    // Pragma: "no-cache",
    // Expires: "0",
    // "Access-Control-Allow-Origin": "*",
  },
});

export default tmdb;
