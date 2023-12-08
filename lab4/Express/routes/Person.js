var express = require('express');
const { PersonSchema } = require('../db');
var router = express.Router();

router.get('/', function(req, res, next) {
    PersonSchema.findAll()
    .then((people) => {
        res.status(200).json(people);
    })
    .catch((error) => {
        console.error('Error fetching people:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    });
});

router.get('/:id', function(req, res, next) {
    const id = req.params.id;
    PersonSchema.findByPk(id)
    .then((people) => {
        res.status(200).json(people);
    })
    .catch((error) => {
        console.error('Error fetching people:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    });
});

router.post('/create',(req,res,next)=>{ 
    const { name, surname, job } = req.body;

    PersonSchema.create({ name, surname, job })
    .then((person) => {
        res.status(201).json(person); // 201 indicates resource creation
    })
    .catch((error) => {
        console.error('Error creating person:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    });

})

module.exports = router;
