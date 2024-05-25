import Axios from "axios"
import { config } from "@/config"

export default Axios.create({
  baseURL: config.baseUrl,
  headers: { "Cache-Control": "no-store", Pragma: "no-cache", Expires: "0" },
})
