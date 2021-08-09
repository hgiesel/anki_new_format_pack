const fs = require("fs");
const esbuild = require("esbuild");
const sveltePlugin = require("esbuild-svelte");
const crossUnit = require("svelte-cross-unit");

if (!fs.existsSync("../dist")) {
  fs.mkdirSync("../dist");
}

if (!fs.existsSync("../dist/web")) {
  fs.mkdirSync("../dist/web");
}

esbuild
  .build({
    entryPoints: ["./editor.js"],
    outdir: "../dist/web",
    format: "iife",
    minify: false /* do not set this to true */,
    bundle: true,
    splitting: false,
    plugins: [
        sveltePlugin(),
        crossUnit.esbuildPlugin()
    ],
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
