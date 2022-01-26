const fs = require("fs");
const { build } = require("esbuild");
const sveltePreprocess = require("svelte-preprocess");
const sveltePlugin = require("esbuild-svelte");
const sassPlugin = require("esbuild-sass-plugin").default;
const liveServer = require("live-server");

for (const dir of ["../dist", "../dist/web"]) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
}

const production = process.env.NODE_ENV === "production";

// esbuild watch in dev mode to rebuild out files
let watch = false;
if (process.argv[2] === "watch") {
    watch = {
        onRebuild(error) {
            if (error)
                console.error("esbuild: Watch build failed:", error.getMessage());
            else console.log("esbuild: Watch build succeeded");
        },
    };
    liveServer.start({
        port: 8082, // Set the server port. Defaults to 8082.
        root: "./public", // Set root directory that's being served. Defaults to cwd.
        open: false, // When false, it won't load your browser by default.
        wait: 1000, // Waits for all changes, before reloading. Defaults to 0 sec.
        logLevel: 2, // 0 = errors only, 1 = some, 2 = lots
    });
}

// Esbuild build options
// See: https://esbuild.github.io/api/#build-api
const options = {
    entryPoints: ["./src/editor.ts"],
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
