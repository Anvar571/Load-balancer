const path = require("path");

module.exports = {
    entry: "./src/server.ts",
    target: "node",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: "/node_modules/"
            },
        ]
    },
    resolve: {
        extensions: [".ts", ".js"] 
    }
}