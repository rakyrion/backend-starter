/* eslint-disable */
const fs = require('fs-extra');
const path = require('path');

const filesToMove = ['../src', '../../tsconfig.json', '../package.json', '../.eslintrc.json', '../.gitignore']; // Lista de archivos a mover
const packageDir = __dirname; // Carpeta actual
const rootDir = path.join(packageDir, '../../../'); // Raíz del proyecto

filesToMove.forEach(async file => {
	const srcPath = path.join(packageDir, file);
	const destPath = path.join(rootDir, file);

	try {
		await fs.copy(srcPath, destPath);
		console.log(`Archivo o directorio ${file} movido a ${destPath}`);
	} catch (err) {
		console.error(`Error al mover ${file}:`, err);
	}
});