const lineType = {
  code: 0,
  commentLine: 1,
  commentBlockStart: 2,
  commentBlockEnd: 3,
  dependency: 4,
};

/**
 * @param {readline.ReadLine} reader
 * @returns {total: number, code: number, comment: number}
 */
function analyze(reader) {
  return new Promise((resolve, reject) => {
    let total = 0;
    let code = 0;
    let comment = 0;
    let dependencies = 0;
    let commentBlock = false;
    reader
      .on('line', line => {
        total++;
        const type = analyzeLine(line);
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
        resolve({
          total,
          code,
          comment,
          dependencies,
        });
      });
  });
}

/**
 * @param {string} line
 * @returns {number} line type
 */
function analyzeLine(line) {
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

export default analyze;
