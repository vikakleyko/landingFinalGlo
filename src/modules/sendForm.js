"use strict";


const maskPhone = (selector, masked = '+7 (___) ___-__-__') => {
	const elems = document.querySelectorAll(selector);

	function mask(event) {
		const keyCode = event.keyCode;
		const template = masked,
			def = template.replace(/\D/g, ""),
			val = event.target.value.replace(/\D/g, "");
		let i = 0,
			newValue = template.replace(/[_\d]/g, function (a) {
				return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
			});
		i = newValue.indexOf("_");
		if (i !== -1) {
			newValue = newValue.slice(0, i);
		}
		let reg = template.substr(0, event.target.value.length).replace(/_+/g,
			function (a) {
				return "\\d{1," + a.length + "}";
			}).replace(/[+()]/g, "\\$&");
		reg = new RegExp("^" + reg + "$");
		if (!reg.test(event.target.value) || event.target.value.length < 5 || keyCode > 47 && keyCode < 58) {
			event.target.value = newValue;
		}
		if (event.type === "blur" && event.target.value.length < 5) {
			event.target.value = "";
		}

	}

	for (const elem of elems) {
		elem.addEventListener("input", mask);
		elem.addEventListener("focus", mask);
		elem.addEventListener("blur", mask);
	}
};

// use

maskPhone('.phone-user', '+7 (___) ___-__-__');

const sendForm = () => {
  const forms = document.querySelectorAll("form"),
    question = document.querySelector(".user_quest"),
    errorMessage = "Что-то пошло не так...",
    loadMessage = "Загрузка ...",
    successMessage = "Cпасибо, мы скоро с вами свяжемся!",
    invalidInputaMessage = "Проверьте правильность заполнения всех полей";

  const statusMessage = document.createElement("div");
  statusMessage.textContent = "Message!";
  statusMessage.style.cssText = "font-size-2rem;";

  class Order {
    constructor(
      type,
      diameter1,
      diameter2,
      amoutntOfCameras1,
      amoutntOfCameras2,
      bottom,
      distance,
      result
    ) {
      this.type = type;
      this.diameter1 = diameter1;
      this.diameter2 = diameter2;
      this.amoutntOfCameras1 = amoutntOfCameras1;
      this.amoutntOfCameras2 = amoutntOfCameras2;
      this.distance = distance;
      this.result = result;
      this.bottom = bottom;
    }
  }

  let d1,
    amount1,
    d2 = 0,
    amount2 = 0,
    type = 1,
    bottom = true;

  const getOrder = () => {
    const resultInput = document.getElementById("calc-result"),
      myonoffswitch = document.getElementById("myonoffswitch"),
      formControl = document.querySelectorAll(".form-control"),
      selectBoxes = document.querySelectorAll(".select-box"),
      myonoffswitchTwo = document.getElementById("myonoffswitch-two"),
      distanceInput = document.getElementById("distance");

    if (myonoffswitch.checked) {
      // one camera
      type = 1;
      d2 = 0;
      amount2 = 0;
    } else {
      // two cameras
      type = 2;
      d2 = parseFloat(
        formControl[2].options[formControl[2].selectedIndex].value
      );
      amount2 = parseFloat(
        formControl[3].options[formControl[3].selectedIndex].value
      );
    }

    bottom = myonoffswitchTwo.checked;

    d1 = parseFloat(formControl[0].options[formControl[0].selectedIndex].value);
    amount1 = parseFloat(
      formControl[1].options[formControl[1].selectedIndex].value
    );

    let order = new Order(
      type,
      d1,
      d2,
      amount1,
      amount2,
      bottom,
      +distanceInput.value,
      +resultInput.value
    );
    return order;
  };

  const clearInputs = (form) => {
    const inputs = form.querySelectorAll("input");
    inputs.forEach((input) => {
      input.value = "";
    });
  };

  const send = () => {
    const valideNumber = (input) => {
      const number = input.replace(/[^0-9]/g, '');
      return !!(input && number.length === 11);
    };

    const valideText = (text) => {
      const textPattern = /^[\u0400-\u04FF ]+$/;
      return !!(text && text.match(textPattern));
    };

    const postData = (body) => {
      return fetch("./server.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
    };

    const timerToClearMessage = () =>
      setTimeout(() => {
        statusMessage.textContent = "";
      }, 4000);

    forms.forEach((form) => {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        form.appendChild(statusMessage);
        statusMessage.textContent = loadMessage;
        const formData = new FormData(form);
        let body = {},
          data = {},
          inputPhone,
          inputName,
          valide;

        let order = getOrder();

        for (let val of formData.entries()) {
          body[val[0]] = val[1];
        }

        inputName = body["user_name"];
        inputPhone = body["user_phone"];

        if (e.target.closest(".popup-call")) {
          
        }

        if (question.value) {
          data = { body, userQuestion: question.value };
        } else 
        if (e.target.closest(".popup-call")) {
          data = { body, order };
        } else {
          data = { body };
        }

        if (typeof inputName === "undefined") {
          valide = valideNumber(inputPhone);
        } else {
          valide = valideNumber(inputPhone) && valideText(inputName);
        }

        if (valide) {
          timerToClearMessage();
          postData(data)
            .then((response) => {
              if (response.status !== 200) {
                throw new Error("status network is not 200");
              }
              statusMessage.textContent = successMessage;
              clearInputs(form);
            })
            .catch((error) => {
              statusMessage.textContent = errorMessage;
              clearInputs(form);
            });
        } else {
          timerToClearMessage();
          statusMessage.textContent = invalidInputaMessage;
        }
      });
    });
  };
  send();
};

export default sendForm;
