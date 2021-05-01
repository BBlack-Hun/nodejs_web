const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

app.use(bodyParser.urlencoded({ extended: false }));
app.locals.pretty = true;
app.set('views', './views_file');
app.set('view engine', 'ejs');

app.get('/topic/new', (req, res) => {
  res.render('new');
});

app.get('/topic', (req, res) => {});

app.post('/topic', (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  fs.writeFile('data/' + title, description, (err) => {
    // 존재하지 않는 폴더나 이상한 접근을 할때.... 에러가 발생
    if (err) {
      res.status(500).send('Internal Server Error');
    }
    res.send('Success!');
  });
});

app.listen(3000, () => {
  console.log('Connected, 3000 port!');
});
