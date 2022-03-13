import { Configuration } from 'webpack'
import * as path from 'path'

const config: Configuration = {
  mode: 'production',
  entry: './src/background_scripts/index.ts',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'background_script.js',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            configFile: 'tsconfig.background_scripts.json',
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
}

export default config
