module.exports = {
    'rules': {
        'no-console': 0,
        'indent': [
            2,
            'tab'
        ],
        'quotes': [
            2,
            'single'
        ],
        'linebreak-style': [
            2,
            'unix'
        ],
        'semi': [
            2,
            'always'
        ]
    },
    "env": {
        "node": true
    },
    'extends': ['eslint:recommended', 'plugin:vue/recommended'],
    'parserOptions': {
        "parser": "babel-eslint",
        "sourceType": "module"
    }
};