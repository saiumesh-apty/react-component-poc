// @ts-check

const path = require('path');
const merge = require('webpack-merge');
const { baseConfig } = require('./webpack.base');
const outputPath = path.join(process.cwd(), 'build', 'dev');

module.exports = merge(baseConfig, {
    output: {
        path: outputPath,
    },
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
        'react-router': 'ReactRouter'
    }
});
