const replaceMap: { [key: string]: string } = {
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;',
  '<': '&lt;',
  '=': '&#x3D;',
  '>': '&gt;',
  '`': '&#x60;',
}

const sanitize = (input: string) => {
  return input
    .split('')
    .map((char) => replaceMap[char] ?? char)
    .join('')
}

export default sanitize
