// import * as XLSX from 'xlsx';

const { defineConfig } = require("cypress");
//https://hackernoon.com/how-to-test-excel-data-with-cypress >> for using Excel
module.exports = defineConfig({
	reporter: "mocha-junit-reporter",
	reporterOptions: {
		mochaFile: "cypress/results/junit/results-[hash].xml",
		toConsole: true,
		// reportDir: "cypress/reports/mochawesome",
		// overwrite: false,
		// html: false,
		// json: true,
	},
	e2e: {
		setupNodeEvents(on, config) {
			// implement node event listeners here
			//   on("task",{
			//   convertXlsxToJson(filePath){
			//     const wookbook = XLSX.readFile(filePath)
			//     const workSheet = wookbook.Sheets[wookbook.SheetNames[0]]
			//     const jsonData = XLSX.utils.sheet_to_json(workSheet)
			//     return jsonData
			//   }
			// })
		},
	},
});
