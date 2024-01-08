const express = require ('express')
const jwt = require('jsonwebtoken')
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false}))
app.use('/api/users', require('./router/api/users'))

app.get('/', (req, res) =>{
    res.send('This was my first phase of Learning Node JS')
})

app.get('/api', (req, res) =>{
    res.json({ message: 'I am going to start the JWT part'})
})

app.post('/api/posts',  verifyToken, (req, res) =>{
    jwt.verify(req.token , 'secreatekey' , (err, authData) =>{
        if(err){
            res.sendStatus(403)
        }else{
            res.json({
                message: 'Posts are created ...',
                authData
            })
        }
    })
})

app.post('/api/login', (req, res) =>{
   const newUser = {
    id: 1,
    name: 'Chinmaya',
    email: 'chinmaya@elred.io'
   }

   jwt.sign({ newUser: newUser}, 'secreatekey', (err, token) =>{
    res.json({
        token
    })
   })
})

function verifyToken (req, res, next){
  const bearerHeader = req.headers['authorization']
  if(typeof bearerHeader !== 'undefined'){
     const bearerToken = bearerHeader.split(' ')[1]
     req.token =bearerToken
     next();
  }else{
    res.sendStatus(403)
  }
}

app.listen(3000, ()=>{
    console.log('Server is running on port 3000')
})