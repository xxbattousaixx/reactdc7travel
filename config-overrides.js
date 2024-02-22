const webpack = require('webpack');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = function override(config, env) {
    config.ignoreWarnings = [/Failed to parse source map/];
    config.resolve.fallback = {
        
        http: require.resolve('stream-http'),

        https: require.resolve('https-browserify'),


    };
    config.module.rules.push({
        test: /\.m?js/,
        resolve: {
            fullySpecified: false
        }
    }),
    config.plugins.push(
           
            new MiniCssExtractPlugin({
              filename: 'bundle.css'
            }),
            new webpack.ProvidePlugin({
                process: 'process/browser',
                Buffer: ['buffer', 'Buffer'],
            }),
            

    );
    config.resolve.plugins = config.resolve.plugins.filter(plugin => !(plugin instanceof ModuleScopePlugin));


    return config;
}