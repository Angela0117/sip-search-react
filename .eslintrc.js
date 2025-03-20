module.exports = {
    parser: '@babel/eslint-parser', // 使用 Babel parser 來解析 JSX 語法
    parserOptions: {
      ecmaVersion: 12, // 讓 ESLint 支援最新的 ECMAScript 語法
      sourceType: 'module', // 允許使用 ES6 模組
      ecmaFeatures: {
        jsx: true, // 開啟 JSX 語法支持
      },
    },
    extends: [
      'airbnb', // 使用 Airbnb 規範
      'plugin:react/recommended', // 使用 React 插件的建議設置
      'plugin:react-hooks/recommended', // 開啟 React Hooks 規範
    ],
    plugins: ['react', 'react-hooks'], // 添加 React 和 React Hooks 插件
    rules: {
      // 這裡可以添加或修改 ESLint 規則
      'react/react-in-jsx-scope': 'off', // 在 React 17+ 中不需要在文件中 import React
      'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }], // 允許使用 .js 和 .jsx 擴展名的 JSX
    },
    settings: {
      react: {
        version: 'detect', // 自動檢測 React 版本
      },
    },
  };
  