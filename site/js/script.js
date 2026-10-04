const tiles = [...document.querySelectorAll(".tile")];
const dialog = document.getElementById("dlg");
const largeImage = document.getElementById("big");
const caption = document.getElementById("cap");
const dialogCount = document.getElementById("dialog-count");
const closeButton = document.getElementById("close");
const previousButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
let activeTile = 0;

function showPhoto(index) {
  activeTile = (index + tiles.length) % tiles.length;
  const tile = tiles[activeTile];
  const image = tile.querySelector("img");
  const title = tile.querySelector("strong");
  largeImage.src = image.src;
  largeImage.alt = image.alt;
  caption.textContent = title.textContent;
  dialogCount.textContent = `${String(activeTile + 1).padStart(2, "0")} / ${String(tiles.length).padStart(2, "0")}`;
}

tiles.forEach((tile, index) => {
  tile.addEventListener("click", () => {
    showPhoto(index);
    dialog.showModal();
    closeButton.focus();
  });

  tile.addEventListener("pointermove", event => {
    const bounds = tile.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    tile.style.setProperty("--tilt-x", `${(x - 0.5) * 7}deg`);
    tile.style.setProperty("--tilt-y", `${(0.5 - y) * 7}deg`);
  });
  tile.addEventListener("pointerleave", () => {
    tile.style.setProperty("--tilt-x", "0deg");
    tile.style.setProperty("--tilt-y", "0deg");
  });
});

closeButton.addEventListener("click", () => dialog.close());
previousButton.addEventListener("click", () => showPhoto(activeTile - 1));
nextButton.addEventListener("click", () => showPhoto(activeTile + 1));
dialog.addEventListener("click", event => {
  if (event.target === dialog) dialog.close();
});
dialog.addEventListener("keydown", event => {
  if (event.key === "ArrowLeft") showPhoto(activeTile - 1);
  if (event.key === "ArrowRight") showPhoto(activeTile + 1);
  if (event.key === "Escape") dialog.close();
});

const diyaBox = document.getElementById("diyas");
const diyaMessage = document.getElementById("msg");
const diyaProgress = document.getElementById("diya-progress");
const diyaSvg = '<svg viewBox="0 0 64 64" aria-hidden="true"><path class="flame" d="M32 6c7 9 9 14 5 20-2 3-8 3-10 0-4-6-1-12 5-20z" fill="#efb75b"/><path d="M6 36h52c0 12-10 20-26 20S6 48 6 36z" fill="#c8561f"/><rect x="26" y="26" width="12" height="10" rx="3" fill="#7a2e12"/></svg>';

function updateDiyas() {
  const lit = diyaBox.querySelectorAll(".diya.on").length;
  diyaProgress.textContent = `${lit} of 5 diyas lit`;
  diyaMessage.textContent = lit === 5 ? "गणपती बाप्पा मोरया!" : "";
}

for (let index = 0; index < 5; index += 1) {
  const diya = document.createElement("button");
  diya.type = "button";
  diya.className = "diya";
  diya.setAttribute("aria-label", `Diya ${index + 1}`);
  diya.setAttribute("aria-pressed", "false");
  diya.innerHTML = diyaSvg;
  diya.addEventListener("click", () => {
    diya.classList.toggle("on");
    diya.setAttribute("aria-pressed", String(diya.classList.contains("on")));
    updateDiyas();
  });
  diyaBox.append(diya);
}
