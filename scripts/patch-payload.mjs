import fs from 'fs'
import path from 'path'

const file = path.resolve('node_modules/payload/dist/utilities/dynamicImport.js')
if (fs.existsSync(file)) {
  let content = fs.readFileSync(file, 'utf8')
  if (!content.includes('safePath')) {
    content = content.replace(
      "return await eval(`import('${importPath}')`);",
      "const safePath = importPath.replace(/'/g, \"\\\\'\");\n    return await eval(`import('${safePath}')`);"
    )
    fs.writeFileSync(file, content, 'utf8')
    console.log('[patch-payload] Successfully patched dynamicImport.js for paths with single quotes.')
  } else {
    console.log('[patch-payload] dynamicImport.js is already patched.')
  }
}
