var _      = require('underscore');
var cradle = require('cradle');
var vcapServices = require('vcap_services');
var credentials = vcapServices.findCredentials({ service: 'cloudantNoSQLDB' });
var imageBaseUrl = 'http://d164y11hqgve5j.cloudfront.net';

function dbConnection() {
  return new(cradle.Connection)({
    host : credentials.host, 
    port : credentials.port, 
    auth: { 
      username : credentials.username, 
      password : credentials.password
    },
    secure : true,
    cache  : true
  }).database("rcsphoto");
}

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
      
      res.render('index', { 
        albums : _.map(data.rows, function(row) { return enrichAlbum(row.doc); })
           .sort(function(a, b) { return a.sortOrder - b.sortOrder; })
      });
    });
  });
};

module.exports.getAlbum = function(req, res) {
  dbConnection().get(req.params.albumId, function(error, album) {
    if (error) { 
      console.warn(error); 
      return res.render('error', { message : JSON.stringify(error, null, ' ') });
    }
    
    res.render('album', { album : enrichAlbum(album) });
  });
};

function enrichAlbum(album) {
  return {
    id: album.id,
    name: album.name,
    coverImage: album.coverImage,
    sortOrder: album.sortOrder,
    coverImage: createUrl(album.id, album.coverImage, 'small'),
    images: _.map(album.images, function(image) {
      return {
        thumb: createUrl(album.id, image, 'thumb'),
        small: createUrl(album.id, image, 'small'),
        medium: createUrl(album.id, image, 'medium'),
        large: createUrl(album.id, image, 'large'),
        full: createUrl(album.id, image, 'full')
      }
    })
  }
}

function createUrl(albumId, imageName, size) {
  return imageBaseUrl + '/' + albumId + '/' + size + '/' + imageName;
}