const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
require('dotenv').config({ path: './.env' }); 

module.exports = (env)=>  
{
return {
    entry: './src/index.tsx',
    mode: 'development',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                options: { presets: ["@babel/env"] }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.js$/,
                enforce: 'pre',
                use: ['source-map-loader'],
            },
            {
                test: /.(png|svg|jpe?g|gif|woff2?|ttf|eot)$/,
                use: ['file-loader']
            },
        ]
    },
    resolve: { extensions: ['*', '.js', '.jsx', '.ts', '.tsx'] },
    output: {
        filename: 'bundle.js'
    },
    devServer: {
        port: 3000,
        hot: true,
        historyApiFallback: true
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env.REACT_APP_PROTOCOL": JSON.stringify(process.env.REACT_APP_PROTOCOL),
            "process.env.REACT_APP_URL": JSON.stringify(process.env.REACT_APP_URL),
            "process.env.REACT_APP_PORT": JSON.stringify(process.env.REACT_APP_PORT),
            "process.env.REACT_APP_DATABASE": JSON.stringify(process.env.REACT_APP_DATABASE),
            "process.env.REACT_APP_USERNAME": JSON.stringify(process.env.REACT_APP_USERNAME),
            "process.env.REACT_APP_PASSWORD": JSON.stringify(process.env.REACT_APP_PASSWORD),
            "process.env.REACT_APP_DOMAIN": JSON.stringify(process.env.REACT_APP_DOMAIN),
            "process.env.REACT_APP_CLIENT_ID": JSON.stringify(process.env.REACT_APP_CLIENT_ID),
            "process.env": JSON.stringify(process.env)
          }),
        
        new webpack.HotModuleReplacementPlugin()]
}}