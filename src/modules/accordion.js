"use strict";

const accordion = () => {
  const panel = document.getElementById("accordion-two");
  console.log(panel);

  panel.addEventListener("click", (e) => {
    let target = e.target;

    const blocks = panel.querySelectorAll(".panel-collapse");

    const question = target.closest(".panel-default");
    const answer = question.querySelector(".panel-collapse");
    blocks.forEach((block) => {
      block.classList.remove("in");
    });
    answer.classList.add("in");
  });
};

export default accordion;
