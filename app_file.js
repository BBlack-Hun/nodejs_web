const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

app.use(bodyParser.urlencoded({ extended: false }));
app.locals.pretty = true;
app.set('views', './views_file');
app.set('view engine', 'ejs');

app.get('/topic/new', (req, res) => {
  fs.readdir('data', (err, files) => {
    if (err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    res.render('new', { topics: files });
  });
});

// 먼저 코드를 작성하고 -> 리펙토링을 한다.
app.get(['/topic', '/topic/:id'], (req, res) => {
  const id = req.params.id;
  fs.readdir('data', (err, files) => {
    if (err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    if (id) {
      // id값이 있을 때
      fs.readFile('data/' + id, 'utf-8', (err, data) => {
        if (err) {
          console.log(err);
          res.status(500).send('Internal Server Error');
        }
        console.log(data);
        res.render('view', { title: id, content: data, topics: files });
      });
    } else {
      // id 값이 없을 때
      res.render('view', {
        topics: files,
        title: 'Welcome',
        content: 'Hello JavaScript for server',
      });
    }
  });
});

// app.get('/topic/:id', (req, res) => {
//   const id = req.params.id;

//   fs.readdir('data', (err, files) => {
//     if (err) {
//       console.log(err);
//       res.status(500).send('Internal Server Error');
//     }

//     fs.readFile('data/' + id, 'utf-8', (err, data) => {
//       if (err) {
//         console.log(err);
//         res.status(500).send('Internal Server Error');
//       }
//       console.log(data);
//       res.render('view', { title: id, content: data, topics: files });
//     });
//   });
// });

app.post('/topic', (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  fs.writeFile('data/' + title, description, (err) => {
    // 존재하지 않는 폴더나 이상한 접근을 할때.... 에러가 발생
    if (err) {
      res.status(500).send('Internal Server Error');
    }
    res.redirect('/topic/' + titlen);
  });
});

app.listen(3000, () => {
  console.log('Connected, 3000 port!');
});
