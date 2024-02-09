import * as path from 'path'
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin'

const config = {
  entry: './src/index.ts',
  externals: /\/opt\/nodejs/,
  module: {
    rules: [
      {
        exclude: /node_modules/,
        resolve: {
          extensions: ['.ts'],
        },
        test: /\.ts$/,
        use: 'ts-loader',
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, './dist'),
  },
  resolve: {
    plugins: [new TsconfigPathsPlugin({ baseUrl: './' })],
  },
  target: 'node20',
}

export default config
