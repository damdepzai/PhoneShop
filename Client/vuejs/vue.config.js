

const path = require('path');
const webpack = require('webpack');
const isProd = process.env.NODE_ENV === 'production';
const WebpackNotifierPlugin = require('webpack-notifier');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

module.exports = {
    lintOnSave: false,
    devServer: {
        disableHostCheck: true,
        host: 'localhost',
        port: 2410,
        quiet: false,
        watchOptions: {
            poll: true
        },
        proxy: 'http://127.0.0.1:8000/',
    },
    chainWebpack: config => {
        if (!isProd) {
            config.plugin('webpack-notifier')
                .use(WebpackNotifierPlugin);

            config.plugin('friendly-errors-webpack-plugin')
                .use(FriendlyErrorsWebpackPlugin)
        }

        config
            .plugin('provide-plugin')
            .use(new webpack.ProvidePlugin({
                '_': [path.resolve(__dirname, 'src/helpers/index.js'), 'default']
            }));

        /*config.resolve
          .symlinks(true)*/

        config.module
            .rule("i18n")
            .resourceQuery(/blockType=i18n/)
            .type('javascript/auto')
            .use("i18n")
            .loader("@kazupon/vue-i18n-loader")
            .end();

        config.module
            .rule('scss')
            .oneOf('vue')
            .use('resolve-url-loader')
            .loader('resolve-url-loader')
            .options({
                keepQuery: true
            })
            .before('sass-loader');

        config.module
            .rule('scss')
            .oneOf('vue')
            .use('style-loader', 'css-loader', 'sass-loader')
            .loader('sass-loader')
            .tap(options => ({
                ...options,
                sourceMap: true,
                sourceMapContents: false
            }));


        const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
        types.forEach(type => addStyleResource(config.module.rule('scss').oneOf(type)))
    }
};

function addStyleResource(rule) {
    rule.use('style-resource')
        .loader('style-resources-loader')
        .options({
            patterns: [
                path.resolve(__dirname, './src/resources/assets/scss/_variables.scss'),
            ],
        })
}
