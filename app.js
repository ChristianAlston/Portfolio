const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const mustacheExpress = require('mustache-express')
require('dotenv').config()
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const myEmail = process.env.EMAIL
const secondEmail = process.env.SECONDEMAIL
const subject = process.env.SUBJECT


const PORT = 4000

app.use(bodyParser.json())

app.use(express.static(path.join(__dirname + '/styles')))
app.use(express.static(path.join(__dirname + '/images')))
app.use(express.static('dom'))
const VIEWS_PATH = path.join(__dirname, '/views')

app.engine('mustache', mustacheExpress(VIEWS_PATH + '/partials', '.mustache'))


app.set('views', VIEWS_PATH)
app.set('view engine', 'mustache')

app.use(bodyParser.urlencoded({
    extended: false
}))


app.get('/', (req, res) => {
    res.render('index')
})



app.listen(PORT, () => {
    console.log(`Port running on port ${PORT}`)
})
