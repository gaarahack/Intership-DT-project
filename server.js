const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const PORT = process.env.PORT || 8000;

//can use mongodb (POSITIONAL) 
let tasks = [];
let email = [];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.get('/', (req, res) => {
    res.redirect('/todo');
});

app.get('/todo', (req, res) => {
    res.render('todo'); 
});

app.post('/todo', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log('Data received:', email, password);
    res.redirect(`/dashboard?email=${email}`);
});

app.get('/dashboard', (req, res) => {
    res.render('dashboard', { tasks }); 
});

app.post('/dashboard', (req, res) => {
    const task = req.body.task;
    if (task) {
        tasks.push(task); 
        console.log('Task added:', task);
    }
    res.redirect('/dashboard'); 
});


app.delete('/delete/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    if (taskId >= 0 && taskId < tasks.length) {
      tasks.splice(taskId, 1);
      return res.status(200).send({ success: true });
    }
    return res.status(404).send({ success: false, message: 'Task not found' });
  });
  

  app.put('/update/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const { task } = req.body;
    if (taskId >= 0 && taskId < tasks.length) {
      tasks[taskId] = task;
      return res.status(200).send({ success: true });
    }
    return res.status(404).send({ success: false, message: 'Task not found' });
  });



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
