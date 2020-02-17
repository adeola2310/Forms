export const isEmailValid = (email) => {
    let regExp =  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regExp.test(String(email).toLowerCase()) && email;
};

export const isFullName = (text) => {
    let regExp = /^[a-zA-Z]+ [a-zA-Z]+$/;
    return regExp.test(String(text)) && text;
};

export const isGreaterThanTwo = (str) => {
    return str.length >= 2;
}
export const isPassword = (password) => {
    let regExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!_%*?&]{6,}$/
    return regExp.test(String(password));
};
export const confirmPassword = (password, confirmPassword) => {
    return password === confirmPassword;
};

export const isNumber = (number) => {
    let regExp = /^0((8[0|1])|([7|9]0))\d{8}$/;
    return regExp.test(String(number)) && number;
}

export const isValid = (pin) => {
    let regExp = /^\d{4}$/;
    return regExp.test(Number(pin));
}


export const isOnlyNumber = (number) => {
    let regExp = /[0-9]/;
    return regExp.test(Number(number)) && number;
}

