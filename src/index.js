import "@babel/polyfill";
import "nodelist-foreach-polyfill";
import "formdata-polyfill";
import elementClosest from "element-closest";
elementClosest(window);
import "es6-promise";
import "fetch-polyfill";

import sendForm from "./modules/sendForm";
import modalCall from "./modules/modalCall";
import modalDiscount from "./modules/modalDiscount";
import accordion from "./modules/accordion";
import popupCheckDiscount from "./modules/popupCheckDiscount";
import calculator from "./modules/calculator";
import showMore from "./modules/showMore";
import sendQuestionForm from "./modules/sendQuestionForm";

modalCall();

sendForm();

modalDiscount();

accordion();

popupCheckDiscount();

calculator();

showMore();

sendQuestionForm();



