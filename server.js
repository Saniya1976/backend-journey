const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const User = require('./models/user');
const dbconnection=require('./config/db'); 
const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use(morgan('dev'));
server.set('view engine', 'ejs');

server.use((req, res, next) => {
  console.log("hello babe this is middleware");
  next(); 
});

server.get('/', (req, res) => {
  res.send('hello world');
});

server.get('/about', (req, res) => {
  res.send('hello babe this is about page');
});
server.get('/register',(req,res)=>{
  res.render('register');
})
// Register route to handle user registration
//CRUD operation
//CREATE
server.post("/register", async (req, res) => {
  const {name,email,password}=req.body;
 const newuser= await User.create({
    name:name,
    email:email,
    password:password
  });
 
  console.log(req.body);
  res.send(newuser);
 
});
//READ
 server.get('/getusers',  (req, res) => {
    User.find().then((users)=>{
      res.send(users);
    })
  });
  //UPDATE
  server.get('/updateuser',async(req,res)=>{
   await User.findOneAndUpdate({name:'Saniya'}, {name:'Saniya Khan'}, {new:true})
    .then((user) => {
      res.send(user);
    })
  })
//DELETE
server.get('/deleteuser',async(req,res)=>{
  await User.findOneAndDelete({name:'cutie'})
    .then((user) => {
      res.send(user);
    })
})
server.use((req, res) => {
  res.status(404).send('Page not found');
});


server.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).send('Something broke!');
});

server.listen(3000, () => {
  console.log('server is running on http://localhost:3000');
});
