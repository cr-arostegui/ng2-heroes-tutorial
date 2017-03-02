const Heroes = require('./heroe.model.js');

function get (req, res) {
  if(!req.query.name){
    return Heroes.find()
          .then(heroesList => res.send({ data: heroesList}))
          .catch(error => res.send(error));
  }
  var term = new RegExp(req.query.name, 'i');
  return Heroes.find({ name : term})
                .then(heroesList => res.send({ data: heroesList }))
                .catch(error => res.send(error));
}

function getById (req, res) {
  return Heroes.findOne({id: req.params.heroe_id})
                .then(heroe => res.send({ data: heroe }))
                .catch(error => res.send(error));
}

function update (req, res) {
  return Heroes.findOneAndUpdate(
    {id: req.params.heroe_id},
    { $set: { name: req.body.name }},
    { new: true })
    .then(heroe => res.send({ data: heroe }))
    .catch(error => res.send(error));
}

function post (req, res) {
  return Heroes.create({
    id: req.body.id,
    name: req.body.name
  })
  .then(heroe => res.send({data: heroe}))
  .catch(error => res.send(error));
}

function remove (req, res) {
  return Heroes.findOneAndRemove({id: req.params.heroe_id})
                .then(() => res.send('Heroe deleted'))
                .catch(error => res.send(error));
}

module.exports = { get, post, getById, update, remove };