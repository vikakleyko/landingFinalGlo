"use strict";

const calculator = () => {
  let panel = document.getElementById("accordion"),
    myonoffswitch = document.getElementById("myonoffswitch"),
    nextElem;

  panel.addEventListener("click", (e) => {
    let target = e.target;

    // button next click
    if (target.closest(".collapsed")) {
      target = target.closest(".collapsed");
      const id = target.getAttribute("href");
      nextElem = panel.querySelector(id);
      target.classList.remove("collapsed");
    }

    // header click
    if (target.closest(".panel-heading")) {
      const heading = target.closest(".panel-heading");
      const panelDefault = heading.closest(".panel-default");
      nextElem = panelDefault.querySelector(".panel-collapse");
    }

    const blocks = panel.querySelectorAll(".panel-collapse");

    blocks.forEach((block) => {
      block.classList.remove("in");
    });

    nextElem.classList.add("in");
    const button = nextElem.querySelector(".construct-btn");
    button.classList.add("collapsed");
  });
};

export default calculator;
