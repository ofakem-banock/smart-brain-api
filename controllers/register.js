const handleRegister = (req, res, db, bcrypt) => {

    const {email, name, password} = req.body;
    if(!email || !name || !password){
        return res.status(400).json('Incorrect form submission');
    }
      
    bcrypt.hash(password, 10)
    .then(storeHashInDb =>{
        db.transaction(trx =>{
           trx.insert({
               email: email,
               hash: storeHashInDb
           })
           .into('login')
           .returning('email')
           .then(loginemail =>{
                return trx('users')
                .insert({
                    name: name,
                    email: loginemail[0],
                    joined: new Date()
                })
                .returning('*')
                .then(user =>{
                    res.json(user[0]);
                })
           })
           .then(trx.commit)
           .catch(trx.rollback)
        })
        .catch(err => res.status(400).json('Unable to register'))
    })
    .catch(() => res.status(404).json('Error during the user creation'))   
}

module.exports = {
    handleRegister
}