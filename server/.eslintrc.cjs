module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: false
    },
    env: {
        node: true,
        es2022: true
    },
    plugins: ["@typescript-eslint", "import"],
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:import/recommended",
        "plugin:import/typescript",
        "prettier"
    ],
    rules: {
        "import/order": [
            "warn",
            {
                "groups": ["builtin", "external", "internal", ["parent", "sibling", "index"]],
                "newlines-between": "always",
                "alphabetize": { "order": "asc", "caseInsensitive": true }
            }
        ],
        "@typescript-eslint/consistent-type-imports": "warn",
        "@typescript-eslint/no-misused-promises": ["error", { "checksVoidReturn": false }]
    }
};