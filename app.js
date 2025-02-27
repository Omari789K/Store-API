require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

const connectDB = require('./db/connect')
const router = require('./routes/products')

const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')

app.use(express.json())
app.use(express.static("./"))

app.get('/', (req,res)=>{
    res.send('<h1>Store API</h1><a href="/api/v1/products">Products Page</a>')
})

app.use('/api/v1/products', router)

app.use(notFoundMiddleware)
app.use(errorMiddleware)


const port = process.env.PORT || 3000;

const start = async () => {
    try {
        
        await connectDB(process.env.MONGO_URI)
        
        app.listen(port, ()=>{
            console.log(`Server listening on ${port}`);
            
        })
    } catch (error) {
        
    }
}

start()