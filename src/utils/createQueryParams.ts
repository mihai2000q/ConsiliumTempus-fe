export default function createQueryParams(obj: object): string {
  let result = '?'
  Object.entries(obj).forEach(([key, value]) => {
    if (typeof (value) === "undefined" || value === null) {
      result += ''
    } else if (value instanceof Array) {
      value.forEach(v => result += createQueryParam(key, v))
    } else {
      result += createQueryParam(key, value)
    }
  })

  return result === '?' ? '' : result
}

function createQueryParam(key: string, value: string) {
  return key + '=' + value + '&'
}