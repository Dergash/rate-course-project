import express from 'express';
import cors from 'cors';
import multer from 'multer';
import fs from 'fs';
import unzip from 'unzip';
import errors from './errors';

const uploadFolder = 'upload';
const projectsFolder = 'projects';

const upload = multer({ dest: `${uploadFolder}/` });
const app = express();
app.use(cors());
const port = 3000;

console.log(`> Starting API server at port ${port}`);

app.post('/projects/', upload.any(), (req, res) => {
  console.log(`New request from ${req.connection.remoteAddress}`);
  if (!req.files || !req.files.length) {
    console.log(errors.NO_ARCHIVE);
    res.status(400).send(errors.NO_ARCHIVE);
    return;
  }
  const archive = req.files[0];
  console.log(`Received file ${archive.originalname}`);
  renameRequestFile(archive)
    .then(unzipProject)
    .then(() => res.sendStatus(200))
    .catch(e => {
      res.status(500).send(e);
    });
});

app.listen(port);

function renameRequestFile(archive) {
  return new Promise((resolve, reject) => {
    fs.rename(archive.path, `${archive.destination}/${archive.originalname}-${archive.filename}`, (err) => {
      if (err) {
        reject(errors.SAVE_FAILED);
      }
      resolve(archive);
    });
  });
}

function unzipProject(archive) {
  return new Promise((resolve, reject) => {
    const projectPath = `${uploadFolder}/${projectsFolder}/${archive.filename}/${archive.originalname}`;
    fs.createReadStream(`${archive.destination}/${archive.originalname}-${archive.filename}`)
      .pipe(unzip.Parse())
      .on('entry', entry => {
        const type = entry.type;
        if (type === 'Directory') {
          mkpathSync(`${projectPath}/${entry.path}`);
          return;
        }
        console.log(`Extracted file ${entry.path}`);
        entry.pipe(fs.createWriteStream(`${projectPath}/${entry.path}`));
      })
      .on('error', () => reject(errors.UNZIP_FAILED))
      .on('close', resolve);
  });
}

/**
 * Create full path on file system
 * TODO: Move to separate utils.js
 * @param {string} path
 */
function mkpathSync(path) {
  const folders = path.split('/');
  folders.reduce((prev, next) => {
    const path = `${prev}/${next}`;
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }
    return path;
  });
}
