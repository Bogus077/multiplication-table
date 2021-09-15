module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': [
    'plugin:react/recommended',
    'plugin:react-redux/recommended'
  ],
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    },
    'ecmaVersion': 12,
    'sourceType': 'module',
  },
  'plugins': [
    'react',
    'react-redux',
  ],
  'rules': {
    "no-console": "warn",
    "no-unused-expressions": [
      "error",
      {
        "allowTaggedTemplates": true
      }
    ],
    "no-unused-vars": [
      "warn", 
      { 
        "vars": "all", 
        "args": "after-used", 
        "ignoreRestSiblings": false 
      }
    ],
    "no-underscore-dangle": [
      "error",
      {
        "allow": ["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"]
      }
    ]
  },
};
