const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'a140dfadbcc54b73a113fb333bb83a1e'
})
const handleClarifaiApiCall = (req, res) => {
    app.models.predict('f76196b43bbd45c99b4f3cd8e8b40a8a', req.body.input)
    .then(response => res.json(response))
    .catch(err => res.status(400).json('Error during the call of Clarifai api'))
}

const handleImagePut = (db) => (req,res) =>{
    const { id } = req.body;
    db('users')
    .where({id})
    .increment('entries',1)
    .returning('entries')
    .then(count =>{
        if(count.length)
            res.json(count[0]);
        else
            res.status(400).json('Unable to update the entries of the user')
        
    })
    .catch(err => res.status(404).json('Unable to get user'))
 }

 module.exports = {
    handleImagePut,
    handleClarifaiApiCall
 }