const path = require('path')
const fs = require('fs-extra')

const re = /export { default as (\w+) } from '\.\/(\w+)\/(\w+)';/

const componentsPath = path.join(
  process.cwd(),
  'src/components/index.js'
)

const components = fs.readFileSync(
  componentsPath,
  'utf8'
)

const parseComponentExports = () => {
  const lines = components.split('\n').filter(Boolean)

  const json = {}
  lines.forEach(line => {
    if (re.test(line)) {
      const [_, name, ...rest] = re.exec(line)
      json[name] = line
    } else {
      console.log(`no match found for\n${line}\n`)
    }
  })

  return json
}

module.exports = parseComponentExports
