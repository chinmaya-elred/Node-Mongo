const express = require ('express')
const app = express();

app.get('/', (req, res) =>{
    res.send('This was my first phase of Learning Node JS')
})
app.listen(3000, ()=>{
    console.log('Server is running on port 3000')
})