module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: ['plugin:vue/essential', 'airbnb-base'],
  plugins: [
    'vue'
  ],
  // 检查导入
  settings: {
    'import/resolver': {
      webpack: {
        config: 'build/webpack.base.conf.js'
      }
    }
  },
  // eslint规则
  rules: {
    // 在使用vue文件引入时,可以不使用vue后缀
    'import/extensions': ['error', 'always', {
      js: 'never',
      vue: 'never'
    }],
    // 允许赋值给参数
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: [
        'state', // for vuex state
        'acc', // for reduce accumulators
        'e' // for e.returnvalue
      ]
    }],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      optionalDependencies: ['test/unit/index.js']
    }],
    // 禁用debugger
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
