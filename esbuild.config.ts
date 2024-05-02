import esbuild from 'esbuild'
import { readdirSync, rmSync } from 'fs'

const backendDirectories = readdirSync('backend')
backendDirectories.forEach((directory) => {
  rmSync(`backend/${directory}/dist`, { force: true, recursive: true })

  esbuild.build({
    bundle: true,
    entryPoints: [`backend/${directory}/src/*`],
    external: ['/opt/*', '@aws-sdk/*'],
    format: 'cjs',
    keepNames: true,
    outdir: `backend/${directory}/dist`,
    platform: 'node',
    target: 'node22',
  })
})
