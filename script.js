const inputSlider = document.querySelector("[data-slider]");
const sliderValue = document.querySelector("[length-number]");
const Datalength = document.querySelector("[data-length]");
const copyMsg = document.querySelector("[datacopy-msg]");
const display = document.querySelector("[data-passwordDisplay]");
const uppercheckbox = document.querySelector('#uppercase');
const lowercheckbox = document.querySelector('#lowercase');
const symbolcheckbox = document.querySelector('#symbol');
const numbercheckbox = document.querySelector('#numbers');
const indicate = document.querySelector(".circle");
const Generatebtn = document.querySelector(".generateor_button")
const allCheckbox = document.querySelectorAll("input[type = checkbox]");

const symbol = "+-%@*&$#"
let password = "";
let passlength = 10;
let checkCount = 0;
handleSlider();

function handleSlider() {
    inputSlider.value = passlength;
    sliderValue.innerText = passlength;
}

function SetIndicator(color) {
    indicate.style.backgroundColor = color;
    // shadow;
}

function getRandomInt(min, max) {

    return Math.floor[Math.random() * (max - min)] + min;


}

function getRandomNumber() {
    return getRandomInt(0, 9);
}

function getRandomLowercase() {
    return String.fromCharCode(getRandomInt(97, 123));
}

function getRandomUppercase() {
    return String.fromCharCode(getRandomInt(65, 95));
}

function GenerateSymbol() {
    const random = getRandomInt(0, symbol.length);
    return symbol.charAt(random);

}

function calculateStrength() {
    let upper = false;
    let lower = false;
    let number = false;
    let symbol = false;

    if (uppercheckbox.checked) upper = true;
    if (lowercheckbox.checked) lower = true;
    if (numbercheckbox.checked) number = true;
    if (symbolcheckbox.checked) symbol = true;

    if (lower && upper && (number || symbol) && passlength >= 8) {
        SetIndicator("#0f0");
    } else if (
        (upper || lower) && (number || symbol) &&
        passlength >= 6
    ) {
        SetIndicator("#ff0");
    } else {
        SetIndicator("#f00");
    }
}



async function copyContent() {

    try {
        await navigator.clipboard.writeText(display.value);
        copyMsg.innerText = "Copied"


    } catch (e) {

        copyMsg.innerText = "fail";
    };


    // content visival
    copyMsg.classList.add("active");
    setTimeout(() => {

        copyMsg.classList.remove("active");

    }, 2000);
};

function sufflepass(array) {
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}



function handleallcheckbox() {

    checkCount = 0;
    allCheckbox.forEach((checkbox) => {

        if (checkbox.checked)
            checkCount++;

    });

    if (passlength < checkCount) {
        passlength = checkCount;
        handleSlider();
    }
}


allCheckbox.forEach((checkbox) => {
    checkbox.addEventListener('change', handleallcheckbox);
})


inputSlider.addEventListener('input', (e) => {
    passlength = e.target.value;
    handleSlider();
})

copyMsg.addEventListener('click', () => {

    if (display.value) {

        copyContent();

    }

})

// generate button

Generatebtn.addEventListener('click', () => {

    if (checkCount == 0) return;

    if (passlength < checkCount) {
        passlength = checkCount;
        handleSlider();
    }


    console.log("starting the journey");

    // for New password generation


    // for Remove old password
    password = "";


    // if (uppercheckbox.checked) {

    //     password += getRandomUppercase();

    // }


    // if (lowercheckbox.checked) {

    //     password += getRandomLowercase;

    // }

    // if (symbolcheckbox.checked) {

    //     password += GenerateSymbol();

    // }


    // if (numbercheckbox.checked) {

    //     password += getRandomNumber();

    // }
    let funcArr = [];

    if (uppercheckbox.checked)
        funcArr.push(getRandomUppercase);

    if (lowercheckbox.checked)
        funcArr.push(getRandomLowercase);

    if (symbolcheckbox.checked)
        funcArr.push(GenerateSymbol);

    if (numbercheckbox.checked)
        funcArr.push(getRandomNumber);


    // compulsary


    for (let i = 0; i < funcArr.length; i++) {
        password += funcArr[i]();
    }

    console.log(" comp done ");
    // remaining


    for (let i = 0; i < passlength - funcArr.length; i++) {
        let randIndex = getRandomInt(0, funcArr.length);

        console.log(" Kuch done" + randIndex);

        password += funcArr[randIndex]();
    }

    console.log("rema done");

    password = sufflepass(Array.from(password));

    console.log("suffle done");

    // For Show In UI


    display.value = password;


    console.log(" UI done");


    calculateStrength();

});