import path from 'path'
import * as YAML from 'yaml'
import fs from 'fs/promises'
import { createDoc } from '.'

const outputPath = path.resolve(
  __dirname,
  '..',
  '..',
  'static',
  'openapi.yml'
)

const go = async () => {
  const spec = createDoc()
  const ymlSpec = YAML.stringify(spec)

  await fs.writeFile(
    outputPath,
    ymlSpec
  )
}

void go()