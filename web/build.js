const fs = require("fs");
const esbuild = require("esbuild");
const esbuildSvelte = require("esbuild-svelte");
const sveltePreprocess = require("svelte-preprocess");

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
    external: ["svelte", "anki"],
      plugins: [
          esbuildSvelte({
              preprocess: sveltePreprocess({
                  scss: {
                      includePaths: [
                          "../../anki-main/sass",
                      ]
                  },
              }),
          }),
      ],
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
