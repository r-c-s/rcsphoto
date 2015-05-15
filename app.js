
/**
 * Module dependencies.
 */

var bodyParser = require('body-parser');
var express    = require('express');
var app        = express();
var router     = express.Router();
var server     = require('http').Server(app);
var favicon    = require('serve-favicon');

app.set('port', process.env.PORT || 9906);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(favicon('public/img/favicon.ico'));
app.use(express.static(__dirname + '/public'));
app.use(require('multer')());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

app.use(router);

router.use(function(req, res, next) {
  req.root = req.protocol + "://" + req.get("host");
  next();
});

var album = require("./routes/album");

router.get('/about', function(req, res) { res.render('about'); });

router.get('/',          album.getAlbums);
router.get('/:albumId?', album.getAlbum); 

server.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
 