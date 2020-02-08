export const isEmailValid = (email) => {
    let regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regExp.test(String(email).toLowerCase()) && email;
};

export const isOnlyText = (text) => {
    let regExp = /^[A-Za-z ]+$/;
    return regExp.test(String(text)) && text;
};

export const isGreaterThanTwo = (str) =>{
    return str.length >= 2;
}
export const isPassword = (password) => {
    let regExp = /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{6}$/;
    return regExp.test(String(password)) && password;
};
export const confirm = (password) => {
    let regExp = /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{6}$/;
    return regExp.test(String(password)) && password;
};

export const isNumber = (number) =>{
    let regExp = /^[0]\d{10}$/;
    return regExp.test(Number(number)) && number;
}

export const isValid = (pin) =>{
    let regExp = /^\d{4}$/;
    return regExp.test(Number(pin)) && pin;
}
