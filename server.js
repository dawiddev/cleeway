const express = require ('express')
const path = require('path')
const bodyParser = require('body-parser')

const PORT = 3000 || process.env.PORT

const app = express()


app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({extended: true}))


app.get('/', (req, res)=> {
    res.sendFile(path.join(__dirname,'public/index.html'))
})


app.listen(PORT, ()=>{
    console.log(`App started on port ${PORT}`)
})