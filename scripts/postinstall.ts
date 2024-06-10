/* eslint-disable */
const fs = require('fs');
const path = require('path');

const filesToMove = ['../src']
const packageDir = __dirname
const rootDir = path.join(packageDir, '../../../')

filesToMove.forEach(file => {
  const srcPath = path.join(packageDir, file);
  const destPath = path.join(rootDir, file);

  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Archivo ${file} movido a ${destPath}`);
  } else {
    console.error(`El archivo ${file} no existe en ${srcPath}`);
  }
});