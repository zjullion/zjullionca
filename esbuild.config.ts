import esbuild from 'esbuild'
import { readdirSync } from 'fs'
import { resolve } from 'path'

const backendDirectories = readdirSync(resolve(__dirname, 'backend'))
backendDirectories.forEach((directory) => {
  esbuild.build({
    bundle: true,
    entryPoints: [`backend/${directory}/src/*`],
    external: ['/opt/*', '@aws-sdk/*'],
    format: 'cjs',
    keepNames: true,
    outdir: `backend/${directory}/dist`,
    platform: 'node',
    target: 'node20',
  })
})
