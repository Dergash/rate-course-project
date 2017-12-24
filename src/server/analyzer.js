import fs from 'fs';
import readline from 'readline';
import JSAnalyzer from './adapters/javascript';
import VueAnalyzer from './adapters/vue';
import UnknownAnalyzer from './adapters/unknown';
import { getFileName, getFileExtension } from '../utils/fs';

export default class Analyzer {
  constructor() {
    this.report = {
      metrics: [
        { name: 'total', value: 0 },
        { name: 'javascript', value: 0 },
        { name: 'comment', value: 0 },
        { name: 'css', value: 0 },
        { name: 'html', value: 0 },
      ],
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
      const metricTypes = this.report.metrics.map(metric => metric.name);
      metricTypes.forEach(type => {
        this.report.metrics = this.report.metrics.map(metric => {
          return (metric.name === type)
          ? {
            name: type,
            value: this.report.files
              .map(file => file.stats[type] ? file.stats[type] : 0)
              .reduce((prev, next) => prev + next),
          }
          : metric;
        }
        );
      });
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
