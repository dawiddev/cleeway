require('dotenv').config()

const express = require ('express')
const path = require('path')
const bodyParser = require('body-parser')
const rp = require('request-promise');



const PORT = process.env.PORT || 3000

const app = express()


app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({extended: true}))


app.get('/', (req, res)=> {
    res.sendFile(path.join(__dirname,'public/index.html'))
})

app.post('/', (req, res)=>{
    console.log(req.body)
    const firstName = req.body.firstname
    const lastName = req.body.lastname
    const email = req.body.email
    const service = req.body.service


    var  mailChimpData = {
        members : [{
            email_address : email,
            status : 'subscribed',
            merge_fields :{
                FNAME : firstName,
                LNAME : lastName,
                SERVICE: service  
            }
        }
        ]
    } 

    var jsonMailChimpData = JSON.stringify(mailChimpData);

 console.log(email)

var options ={
    url :`https://us19.api.mailchimp.com/3.0/lists/${process.env.UNIQUE_AUDIENCE_ID}`,
    method : 'POST',
    headers :{
        Authorization :`david ${process.env.MAILCHIMP_API_KEY}`,

    },
    body: jsonMailChimpData
}

rp(options)
.then(() =>{
    res.sendFile(path.join(__dirname + '/public/success.html'))
 console.log('Done');
})
.catch((err) =>{
    res.sendFile(path.join(__dirname + '/public/failure.html'))
console.log(err);
})
})


app.listen(PORT, ()=>{
    console.log(`App started on port ${PORT}`)
})