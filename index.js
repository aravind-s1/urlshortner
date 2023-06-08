require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser')

const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}))

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

const URLS=[]
let id = 0
const regex = /((http|https):\/\/)?(www\.)?[a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

app.post('/api/shorturl/',function(req,res){
  let url = req.body.url
  id=id+1
  if (regex.test(url)) {
    URLS.push(url)
    res.json({url:url,shorturl:id})
  } else {
    res.json({error:"Invalid URL"});
  }  
})


app.get('/api/shorturl/:index',function(req,res){
  let index = req.params.index
  if(/[1-9]+/g.test(index))
    res.redirect(URLS[index-1])
  else
  res.json({error:"Invalid URL"});
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
