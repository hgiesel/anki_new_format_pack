const fs = require("fs");
const esbuild = require("esbuild");
const sveltePlugin = require("esbuild-svelte");

if (!fs.existsSync("../dist")) {
  fs.mkdirSync("../dist");
}

if (!fs.existsSync("../dist/web")) {
  fs.mkdirSync("../dist/web");
}

const svelteGlobalPattern = /^const (.*?) = (.*?);$/gmsu;
const globalIdentifier = 'globalThis.svelteCrossUnit';

function compileAsServer(input) {
    const code = input.replaceAll(
        svelteGlobalPattern,
        (_match, identifier, value) => `const ${identifier} = ${globalIdentifier}.${identifier} = ${value}`,
    )

    return `${globalIdentifier} = {};\n${code}`;
}

function compileAsClient(input) {
    return input.replaceAll(
        svelteGlobalPattern,
        (_match, identifier) => `const ${identifier} = ${globalIdentifier}.${identifier}`,
    );
}

function esbuildPlugin({ server = false } = {}) {
    return {
        name: "svelte-cross-unit",
        setup: (build) => {
            build.onLoad({ filter: /.*/ }, async (args) => {
                if (!args.path.endsWith("index.mjs")) {
                    return;
                }

                const source = await fs.promises.readFile(args.path, "utf8");
                const contents = server ? compileAsServer(source) : compileAsClient(source);

                return { contents };
            });
        },
    };
}

esbuild
  .build({
    entryPoints: ["./editor.js"],
    outdir: "../dist/web",
    format: "iife",
    minify: false /* do not set this to true */,
    bundle: true,
    splitting: false,
    plugins: [sveltePlugin(), esbuildPlugin()],
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
