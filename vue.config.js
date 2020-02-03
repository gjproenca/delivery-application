const path = require('path');
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {

    transpileDependencies: [
        "vuetify"
    ],

    configureWebpack: {
        plugins: [
            new VuetifyLoaderPlugin(),
            new CopyWebpackPlugin([{
                from: 'src/images/',
                to: 'images/',
                ignore: ['.DS_Store']
            }]),
        ],
    },

    chainWebpack: config => {
        config.resolve
            .alias
            .set('vue$','vue/dist/vue.js')
            .set('vue', path.resolve('./node_modules/vue'))
            .set('@', path.resolve(__dirname, 'src'))
            .end()
            .extensions
            .merge(['.ts', '.js', '.html']);

        config.module
            .rule('html')
            .test(/\.html$/)
            .use('raw-loader')
            .loader('raw-loader')
            .end();
    },
}

