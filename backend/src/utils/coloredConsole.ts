
const log = (text: string, textColor: TextColor) => {
  let EndColoring = "\x1b[0m"
  let log = ""
  log += textColor
  log += text
  log += EndColoring
  console.log(log)
}

enum TextColor {
  Black = "\x1b[30m",
  Red = "\x1b[31m",
  Green = "\x1b[32m",
  Yellow = "\x1b[33m",
  Blue = "\x1b[34m",
  Magenta = "\x1b[35m",
  Cyan = "\x1b[36m",
  White = "\x1b[37m",
  Gray = "\x1b[90m",
}

export default {log, TextColor}