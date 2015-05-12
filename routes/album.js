var _      = require('underscore');
var cradle = require('cradle');

var dbInfo   = JSON.parse(require('fs').readFileSync('dbinfo.json').toString());
var database = new(cradle.Connection)(dbInfo.host, 443, {
  auth: { 
    username : dbInfo.username, 
    password : dbInfo.password
  },
  cache : false
}).database(dbInfo.database);

/*******************************************************************************
 * 
 */
module.exports.getAlbums = function(req, res) {
  database.all(function(error, data) {
    if (error) { console.warn(error); throw error; }

    database.get(_.map(data.rows, function(row) { return row.id; }), function(error, data) {
      if (error) { console.warn(error); throw error; }
      
      res.render('index', { albums : _.map(data.rows, function(row) { return row.doc; }) });
    });
  });
};

/*******************************************************************************
 * 
 */
module.exports.getAlbum = function(req, res) {
  database.get(req.params.albumId, function(error, album) {
    if (error) { console.warn(error); throw error; } 
    
    res.render('album', { album : album });
  });
};