const box = document.querySelector("#box");
const boxContainer = document.querySelector(".box-container");
const boxBackground = document.querySelector("#box-background");
const boxContainerBackground = document.querySelector(
  "#box-container-background"
);

const generatedCss = document.querySelector("#generated-css");

const settings = document.querySelectorAll(".settings input");

const hOffset = document.querySelector("#h-offset");
const vOffset = document.querySelector("#v-offset");
const blurRadius = document.querySelector("#blur-radius");
const spreadRadius = document.querySelector("#spread-radius");
const color = document.querySelector("#color");
const opacity = document.querySelector("#opacity");
const inset = document.querySelector("#inset");

const generatedBtn = document.querySelector("#generated-css-copy-btn");

generatedBtn.addEventListener("click", generatedBtnClick);

function generatedBtnClick() {
  generatedBtn.disabled = true;
  navigator.clipboard.writeText(generatedCss.textContent).then(
    function () {
      generatedBtn.textContent = "Copied!";
      generatedBtn.classList.add("success");
      setTimeout(() => {
        generatedBtn.textContent = "Copy";
        generatedBtn.classList.remove("success");
        generatedBtn.disabled = false;
      }, 1000);
    },
    function () {
      generatedBtn.textContent = "Error!";
      generatedBtn.classList.add("error");
      setTimeout(() => {
        generatedBtn.textContent = "Copy";
        generatedBtn.classList.remove("error");
        generatedBtn.disabled = false;
      }, 1000);
    }
  );
}

boxBackground.addEventListener("input", (event) => {
  box.style.backgroundColor = event.currentTarget.value;
});
boxContainerBackground.addEventListener("input", (event) => {
  boxContainer.style.backgroundColor = event.currentTarget.value;
});

settings.forEach((setting) => {
  setting.addEventListener("input", updateBoxShadow);
});

function updateBoxShadow() {
  const boxShadow = `${hOffset.value}px ${vOffset.value}px ${
    blurRadius.value
  }px ${spreadRadius.value}px rgba(${hexToRGB(color.value).join(", ")}, ${
    opacity.value
  })${inset.checked ? " inset" : ""}`;
  box.style.boxShadow = boxShadow;
  generatedCss.textContent = `box-shadow: ${boxShadow};`;
}

function hexToRGB(h) {
  let r = 0;
  let g = 0;
  let b = 0;

  // 3 digits
  if (h.length == 4) {
    r = "0x" + h[1] + h[1];
    g = "0x" + h[2] + h[2];
    b = "0x" + h[3] + h[3];

    // 6 digits
  } else if (h.length == 7) {
    r = "0x" + h[1] + h[2];
    g = "0x" + h[3] + h[4];
    b = "0x" + h[5] + h[6];
  }
  return [+r, +g, +b];
  // return `rgb(${+r}, ${+g}, ${+b})`;
}
