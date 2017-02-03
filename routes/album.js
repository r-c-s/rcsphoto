var _      = require('underscore');
var cradle = require('cradle');
var dbInfo = JSON.parse(require('fs').readFileSync('dbinfo.json').toString());

/*******************************************************************************
 * 
 */
function dbConnection() {
  return new(cradle.Connection)({
    host : dbInfo.host, 
    port : dbInfo.port, 
    auth: { 
      username : dbInfo.username, 
      password : dbInfo.password
    },
    secure : true,
    cache  : true
  }).database(dbInfo.database);
}

/*******************************************************************************
 * 
 */
module.exports.getAlbums = function(req, res) {
  dbConnection().all(function(error, data) {
    if (error) { 
      console.warn(error); 
      return res.render('error', { message : JSON.stringify(error, null, ' ') });
    }

    dbConnection().get(_.map(data.rows, function(row) { return row.id; }), function(error, data) {
      if (error) { 
        console.warn(error); 
        return res.render('error', { message : JSON.stringify(error, null, ' ') });
      }
      
      res.render('index', { albums : _.map(data.rows, function(row) { return row.doc; }) });
    });
  });
};

/*******************************************************************************
 * 
 */
module.exports.getAlbum = function(req, res) {
  dbConnection().get(req.params.albumId, function(error, album) {
    if (error) { 
      console.warn(error); 
      return res.render('error', { message : JSON.stringify(error, null, ' ') });
    }
    
    res.render('album', { album : album });
  });
};