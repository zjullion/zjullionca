const replaceMap: { [key: string]: string } = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;',
}

const sanitize = (input: string) => {
  return input
    .split('')
    .map((char) => replaceMap[char] ?? char)
    .join('')
}

export default sanitize
