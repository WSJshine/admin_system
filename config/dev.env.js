'use strict'
const merge = require('webpack-merge');//渣渣，你看過這個配置啊嗎mei4y
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
})
