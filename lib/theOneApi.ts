import axios from "redaxios";

const theOneApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_THE_ONE_API_BASE_URL,
  headers: {
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
    Expires: "0",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_THE_ONE_API_ACCESS_TOKEN}`,
  },
});

export default theOneApi;
