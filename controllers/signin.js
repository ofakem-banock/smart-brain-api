const handleSignin = (db, bcrypt) => (req,res) => {
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).json('Incorrect form submission');
    }

    db.select('email','hash').from('login').where('email','=',email)
    .then(data =>{
        bcrypt.compare(password, data[0].hash)
        .then(result =>{
            if(result){
               return db.select('*').from('users').where('email','=',data[0].email)
                .then(user =>{
                    res.json(user[0]);
                })
                .catch(err =>  res.status(400).json('unable to get user'))
            } else {
                res.status(400).json('wrong credentials');
            }
        })
        .catch(err =>  res.status(400).json('wrong credentials'))
    })
    .catch(err =>  res.status(404).json('error during the signin'))
}

module.exports = {
    handleSignin
}