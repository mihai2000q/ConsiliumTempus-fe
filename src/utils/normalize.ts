export default function normalize(str: string, isLower: boolean = false): string {
  let res = isLower ? str[0].toLowerCase() : str[0]
  for (let i = 1; i < str.length; i++) {
    if (str[i] === str[i].toUpperCase())
      res += " "
    res += isLower ? str[i].toLowerCase() : str[i]
  }
  return res
}