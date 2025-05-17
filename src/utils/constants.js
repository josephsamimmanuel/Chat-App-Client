// Email validation regex pattern
export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Password validation regex pattern
// export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const passwordRegex = /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

// Username validation regex pattern
export const usernameRegex = /^[a-zA-Z\s]{3,50}$/;

// Bio validation regex pattern
export const bioRegex = /^[a-zA-Z\s]{3,100}$/;

// Location validation regex pattern
export const locationRegex = /^[a-zA-Z\s]{3,50}$/;

export const validateField = (name, value) => {
    switch (name) {
        case "email":
            if (!value) return "Email is required.";
            if (!emailRegex.test(value)) return "Please enter a valid email address.";
            return "";
        case "password":
            if (!value) return "Password is required.";
            if (!passwordRegex.test(value)) return "Please enter a valid password.";
            return "";
        case "username":
            if (!value) return "Username is required.";
            if (!usernameRegex.test(value)) return "Please enter a valid username.";
            return "";
        case "bio":
            if (!bioRegex.test(value)) return "Please enter a valid bio.";
            return "";
        case "location":
            if (!locationRegex.test(value)) return "Please enter a valid location.";
            return "";            
        default:
            return "";
    }
};


