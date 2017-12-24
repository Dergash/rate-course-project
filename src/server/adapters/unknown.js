/**
 * @param {readline.ReadLine} reader
 * @returns {total: number, code: number, comment: number}
 */
function analyze(reader) {
  return new Promise((resolve, reject) => {
    let total = 0;
    reader
      .on('line', line => {
        if (!line.length) {
          total++;
        }
      })
      .on('close', () => {
        resolve({
          total,
        });
      });
  });
}

export default analyze;
