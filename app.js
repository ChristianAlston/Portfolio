const express = require('express') 
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const mustacheExpress = require('mustache-express')
const nodemailer = require('nodemailer')
const mailGun = require('nodemailer-mailgun-transport')
require('dotenv').config()

const PORT = process.env.PORT

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

app.get('/reachingOut', (req, res) => {
    res.render('reachingOut')
})


const API_KEY = process.env.API_KEY
const DOMAIN = process.env.DOMAIN

app.post('/', (req, res) => {

    const auth = {
        auth: {
            type: 'OAuth2',
            api_key: API_KEY,
            domain: DOMAIN
        }
    }

    const transport = nodemailer.createTransport(mailGun(auth))

    const mailOptions = {
        from: 'xcda15@gmail.com',
        to: 'christianalstondev@gmail.com',
        subject: 'An inquiry from potential client',
        text: `${req.body.name} (${req.body.email}) says: ${req.body.company} `
    }


    transport.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log('Cannot process request')

        }
        else {
            console.log('Email sent!')
            res.redirect('/reachingOut')
        }
    })
})



app.listen(PORT, () => {
    console.log(`Port running on port ${PORT}`)
})
