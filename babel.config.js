module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      [
        "babel-preset-expo",
        {
          jsxImportSource: "nativewind",
          unstable_transformImportMeta: true,
          "react-compiler": {
            sources: (filename) => {
              const path = process.cwd();
              const folderPaths = ["src"];
              return folderPaths.some((folderPath) =>
                filename.includes(`${path}/${folderPath}`)
              );
            },
          },
        },
      ],
      "nativewind/babel",
    ],
    plugins: [["inline-import", { extensions: [".sql"] }]],
  };
};
