document.querySelectorAll(".bro-box").forEach(box => {
  const header = box.querySelector(".bro-header");

  const buttonsData = [
    {
      class: "select-all",
      text: "",
      svg: `<svg class='line' viewBox='0 0 24 24'><path d='M11 19.5H21'></path><path d='M11 12.5H21'></path><path d='M11 5.5H21'></path><path d='M3 5.5L4 6.5L7 3.5'></path><path d='M3 12.5L4 13.5L7 10.5'></path><path d='M3 19.5L4 20.5L7 17.5'></path></svg>`
    },
    {
      class: "copy",
      text: "",
      svg: `<svg class='line' viewBox='0 0 24 24'><path d='M16 12.9V17.1C16 20.6 14.6 22 11.1 22H6.9C3.4 22 2 20.6 2 17.1V12.9C2 9.4 3.4 8 6.9 8H11.1C14.6 8 16 9.4 16 12.9Z'></path><path d='M22 6.9V11.1C22 14.6 20.6 16 17.1 16H16V12.9C16 9.4 14.6 8 11.1 8H8V6.9C8 3.4 9.4 2 12.9 2H17.1C20.6 2 22 3.4 22 6.9Z'></path></svg>`
    },
    {
      class: "download",
      text: "",
      svg: `<svg class='line' viewBox='0 0 24 24'><path d='M18.0699 14.4299L11.9999 20.4999L5.92993 14.4299' stroke-miterlimit='10'></path><path d='M12 3.5V20.33' stroke-miterlimit='10'></path></svg>`
    },
    {
      class: "zoom-in",
      text: "",
      svg: `<svg class='line' viewBox='0 0 24 24'><path d='M9.19995 11.7H14.2'></path><path d='M11.7 14.2V9.19995'></path><path d='M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z'></path><path d='M22 22L20 20'></path></svg>`
    },
    {
      class: "zoom-out",
      text: "",
      svg: `<svg class='line' viewBox='0 0 24 24'><path d='M9 11.7H14'></path><path d='M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z'></path><path d='M22 22L20 20'></path></svg>`
    },
    {
      class: "toggle-hl",
      text: "",
      svg: `<svg class='line' viewBox='0 0 24 24'><path d='M14 16C14 17.77 13.23 19.37 12 20.46C10.94 21.42 9.54 22 8 22C4.69 22 2 19.31 2 16C2 13.24 3.88 10.9 6.42 10.21C7.11 11.95 8.59 13.29 10.42 13.79C10.92 13.93 11.45 14 12 14C12.55 14 13.08 13.93 13.58 13.79C13.85 14.47 14 15.22 14 16Z'></path><path d='M18 8C18 8.78 17.85 9.53 17.58 10.21C16.89 11.95 15.41 13.29 13.58 13.79C13.08 13.93 12.55 14 12 14C11.45 14 10.92 13.93 10.42 13.79C8.59 13.29 7.11 11.95 6.42 10.21C6.15 9.53 6 8.78 6 8C6 4.69 8.69 2 12 2C15.31 2 18 4.69 18 8Z'></path><path d='M22 16C22 19.31 19.31 22 16 22C14.46 22 13.06 21.42 12 20.46C13.23 19.37 14 17.77 14 16C14 15.22 13.85 14.47 13.58 13.79C15.41 13.29 16.89 11.95 17.58 10.21C20.12 10.9 22 13.24 22 16Z'></path></svg>`
 
    },
    {
      class: "view",
      text: "",
      svg: `<svg class='line' viewBox='0 0 24 24'><path d='M21 9V3H15'></path><path d='M3 15V21H9'></path><path d='M21 3L13.5 10.5'></path><path d='M10.5 13.5L3 21'></path></svg>`
 
    }
  ];

// Clear header and create buttons
  header.innerHTML = "";
  buttonsData.forEach(({ class: cls, text, svg }) => {
const btn = document.createElement("button");
    btn.className = `bro-btn ${cls}`;
    btn.innerHTML = svg + text;
    header.appendChild(btn);
});

const codeElem = box.querySelector("code");
let raw = codeElem.innerText.replace(/^\n/, "");
  let isHL = true;

const pre = box.querySelector(".bro-pre");
const ln = document.createElement("div");
  ln.className = "bro-lines";
  box.insertBefore(ln, pre);
  
const foldBtn = document.createElement("button");
  foldBtn.className = "fold-toggle";
  foldBtn.innerText = "-";
  box.insertBefore(foldBtn, pre);

function applyHighlight() {
    pre.innerHTML = isHL ? broHighlight(raw) : raw;
}
  applyHighlight();

const lines = raw.split("\n").length;
  ln.innerHTML = Array.from({ length: lines }, (_, i) => i + 1).join("<br>");

const copyBtn = box.querySelector(".copy");
const copySVG = buttonsData.find(b => b.class === "copy").svg;
  copyBtn.onclick = () => {
  navigator.clipboard.writeText(raw);
  copyBtn.innerHTML = `<svg class='line' viewBox='0 0 24 24'><path d='M22 11.1V6.9C22 3.4 20.6 2 17.1 2H12.9C9.4 2 8 3.4 8 6.9V8H11.1C14.6 8 16 9.4 16 12.9V16H17.1C20.6 16 22 14.6 22 11.1Z'></path><path d='M16 17.1V12.9C16 9.4 14.6 8 11.1 8H6.9C3.4 8 2 9.4 2 12.9V17.1C2 20.6 3.4 22 6.9 22H11.1C14.6 22 16 20.6 16 17.1Z'></path><path d='M6.08008 15L8.03008 16.95L11.9201 13.05'></path></svg>` + `<span style="margin-top:20px;">Copied!</span>`;
  setTimeout(() => (copyBtn.innerHTML = copySVG), 1200);
};

const selectAllBtn = box.querySelector(".select-all");
  selectAllBtn.onclick = () => {
const range = document.createRange();
    range.selectNodeContents(pre);
const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
};

foldBtn.onclick = () => {
    if (pre.style.display === "none") {
      pre.style.display = "block";
      ln.style.display = "block";
      foldBtn.innerText = "-";
    } else {
      pre.style.display = "none";
      ln.style.display = "none";
      foldBtn.innerText = "+";
    }
};

const downloadBtn = box.querySelector(".download");
  downloadBtn.onclick = () => {
const blob = new Blob([raw], { type: "text/plain" });
const url = URL.createObjectURL(blob);
const a = document.createElement("a");
    a.href = url;
    a.download = "code.txt";
    a.click();
    URL.revokeObjectURL(url);
};
  
const zoomInBtn = box.querySelector(".zoom-in");
const zoomOutBtn = box.querySelector(".zoom-out");
  let zoom = 14;
  zoomInBtn.onclick = () => {
    zoom += 1;
    pre.style.fontSize = zoom + "px";
};
  zoomOutBtn.onclick = () => {
    zoom = Math.max(8, zoom - 1);
    pre.style.fontSize = zoom + "px";
}; 

const toggleHlBtn = box.querySelector(".toggle-hl");
  toggleHlBtn.onclick = (e) => {
    isHL = !isHL;
    e.target.innerHTML = isHL ? buttonsData.find(b => b.class === "toggle-hl").svg : `<svg class='line' viewBox='0 0 24 24'><path d='M22 12C22 17.52 17.52 22 12 22C6.48 22 3.11 16.44 3.11 16.44M3.11 16.44H7.63M3.11 16.44V21.44M2 12C2 6.48 6.44 2 12 2C18.67 2 22 7.56 22 7.56M22 7.56V2.56M22 7.56H17.56'></path</svg>`;
    applyHighlight();
};
  
const viewBtn = box.querySelector(".view");
  viewBtn.onclick = () => {
    let modal = document.createElement("div");
    modal.className = "bro-view-modal";
    modal.innerHTML = `
      <div class="bro-view-content">
        <button class="bro-view-close">✖</button>
        <pre>${raw.replace(/[<>&]/g, m => ({
          '<': '&lt;',
          '>': '&gt;',
          '&': '&amp;'
        }[m]))}</pre>
      </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector(".bro-view-close").onclick = () => modal.remove();
  };
});                                             
