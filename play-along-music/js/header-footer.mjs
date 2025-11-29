
export function setHeaderFooter() {
    setHeader();
    setFooter();
}

function setHeader() {
    document.getElementsByTagName('header')[0].innerHTML = `
        <a href="../html/library.html">Library</a>
    `;
}

function setFooter() {
    document.getElementsByTagName('footer')[0].innerHTML = `
    
    `;
}
