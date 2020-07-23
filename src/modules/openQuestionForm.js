"use strict";

const sendQuestionForm = () => {
  let popupConsultation = document.querySelector(".popup-consultation"),
    consultationBtn = document.querySelector(".consultation-btn"),
    close = document.querySelector(".popup-close"),
    count = 0,
    interval;

  const show = () => {
    interval = requestAnimationFrame(show);
    count++;

    if (count <= 25) {
      popupConsultation.style.opacity = count / 25;
    } else {
      count = 0;
      cancelAnimationFrame(interval);
    }
  };

  consultationBtn.addEventListener("click", (e) => {
    e.preventDefault();
    interval = requestAnimationFrame(show);
    popupConsultation.style.display = "block";
  });

  popupConsultation.addEventListener("click", (e) => {
    let target = event.target;

    if (target.classList.contains("popup-close")) {
      popupConsultation.style.display = "none";
      popupConsultation.style.opacity = 0;
    } else {
      target = target.closest(".popup-content");
      if (!target) {
        popupConsultation.style.display = "none";
        popupConsultation.style.opacity = 0;
      }
    }
  });
};

export default sendQuestionForm;
