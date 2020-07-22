"use strict";

const modalCall = () => {
  let popupCall = document.querySelector(".popup-call"),
    callBtn = document.querySelectorAll(".call-btn"),
    close = document.querySelector(".popup-close"),
    count = 0,
    interval;

  const show = () => {
    interval = requestAnimationFrame(show);
    count++;

    if (count <= 25) {
      popupCall.style.opacity = count / 25;
    } else {
      count = 0;
      cancelAnimationFrame(interval);
    }
  };

  callBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      interval = requestAnimationFrame(show);
      popupCall.style.display = "block";
    });
  });

  popupCall.addEventListener("click", (e) => {
    let target = event.target;

    if (target.classList.contains("popup-close")) {
      popupCall.style.display = "none";
      popupCall.style.opacity = 0;
    } else {
      target = target.closest(".popup-content");
      if (!target) {
        popupCall.style.display = "none";
        popupCall.style.opacity = 0;
      }
    }
  });
};

export default modalCall;
