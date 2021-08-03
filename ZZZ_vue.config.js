const fs = require("fs");
const neatCsv = require("neat-csv");
const webpack = require("webpack");

//const team_work_csv = fs.readFile('./csv/team_work.csv');
console.log("vue.config! -fs");
let dataProcessed = { data: "nodata" };
fs.readFile("csv_data/team_work.csv", async (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  dataProcessed = await neatCsv(data);
  console.log("dataProcessed", dataProcessed);
});

module.exports = {
  lintOnSave: true,

  configureWebpack: (config) => {
    return {
      plugins: [
        new VueLoaderPlugin({
          DATA_PLUGIN: "migo vengo de fuera",
        }),
      ],
    };
  },
};
