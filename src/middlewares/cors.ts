import cors from "cors"

const allowedOrigins = ["http://localhost:5000", "http://localhost:8000"]

const corsOptions = (req: any, callback: any) => {
  const origin = req.header("Origin")
  if (allowedOrigins.includes(origin)) {
    if (origin === "http://localhost:5000") {
      callback(null, { origin, methods: "GET,POST,PUT,DELETE" })
    } else {
      callback(null, { origin, methods: "GET,POST" })
    }
  } else {
    callback(new Error("Not allowed by CORS"))
  }
}

export default cors(corsOptions)