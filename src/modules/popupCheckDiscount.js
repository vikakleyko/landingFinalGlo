"use strict";

const popupCheckDiscount = () => {
  let popupCheck = document.querySelector(".popup-check"),
    checkBtn = document.querySelector(".check-btn"),
    close = document.querySelector(".popup-close"),
    count = 0,
    interval;

  const show = () => {
    interval = requestAnimationFrame(show);
    count++;

    if (count <= 25) {
      popupCheck.style.opacity = count / 25;
    } else {
      count = 0;
      cancelAnimationFrame(interval);
    }
  };

  checkBtn.addEventListener("click", () => {
    interval = requestAnimationFrame(show);
    popupCheck.style.display = "block";
  });

  popupCheck.addEventListener("click", (e) => {
    let target = event.target;

    if (target.classList.contains("popup-close")) {
      popupCheck.style.display = "none";
      popupCheck.style.opacity = 0;
    } else {
      target = target.closest(".popup-content");
      if (!target) {
        popupCheck.style.display = "none";
        popupCheck.style.opacity = 0;
      }
    }
  });
};

export default popupCheckDiscount;
