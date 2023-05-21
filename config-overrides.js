const webpack = require('webpack');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
module.exports = function override(config, env) {
    config.ignoreWarnings = [/Failed to parse source map/];
    config.module.rules.push({
        test: /\.m?js/,
        resolve: {
            fullySpecified: false
        }
    })
    config.resolve.fallback = {
        http: require.resolve('stream-http'),
        
        https: require.resolve('https-browserify'),
        
        
    };
    config.plugins.push(
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer'],
        }),
    );
    config.resolve.plugins = config.resolve.plugins.filter(plugin => !(plugin instanceof ModuleScopePlugin));
    
    
    return config;
}