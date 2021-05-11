const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
        host : process.env.DATABASE_URL,
        ssl: true
    }
});



const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req,res) => { res.send('success'); })

app.post('/signin', signin.handleSignin(db, bcrypt) )

app.post('/register', (req,res) => { register.handleRegister(req, res, db, bcrypt) })

app.get('/profile/:id', profile.handleProfileGet(db))

app.put('/image', image.handleImagePut(db) )
app.post('/imageurl', (req,res) => { image.handleClarifaiApiCall(req, res) })

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>{ console.log(`app is running on port ${PORT}`); })