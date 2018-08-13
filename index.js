let fs = require('fs');
let PDFParser = require("pdf2json");
let path = require('path');
let pdfPageCount = require("pdf_page_count");

let diretorioArg = process.argv[2];

let diretorio = "E:/OneDrive/MPU ESTRATÉGIA_/" + diretorioArg + "/";

fs.readdir(diretorio, function (err, files) {
    files.forEach(file => {
        fs.stat(diretorio + file, (error, stat) => {
            if (stat.isFile()) {
                if (path.extname(file) === ".pdf") {

                    pdfPageCount.count(diretorio + file, function (resp) {
                        if (!resp.success) {
                            console.log("Something went wrong: " + resp.error);
                            return;
                        }

                        if (resp.data == 1) {
                            console.log("Yayy, test with one page and giving raw data works!")
                        } else {
                            let texto = file + ";" + resp.data + "\n";

                            fs.appendFile("./arquivo.csv", texto, function (err) {
                                if (err) throw err;
                                console.log('leu ' + file);

                            });
                            //console.log("Oh no..tool says the PDF has " + resp.data + " pages, but it should say it has one page!")
                        };
                    });
                    /*
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
                    */

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