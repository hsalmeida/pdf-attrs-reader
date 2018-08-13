let fs = require('fs');
let PDFParser = require("pdf2json");
let path = require('path');

let diretorioArg = process.argv[2];

let diretorio = "E:/OneDrive/MPU ESTRATÉGIA_/" + diretorioArg + "/";

fs.readdir(diretorio, function (err, files) {
    files.forEach(file => {
        fs.stat(diretorio + file, (error, stat) => {
            if (stat.isFile()) {
                if (path.extname(file) === ".pdf") {
                    let pdfParser = new PDFParser();

                    pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError));

                    pdfParser.on("pdfParser_dataReady", pdfData => {
                        let texto = file + ";" + pdfData.formImage.Pages.length + "\n";
                        
                        fs.appendFile("./arquivo.csv", texto, function (err) {
                            if (err) throw err;
                            console.log('Saved!');
                        });
                    });

                    pdfParser.loadPDF(diretorio + file);
                }
            }
        });
    });
});

/*
let pdfParser = new PDFParser();

pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError));

pdfParser.on("pdfParser_dataReady", pdfData => {
    fs.writeFile("./arquivo.json", JSON.stringify(pdfData.formImage.Pages.length));
});

pdfParser.loadPDF("AG5005 - Cyberpunk 2020 - Night City Stories (1992) [Q4+] [KriTTeR].pdf");
*/