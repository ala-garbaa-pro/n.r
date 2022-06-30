#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
// const scriptName = path.basename(__filename);
const scriptName = "index.js";

const list_filename = "list.txt";

(async () => {
  const unnecessaryWords = [list_filename, scriptName];

  const filename_list = await fs
    .readFileSync("list.txt", "utf8")
    .toString()
    .split("\n");

  const list_names = await fs
    .readdirSync("./")
    .filter((el) => !unnecessaryWords.includes(el));

  (async () => {
    try {
      for (let index = 0; index < list_names.length; index++) {
        const new_name =
          (await filename_list[index]
            .trim()
            .replace("?", "")
            .replace("!", "")) + (await path.extname(list_names[index]));

        await fs.renameSync(`./${list_names[index]}`, `./${new_name}`);

        await console.log(
          `File Renamed from "${list_names[index]}" to ${new_name}`
        );
      }
    } catch (error) {
      console.log(error);
    }
  })();
})();
