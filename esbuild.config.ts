import esbuild from 'esbuild'
import { readdirSync } from 'fs'
import { resolve } from 'path'

const backendDirectories = readdirSync(resolve(__dirname, 'backend'))
backendDirectories.forEach((directory) => {
  esbuild.build({
    bundle: true,
    entryPoints: [`backend/${directory}/src/index.ts`],
    external: ['/opt/nodejs/*'],
    format: 'esm',
    keepNames: true,
    outfile: `backend/${directory}/dist/index.js`,
    platform: 'node',
    target: 'node20',
  })
})
