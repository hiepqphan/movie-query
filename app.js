var express = require('express');
var app = express();
var request = require('request');
var bodyparser = require('body-parser');

app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static('public'));
app.set('view engine','ejs');

app.get('/', function(req, res) {
   res.render('home',{isSearching:false}); 
});

app.post('/searchmovie', function(req, res) {
   var url = 'http://www.omdbapi.com/?apikey=thewdb&';
   var value = req.body.text_input;
   var searchMethod = req.body.result_num;
   var searchForOne;
   if (searchMethod == "one") {
       searchForOne = true;
       url += 't=' + value;
   }
   else {
       searchForOne = false;
       url += 's=' + value;
   }
    
   request(url, function(error, response, body) {
      var data = JSON.parse(body);
      if (!error && response.statusCode == 200) {
          res.render('home', { isSearching:true, searchForOne:searchForOne, result:data });
      }
      else {
          res.send('There was an error.');
      }
   });
});

var PORT = process.env.PORT || 5000;

app.listen(PORT, function() {
    console.log('Server is running...');
});