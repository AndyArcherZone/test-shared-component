module.exports = {
  presets: [
      [
          '@babel/preset-env',
          {
              modules: false,
              useBuiltIns: 'usage',
              corejs: 3,
          },
      ],
      '@babel/preset-react',
  ],
  env: {
      test: {
          presets: [
              [
                  '@babel/env',
                  {
                      modules: 'commonjs',
                      useBuiltIns: 'usage',
                      corejs: 3,
                      targets: {
                          node: 'current',
                      },
                  },
              ],
              '@babel/preset-react',
              'jest',
          ],
      },
  },
}
