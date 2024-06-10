/* eslint-disable */
const fs = require('fs');
const path = require('path');

const filesToMove = ['archivo1.txt', 'archivo2.txt']; // Lista de archivos a mover
const packageDir = __dirname; // Carpeta actual
const rootDir = path.join(packageDir, '../../../'); // Raíz del proyecto

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