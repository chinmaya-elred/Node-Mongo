const express = require ('express')
const path =  require('path')
const handlebars = require('handlebars')
const exphbs = require('express-handlebars')
const { allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const bodyParser = require ('body-parser')

const app = express();

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

app.get('/' , (req, res) =>{
  res.send(`
  <h2>Welcome to Learn MongoDB</h2>
  <h3>Click here to get access to the <b><a href="/student/list">Dashboard</a></b></h3>
  `)
})

app.set('views', path.join(__dirname, '/views/'))

app.engine("hbs", exphbs({
    handlebars: allowInsecurePrototypeAccess(handlebars),
    extname: 'hbs',
    defaultLayout: 'MainLayout',
    layoutDir: __dirname + "/views/layouts/",
})
)

app.set("View Engine", 'hbs')

app.listen(3000, ()=>{
    console.log('Server is running on port 3000')
})