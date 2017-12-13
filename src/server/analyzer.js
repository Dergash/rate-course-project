import fs from 'fs';
import readline from 'readline';

const testFile = 'upload/projects/server.js';

const lineType = {
  code: 0,
  commentLine: 1,
  commentBlockStart: 2,
  commentBlockEnd: 3,
  dependency: 4,
};

export default class Analyzer {
  /**
   * @param {string} path
   */
  readSrcFile(path) {
    const reader = readline.createInterface({
      input: fs.createReadStream(testFile),
      crlfDelay: Infinity
    });
    let total = 0;
    let code = 0;
    let comment = 0;
    let dependencies = 0;
    let commentBlock = false;
    reader
      .on('line', (line) => {
        total++;
        const type = this.analyzeLine(line);
        if (type === lineType.commentBlockStart) {
          commentBlock = true;
          comment++;
          return;
        }
        if (type === lineType.commentBlockEnd) {
          commentBlock = false;
          comment++;
          return;
        }
        if (type === lineType.commentLine || commentBlock) {
          comment++;
          return;
        }
        if (type === lineType.dependency) {
          code++;
          dependencies++;
          return;
        }
        code++;
      })
      .on('close', () => {
        console.log(`total lines of code: ${total}`);
        console.log(`dependency modules: ${dependencies}`);
        console.log(`code lines: ${code}`);
        console.log(`comment lines: ${comment}`);
      });
  }

  /**
   * @param {string} line 
   * @returns {number} line type
   */
  analyzeLine(line) {
    const trimmedLine = line.trim();
    if (trimmedLine.startsWith('//')) {
      return lineType.commentLine;
    }
    if (trimmedLine.startsWith('/*')) {
      return lineType.commentBlockStart;
    }
    if (trimmedLine.indexOf('*/') !== -1) {
      return lineType.commentBlockEnd;
    }
    if (trimmedLine.startsWith('import ') || trimmedLine.indexOf(' require(') !== -1) {
      return lineType.dependency;
    }
    return lineType.code;
  }
}
