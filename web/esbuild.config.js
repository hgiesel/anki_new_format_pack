const fs = require("fs");
const { build } = require("esbuild");
const sveltePreprocess = require("svelte-preprocess");
const sveltePlugin = require("esbuild-svelte");
const sassPlugin = require("esbuild-sass-plugin").default;

for (const dir of ["../dist", "../dist/web"]) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
}

const production = process.env.NODE_ENV === "production";
const development = process.env.NODE_ENV === "development";

const watch = development
    ? {
        onRebuild(error) {
            if (error) {
                console.error("esbuild: Watch build failed:", error.getMessage());
            } else {
                console.log("esbuild: Watch build succeeded");
            }
        }
    }
    : false;

/**
 * This should point to all entry points for scripts.
 * Each one will create one js and one css file in `../src/dist/web'
 */
const entryPoints = [
    "src/editor.ts",
];

/**
 * Esbuild build options
 * See https://esbuild.github.io/api/#build-api for more
 */
const options = {
    entryPoints,
    outdir: "../dist/web",
    format: "iife",
    target: "es6",
    bundle: true,
    minify: production,
    treeShaking: production,
    sourcemap: !production,
    pure: production ? ["console.log", "console.time", "console.timeEnd"] : [],
    watch,
    external: ["svelte", "anki"],
    plugins: [
        sveltePlugin({
            preprocess: sveltePreprocess({
                scss: {
                    includePaths: ["anki/sass"],
                },
            }),
        }),
        sassPlugin(),
    ],
    loader: {
        ".png": "dataurl",
        ".svg": "text",
    },
};

build(options).catch((err) => {
    console.error(err);
    process.exit(1);
});
