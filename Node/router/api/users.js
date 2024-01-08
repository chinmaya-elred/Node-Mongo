const express = require ('express')
const router = express.Router();
const uuid  = require('uuid')

let users = require('../../User')

router.get('/', (req , res) =>{
    res.json(users)
})

router.get('/:id', (req , res) =>{
    const found = users.some((user) => user.id === parseInt(req.params.id))
    if(found){
        res.json(users.filter((user) => user.id === parseInt(req.params.id)))
    }else{
        res.sendStatus(400)
    }
})

router.post('/', (req, res) =>{
    const newUser = {
        id : req.body.id,
        name: req.body.name,
        email: req.body.email
    }
    console.log(newUser)
    if(!newUser.email || !newUser.name) {
        res.sendStatus(400);
    }
    users.push(newUser)
    res.json(users)
})

router.put('/:id' , (req, res) =>{

    const found = users.some((user) => user.id === parseInt(req.params.id));
    console.log(found, users.some((user) => console.log(user, req.params.id)))

    if(found){
        let updateUser = req.body;
        users.forEach( user => {
            if(user.id === parseInt(req.params.id)){
                user.name = updateUser.name ? updateUser.name : user.name
                user.email = updateUser.email ?updateUser.email: user.email,
                console.log(users)
                res.json({msg: 'updated user', users})
            }
        })
    }else{
        res.sendStatus(400)
    }
})


router.delete('/:id' , (req, res) =>{
    let found = users.some((user) => user.id === parseInt(req.params.id));

    if(found){
       users = users.filter((user) => user.id !== parseInt(req.params.id))
       res.json({
        msg: 'user deleted successfully',
        users
       })
    }else{
        res.sendStatus(400)
    }
})

module.exports = router