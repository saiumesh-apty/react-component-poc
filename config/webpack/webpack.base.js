// @ts-check
const baseConfig = {
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        rules: [{
            test: /\.svg$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: 'babel-loader'
                }, {
                    loader: "react-svg-loader",
                    options: {
                        svgo: {
                            plugins: [{
                                removeTitle: true
                            }]
                        }
                    }
                }],
        },
        {
            test: /\.css$/,
            use: [
                { loader: "style-loader" },
                { loader: "css-loader" },
            ]
        },
        {
            test: /\.scss$/,
            use: [
                { loader: "style-loader" },
                { loader: "css-loader" },
                { loader: "sass-loader" },
            ]
        }
        ]
    }
};

module.exports = {
    baseConfig
};