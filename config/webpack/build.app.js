// @ts-check

// @ts-ignore
process.env.NODE_ENV = 'development';
const path = require('path');
const merge = require('webpack-merge');
const appConfig = require('./webpack.app');
const outputPath = path.join(process.cwd(), 'build', 'dev');

/**
 * paths go here, we can improve upon
 */

const login_module = path.join(process.cwd(), 'login_check', 'src', 'index.tsx');
const login_check = path.join(process.cwd(), 'login_module', 'src', 'index.tsx');

const loginSrc = path.join(process.cwd(), 'login_check', 'src');
const loginCheckSrc = path.join(process.cwd(), 'login_module', 'src');

module.exports = merge(appConfig, {
    output: {
        path: outputPath,
    },
    entry: {
        login_module: login_module,
        login_check: login_check
    },
    module: {
        rules: [
            {
                test: /\.(js|mjs|jsx|ts|tsx)$/,
                include: [ loginSrc, loginCheckSrc ],
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
