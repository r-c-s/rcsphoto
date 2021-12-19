// node generateSizes.ts

const im = require('imagemagick');
const fs = require('fs');

const rcsPhotoFolder = '/home/raphael/workspace/images/rcsphoto';

fs.readdir(rcsPhotoFolder, (err, folders) => {
  folders.forEach(folder => {
    fs.readdir(rcsPhotoFolder + '/' + folder, (err, sizeFolders) => {
      fs.readdir(rcsPhotoFolder + '/' + folder + '/full', (err, files) => {
        files?.forEach(file => {
          const image = rcsPhotoFolder + '/' + folder + '/full/' + file;
          resize(rcsPhotoFolder + '/' + folder, 'thumb', 256, image);
          resize(rcsPhotoFolder + '/' + folder, 'small', 512, image);
          resize(rcsPhotoFolder + '/' + folder, 'medium', 1024, image);
          resize(rcsPhotoFolder + '/' + folder, 'large', 1920, image);
        });
      });
    });
  });
});

function resize(directory, sizeDirectory, maxDimension, sourcePath) {
  const destinationPath = directory + '/' + sizeDirectory + '/' + sourcePath.substring(sourcePath.lastIndexOf('/') + 1);

  // if (directory.includes('hawaii_2015') && maxDimension === 256) {
  //   console.log(`"${sourcePath.substring(sourcePath.lastIndexOf('/') + 1)}",`);
  // }

  if (fs.existsSync(destinationPath)) {
    return;
  }
  
  console.log('Creating ' + destinationPath);

  im.identify(['-format', '%wx%h', sourcePath], function(err, output) {
    if (err) throw err;

    const width = +output.substring(0, output.indexOf('x'));
    const height = +output.substring(output.indexOf('x') + 1)
    const max = Math.max(width, height);
    const newWidth = width / max * maxDimension;
    const newHeight = height / max * maxDimension;

    im.convert(
      [sourcePath, '-resize', `${newWidth}x${newHeight}`, destinationPath], 
      (err, stdout) => {
        if (err) throw err;
        console.log('Created ' + destinationPath);
      });
  });
}