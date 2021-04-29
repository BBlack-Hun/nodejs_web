const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.locals.pretty = true;
app.set('views', './views_file');
app.set('view engine', 'ejs');

app.get('/topic/new', (req, res) => {
  res.render('new');
});

app.post('/topic', (req, res) => {
  const title = req.body.title;
  const discription = req.body.discription;
  res.send('Hi, Post, ' + title + ', ' + discription);
});

app.listen(3000, () => {
  console.log('Connected, 3000 port!');
});
