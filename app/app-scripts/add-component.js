const fs = require('fs-extra');
const path = require('path')
const parseComponentExports = require('./parse-component-exports')

const componentsJson = parseComponentExports();
const componentKeys = Object.keys(componentsJson)

const componentTemplatePath = path.join(
  __dirname,
  'component-template.js'
)

const componentTemplate = fs.readFileSync(componentTemplatePath, 'utf8');

const componentsDir = path.join(
  process.cwd(),
  'src/components'
);

const addComponent = async (componentName) => {
  if (componentsJson[componentName])
    return

  const componentPath = path.join(
    componentsDir,
    componentName
  )

  if (await fs.pathExists(componentPath))
    return

  const componentSrcPath = path.join(
    componentPath,
    componentName + '.js'
  )

  const file = componentTemplate.replace(/Component/g, componentName)

  //await fs.mkdir(componentPath)

  //await fs.writeFile(componentSrcPath, file)

  componentKeys.push(componentName)
  componentKeys.sort()

  const exportsArray = []
  const exportString = `export { default as ${componentName} } from './${componentName}/${componentName}';`;

  componentKeys.forEach(key => {
    if (key === componentName)
      exportsArray.push(exportString)
    else
      exportsArray.push(componentsJson[key])
  });

  const updatedExports = `/* @flow */\n\n${exportsArray.join('\n')}`

  console.log(updatedExports)

}

module.exports = addComponent
