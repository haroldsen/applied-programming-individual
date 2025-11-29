
const puppeteer = require('puppeteer');

async function convertStringHtmlToPdf(htmlContent, outputPdfPath) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // Load the raw HTML string into the page
    await page.setContent(htmlContent, {
        waitUntil: 'domcontentloaded' 
    });

    await page.pdf({
        path: outputPdfPath,
        format: 'A4',
        printBackground: true,
    });

    await browser.close();
    console.log(`PDF successfully created at ${outputPdfPath}`);
}

function downloadReportPDF() {


    
}
