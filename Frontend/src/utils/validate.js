export const validateForm = (email, password) => {
    const emailValidateion = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

    const passwordValidation = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

    if(!emailValidateion) return "Email is not Valid";
    if(!passwordValidation) return "Password is too Weak";

    return (null);
}