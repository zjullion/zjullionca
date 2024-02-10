import HtmlWebpackPlugin from 'html-webpack-plugin'
import * as path from 'path'
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin'

const config = {
  devServer: {
    historyApiFallback: true,
    open: true,
    port: '3030',
    static: {
      directory: path.join(__dirname, 'public'),
    },
  },
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        exclude: /node_modules/,
        resolve: {
          extensions: ['.ts', '.tsx', '.json'],
        },
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, './dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public', 'index.html'),
    }),
  ],
  resolve: {
    plugins: [new TsconfigPathsPlugin({ baseUrl: './' })],
  },
  target: 'web',
}

export default config
