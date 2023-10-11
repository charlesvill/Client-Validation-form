// on load event handler adds the class list of invalid to all errorSpan

// on input event handler added to each field

// each input handler will check that respective field to see if its valid per the different fields

// on submit event handler added for the form that will submit if each field object returns true for its field
const classChanger = (nodeList, className, command = 'add') =>{
   if(command === 'add'){
    nodeList.forEach(element => {
       element.classList.add(`${className}`);
       return true;
    });
   } else if(command === 'remove'){
        nodeList.forEach(element => {
            element.classList.remove(`${className}`);
        });
        return true;
   }

}

const createField = (fieldElement) => {
    let invalid = true;
    const errorSpan = fieldElement.nextElementSibling;

    const validationChecker = () =>{
        const wrong_patt = fieldElement.validity.patternMismatch;
        const too_long = fieldElement.validity.tooLong;
        const too_short = fieldElement.validity.tooShort;

        if(!wrong_patt
            && !too_long
            && !too_short){
                console.log("we have a good input!");
                return true;
        }
        return false;
    }
    const isInValid= () => {
        return invalid;
    }

    fieldElement.addEventListener("input", (event) => {
        //  call vC , if validation checker comes back true turn invalid false
        if(!validationChecker()){
            invalid = true;
            errorSpan.classList.remove("valid");
            errorSpan.classList.add("invalid");
        } else {
            invalid = false;
            console.log(errorSpan);
            errorSpan.classList.remove("invalid");
            errorSpan.classList.add("valid");
        }
    })
    return {isInValid};
}

const FormValidation = (function () {
    const mail = document.getElementById("email");
    const country = document.getElementById("country");
    const zip = document.getElementById("zipcode");
    const pwd = document.getElementById("password");
    const cpwd = document.getElementById("conPassword");
    const errorSpan = document.querySelectorAll(".error");
    const submitBtn = document.getElementById("form");

    const inputEventHandlers = () => {
        const mailField = createField(mail);
        const countryField = createField(country);
        const zipField = createField(zip);
        const pwdField = (() => {
            const {isInValid} = createField(pwd);
            return {isInValid};
        })();
        const confirmPwdField = (() => {
            let invalid = true;
            const errorSpan = document.querySelector(".cp");
            const isInValid = () => {
                return invalid;
            }

            cpwd.addEventListener("input", () => {
                let createValue = pwd.value;
                let confirmValue = cpwd.value;
                if(createValue === confirmValue){
                    invalid = false;
                    errorSpan.classList.remove("noMatch");
                    cpwd.classList.remove("invalid");
                    errorSpan.classList.add("valid");
                } else {
                    errorSpan.classList.add("noMatch");
                    invalid = true;
                }
            })
            return {isInValid};
        })();
        return {mailField, countryField, zipField, pwdField, confirmPwdField};
   }
    const addSubmitEventHandler = (inputHandlers) => {
        submitBtn.addEventListener("submit", (event) => {
               if(!inputHandlers.mailField.isInValid()
                && !inputHandlers.countryField.isInValid()
                && !inputHandlers.zipField.isInValid()
                && !inputHandlers.pwdField.isInValid()
                && !inputHandlers.confirmPwdField.isInValid()){
                    event.preventDefault();
                    console.log("we have a successsful submission!");
                } else {
                    event.preventDefault();
                    alert("something did not pass with the forms!");
                }
        })
    }

    document.addEventListener("DOMContentLoaded", ()=>{
        const addInputHandlers = inputEventHandlers();

        classChanger(errorSpan, 'invalid');
        addSubmitEventHandler(addInputHandlers);
    })
})();

