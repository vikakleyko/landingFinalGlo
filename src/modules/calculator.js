"use strict";

const panel = document.getElementById("accordion"),
  myonoffswitch = document.getElementById("myonoffswitch"),
  formControl = document.querySelectorAll(".form-control"),
  selectBoxes = document.querySelectorAll(".select-box"),
  myonoffswitchTwo = document.getElementById("myonoffswitch-two"),
  distanceInput = document.getElementById("distance"),
  resultInput = document.getElementById("calc-result");

let d1,
  amount1,
  d2 = 0,
  amount2 = 0,
  type = 1,
  bottom = true,
  distance;

const calculator = () => {
  let nextElem = document.querySelector(".in");

  selectBoxes[2].style.display = "none";
  selectBoxes[3].style.display = "none";

  resultInput.value = 11000;

  panel.addEventListener("click", (e) => {
    // event.preventDefault();
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

    if (nextElem) {
      nextElem.classList.add("in");
      const button = nextElem.querySelector(".construct-btn");
      button.classList.add("collapsed");
    }
  });
};

panel.addEventListener("change", (e) => {
  let target = e.target;

  const countSum = () => {
    let result = 0;

    if (myonoffswitch.checked) {
      // one camera
      selectBoxes[2].style.display = "none";
      selectBoxes[3].style.display = "none";
      result = 10000;
      type = 1;
      d2 = 0;
      amount2 = 0;
    } else {
      // two cameras
      selectBoxes[2].style.display = "inline-block";
      selectBoxes[3].style.display = "inline-block";
      type = 2;
      d2 = parseFloat(
        formControl[2].options[formControl[2].selectedIndex].value
      );
      amount2 = parseFloat(
        formControl[3].options[formControl[3].selectedIndex].value
      );
      result = 15000;
    }

    bottom = myonoffswitchTwo.checked;

    if (bottom) {
      result += type === 1 ? 1000 : 2000;
    }

    d1 = parseFloat(formControl[0].options[formControl[0].selectedIndex].value);
    amount1 = parseFloat(
      formControl[1].options[formControl[1].selectedIndex].value
    );

    distance = +distanceInput.value;

    if (d1 === 2) {
      result *= 1.2;
    }
    if (d2 === 2) {
      result *= 1.2;
    }
    if (amount1 === 2) {
      result *= 1.3;
    }
    if (amount2 === 2) {
      result *= 1.3;
    }
    if (amount1 === 3) {
      result *= 1.5;
    }
    if (amount2 === 3) {
      result *= 1.5;
    }

    resultInput.value = result;
  };

  if (target.matches("input") || target.matches("select")) {
    countSum();
  }
});

export default calculator;
