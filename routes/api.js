const Task = require('../models/task');
const express = require('express');
const router = express.Router();
// Create
router.post('/new', (req, res) => {
    const newTask = new Task({ task: req.body.task });
    newTask.save().then(() => {
        res.status(200).json(newTask)
    }).catch((err) => {
        console.log(err);
        console.log('CREATE Error: ' + err);
        res.status(500).send('Error');
    })
});
// get All
router.get('/newAll', async (req, res) => {
    console.log('request data')
    try {
        const list = await Task.find();
        if (list) {
            res.status(200).json(list)
        }
    } catch (err) {
        console.log(err)
    }

});

/* DELETE */
router.route('/:id').delete((req, res) => {
    Task.findById(req.params.id, (err, task) => {
        if (err) { console.log('DELETE Error: ' + err); res.status(500).send('Error'); }
        else if (task) { task.remove(() => { res.status(200).json(task); }); }
        else { res.status(404).send('Not found'); }
    });
});
module.exports = router;

