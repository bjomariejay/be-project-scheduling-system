#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

const directoriesToCopy = [
  'config',
  'controllers',
  'db-migration',
  'middleware',
  'models',
  'routes',
  'types',
  'utils',
];

const filesToCopy = [
  'server.js',
  'package.json',
  'package-lock.json',
  'README.md',
  'Dockerfile',
  'docker-compose.yml',
  'development-guide.md',
  'script.txt',
];

function cleanDist() {
  fs.rmSync(distDir, { recursive: true, force: true });
  fs.mkdirSync(distDir, { recursive: true });
}

function copyDirectory(sourceRelativePath) {
  const src = path.join(rootDir, sourceRelativePath);
  const dest = path.join(distDir, sourceRelativePath);
  if (!fs.existsSync(src)) return;
  fs.cpSync(src, dest, { recursive: true });
}

function copyFile(sourceRelativePath) {
  const src = path.join(rootDir, sourceRelativePath);
  const dest = path.join(distDir, sourceRelativePath);
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
}

function main() {
  console.log('Building backend bundle...');
  cleanDist();
  for (const dir of directoriesToCopy) {
    copyDirectory(dir);
  }
  for (const file of filesToCopy) {
    copyFile(file);
  }
  console.log('Build completed. Output in dist/');
}

main();
