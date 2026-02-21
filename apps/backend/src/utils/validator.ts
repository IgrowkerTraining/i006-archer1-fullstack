interface ValidationError {
  field: string;
  message: string;
}

interface RegistrationData {
  name: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

class Validator {
  static required(value: string, fieldName: string): string | null {
    if (!value || value.trim() === "") {
      return `${fieldName} is required`;
    }
    return null;
  }

  static email(value: string): string | null {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return "Invalid email format";
    }
    return null;
  }

  static minLength(value: string, min: number): string | null {
    if (value.length < min) {
      return `Must be at least ${min} characters long`;
    }
    return null;
  }

  static validateRegistration(data: RegistrationData): ValidationError[] {
    const errors: ValidationError[] = [];

    const nameError = this.required(data.name, "Name");
    if (nameError) errors.push({ field: "name", message: nameError });

    const emailError = this.required(data.email, "Email") || this.email(data.email);
    if (emailError) errors.push({ field: "email", message: emailError });

    const passwordError =
      this.required(data.password, "Password") || this.minLength(data.password, 6);
    if (passwordError) errors.push({ field: "password", message: passwordError });

    return errors;
  }

  static validateLogin(data: LoginData): ValidationError[] {
    const errors: ValidationError[] = [];

    const emailError = this.required(data.email, "Email") || this.email(data.email);
    if (emailError) errors.push({ field: "email", message: emailError });

    const passwordError = this.required(data.password, "Password");
    if (passwordError) errors.push({ field: "password", message: passwordError });

    return errors;
  }
}

export default Validator;
