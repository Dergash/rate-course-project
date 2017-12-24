const lineType = {
  javascript: 0,
  commentLine: 1,
  commentBlockStart: 2,
  commentBlockEnd: 3,
  templateBlockStart: 4,
  templateBlockEnd: 5,
  scriptBlockStart: 6,
  scriptBlockEnd: 7,
  styleBlockStart: 8,
  styleBlockEnd: 9,
  empty: 10,
};

/**
 * @param {readline.ReadLine} reader
 * @returns {total: number, code: number, comment: number}
 */
function analyze(reader) {
  return new Promise((resolve, reject) => {
    let total = 0;
    let html = 0;
    let javascript = 0;
    let css = 0;
    let comment = 0;
    let commentBlock = false;
    let templateBlock = false;
    let scriptBlock = false;
    let styleBlock = false;
    reader
      .on('line', line => {
        const type = analyzeLine(line);
        if (type !== lineType.empty) {
          total++;
        } else {
          return;
        }
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
        if (type === lineType.templateBlockStart) {
          html++;
          templateBlock = true;
          return;
        }
        if (type === lineType.templateBlockEnd) {
          html++;
          templateBlock = false;
          return;
        }
        if (templateBlock) {
          html++;
          return;
        }
        if (type === lineType.scriptBlockStart) {
          html++;
          scriptBlock = true;
          return;
        }
        if (type === lineType.scriptBlockEnd) {
          html++;
          scriptBlock = false;
          return;
        }
        if (scriptBlock) {
          javascript++;
          return;
        }
        if (type === lineType.styleBlockStart) {
          html++;
          styleBlock = true;
          return;
        }
        if (type === lineType.styleBlockEnd) {
          html++;
          styleBlock = false;
          return;
        }
        if (styleBlock) {
          css++;
          return;
        }
      })
      .on('close', () => {
        resolve({
          total,
          javascript,
          comment,
          html,
          css,
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
  if (trimmedLine.startsWith('<template')) {
    return lineType.templateBlockStart;
  }
  if (trimmedLine.indexOf('</template>') !== -1) {
    return lineType.templateBlockEnd;
  }
  if (trimmedLine.startsWith('<script')) {
    return lineType.scriptBlockStart;
  }
  if (trimmedLine.indexOf('</script>') !== -1) {
    return lineType.scriptBlockEnd;
  }
  if (trimmedLine.startsWith('<style')) {
    return lineType.styleBlockStart;
  }
  if (trimmedLine.indexOf('</script>') !== -1) {
    return lineType.styleBlockEnd;
  }
  if (trimmedLine.length === 0) {
    return lineType.empty;
  }
  return lineType.javascript;
}

export default analyze;
