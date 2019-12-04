// @ts-check

// @ts-ignore
process.env.NODE_ENV = 'development';
const path = require('path');
const merge = require('webpack-merge');
const appConfig = require('../../../config/webpack/webpack.app');
const outputPath = path.join(process.cwd(), 'build', 'dev');
const entry = path.join(process.cwd(), 'src', 'index.tsx');
const appSrc = path.join(process.cwd(), 'src');

module.exports = merge(appConfig, {
    output: {
        path: outputPath,
    },
    entry: {
        %projectname%: entry
    },
    module: {
        rules: [
            {
                test: /\.(js|mjs|jsx|ts|tsx)$/,
                include: appSrc,
                loader: require.resolve('babel-loader'),
                options: {
                    customize: require.resolve(
                        'babel-preset-react-app/webpack-overrides'
                    ),
                    // This is a feature of `babel-loader` for webpack (not Babel itself).
                    // It enables caching results in ./node_modules/.cache/babel-loader/
                    // directory for faster rebuilds.
                    cacheDirectory: true,
                    cacheCompression: false,
                    compact: false,
                },
            }
        ]
    },
    devtool: 'eval-source-map',
    mode: process.env.NODE_ENV,
    watch: false
});
