function removeLeadingAndTrailingSlashes(str) {
  if (!str) return str
  return str.replace(/(^[\/\\]+)|(\/[\/\\]+$)/g, "")
}

function replaceBackwardForForwardSlashes(str) {
  if (!str) return str
  return str.replace(/\\/g, "/")
}

export function resolvePath(path) {
  if (path instanceof Array) {
    let p = path.map(v => removeLeadingAndTrailingSlashes(replaceBackwardForForwardSlashes(v)))
    path = p.join('/')
  }
  return path
}