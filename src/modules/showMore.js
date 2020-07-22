"use strict";

const showMore = () => {
  const btn = document.querySelector(".add-sentence-btn"),
    additionalBlocks = document.querySelectorAll(".shadow-block ");

  btn.addEventListener("click", () => {
    btn.style.display = "none";

    additionalBlocks.forEach((block) => {
      block.style.visibility = "visible";
      block.closest(".col-xs-12").classList.remove("hidden");
      block.closest(".col-xs-12").classList.remove("visible-sm-block");
    });
  });
};

export default showMore;
