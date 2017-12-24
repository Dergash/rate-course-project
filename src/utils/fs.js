/**
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

export { getFileName, getFileExtension };
