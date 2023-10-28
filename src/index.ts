import express, { Express, Request, Response } from "express"
import bodyParser from "body-parser"
import helmet from "helmet"
import { v4 as uuidv4 } from "uuid"
import requestIdMiddleware from "./middlewares/request"
import corsOption from "./middlewares/cors"

const app: Express = express()
const port: number = 3000

app.use(corsOption)
app.use(helmet())
app.use(bodyParser.json())
app.use(helmet.frameguard({ action: "sameorigin" }))
app.use(requestIdMiddleware)

const products: any[] = [
  {
    id: uuidv4(),
    name: "Iphone 15 Pro",
    is_active: true,
  },
]

app.get("/", (req: Request, res: Response) => {
  try {
    const data = products

    res.json(data)
  } catch (error) {
    res.status(400).json({ error: 'An error occurred' });
  }
})

app.post("/create", (req: Request, res: Response) => {
  try {
    const id = uuidv4()
    const { name, is_active } = req.body

    const product = {
      id: id,
      name: name,
      is_active: is_active,
    }

    products.push(product)
    res.json(product)
  } catch (error) {
    res.status(400).json({ error: "An error occurred" })
  }
})

app.put("/update", (req: Request, res: Response) => {
  const id = req.body.id
  const name = req.body.name
  const isActive = req.body.is_active

  const index = products.findIndex((product) => product.id === id)

  if (index !== -1) {
    const newProduct = {
      id: id,
      name: name,
      is_active: isActive,
    }

    products[index] = newProduct

    res.json(newProduct)
  } else {
    res.status(400).json({ error: 'An error occurred' });
  }

  res.json({
    data: "Success",
  })
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
