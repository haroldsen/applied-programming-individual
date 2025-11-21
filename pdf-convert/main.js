
const downloadButton = document.getElementById('download-pdf');

function downloadPDF() {
    const pdf = document.getElementById('pdf');
    html2pdf().from(pdf).save('document.pdf');
}

downloadButton.addEventListener('click', downloadPDF);
