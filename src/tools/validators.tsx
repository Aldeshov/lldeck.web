export const validatePassword = (password: string) => {
    return password.length >= 4;
};

export const validateEmail = (email: string) => {
    if (email.length < 6) return false;
    return String(email)
        .toLowerCase()
        .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})|(([a-zA-Z\-\d]+\.)+[a-zA-Z]{2,}))$/);
};

export const validatePhoneNumber = (phoneNumber: string) => {
    return phoneNumber.length >= 7;
}

export const validateName = (value: string) => {
    return value !== null && value.match(/^ *$/) === null;
}
