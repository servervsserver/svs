/**
 * Gets the extension of a file
 * @param {File} file File from which to extact the extension
 */
 export function getExtension(file) {
    if (!file) return ""
    return file.name.split(".").pop()
  }