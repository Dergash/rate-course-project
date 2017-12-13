import fs from 'fs';
import readline from 'readline';
import JSAnalyzer from './adapters/javascript';
import VueAnalyzer from './adapters/vue';
import UnknownAnalyzer from './adapters/unknown';

/**
 * TODO: move to file utils
 * @param {string} path
 */
function getFileName(path) {
  const elements = path.split('/');
  if (elements.length === 1) {
    return path;
  }
  const name = elements[elements.length - 1];
  return name;
}

/**
 * TODO: move to file utils
 * @param {string} fileName
 */
function getFileExtension(fileName) {
  const elements = fileName.split('.');
  if (elements.length === 1) {
    return null;
  }
  const extension = elements[elements.length - 1];
  return `.${extension}`;
}

export default class Analyzer {

  constructor() {
    this.report = {
      total: 0,
      code: 0,
      comment: 0,
      css: 0,
      html: 0,
      files: [],
    };
  }

  getReport() {
    return this.report;
  }

  async analyzePath(path) {
    const stats = fs.statSync(path);
    if (stats.isDirectory()) {
      const nodes = fs.readdirSync(path);
      await Promise.all(nodes.map(node => this.analyzePath(`${path}/${node}`)));
    }
    if (stats.isFile()) {
      const fileName = getFileName(path);
      const extension = getFileExtension(fileName);
      const stats = await this.analyzeFile(path, extension);
      this.report.files.push({
        path,
        fileName,
        extension,
        stats,
      });
      this.report.total = this.report.files
        .map(file => file.stats.total)
        .reduce((prev, next) => prev + next);
      this.report.code = this.report.files
        .map(file => file.stats.code ? file.stats.code : 0)
        .reduce((prev, next) => prev + next);
      this.report.comment = this.report.files
        .map(file => file.stats.comment ? file.stats.comment : 0)
        .reduce((prev, next) => prev + next);
      this.report.css = this.report.files
        .map(file => file.stats.css ? file.stats.css : 0)
        .reduce((prev, next) => prev + next);
      this.report.html = this.report.files
        .map(file => file.stats.html ? file.stats.html : 0)
        .reduce((prev, next) => prev + next);
    }
  }

  /**
   * @param {string} path
   * @param {string} extension
   */
  async analyzeFile(path, extension) {
    const reader = readline.createInterface({
      input: fs.createReadStream(path),
      crlfDelay: Infinity
    });
    let stats = {};
    if (extension === '.js') {
      stats = await JSAnalyzer(reader);
      return stats;
    }
    if (extension === '.vue') {
      stats = await VueAnalyzer(reader);
      return stats;
    }
    stats = await UnknownAnalyzer(reader);
    return stats;
  }
}
