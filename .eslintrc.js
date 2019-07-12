module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "react-native/react-native": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "react-native",
        "babel"
    ],
    "parser": "babel-eslint",
    "rules": {
    }
};