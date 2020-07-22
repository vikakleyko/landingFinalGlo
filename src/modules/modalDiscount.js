"use strict";

const modalDiscount = () => {
  let popupDiscount = document.querySelector(".popup-discount"),
    discountBtn = document.querySelectorAll(".discount-btn"),
    count = 0,
    interval;

  const show = () => {
    interval = requestAnimationFrame(show);
    count++;

    if (count <= 25) {
      popupDiscount.style.opacity = count / 25;
    } else {
      count = 0;
      cancelAnimationFrame(interval);
    }
  };

  discountBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      interval = requestAnimationFrame(show);
      popupDiscount.style.display = "block";
    });
  });

  popupDiscount.addEventListener("click", (event) => {
    let target = event.target;

    if (target.classList.contains("popup-close")) {
      popupDiscount.style.display = "none";
    } else {
      target = target.closest(".popup-content");
      if (!target) {
        popupDiscount.style.display = "none";
      }
    }
  });
};

export default modalDiscount;
