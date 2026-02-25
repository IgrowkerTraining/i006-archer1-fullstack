interface ValidationError {
  field: string;
  message: string;
}

interface RegisterDTO {
  fullname: string;
  email: string;
  password: string;
  country?: string;
  istechnician: boolean;
  registrationnumber?: string;
}

interface LoginData {
  email: string;
  password: string;
}

class ValidatorUser {



  static required(value: string | undefined, fieldName: string): string | null {
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


  static validateRegister(data: RegisterDTO): ValidationError[] {
    const errors: ValidationError[] = [];

    const fullnameError = this.required(data.fullname, "Full name");
    if (fullnameError)
      errors.push({ field: "fullname", message: fullnameError });

    const emailError =
      this.required(data.email, "Email") || this.email(data.email);
    if (emailError)
      errors.push({ field: "email", message: emailError });

    const passwordError =
      this.required(data.password, "Password") ||
      this.minLength(data.password, 6);
    if (passwordError)
      errors.push({ field: "password", message: passwordError });

    if (typeof data.istechnician !== "boolean") {
      errors.push({
        field: "istechnician",
        message: "istechnician must be true or false",
      });
    }

    if (data.istechnician === true) {
      const regError = this.required(
        data.registrationnumber,
        "Registration number"
      );

      if (regError) {
        errors.push({
          field: "registrationnumber",
          message: "Registration number is required for technicians",
        });
      }
    }

    if (data.istechnician === false && data.registrationnumber) {
      errors.push({
        field: "registrationnumber",
        message: "Registration number must be null if user is not a technician",
      });
    }

    return errors;
  }

  // 🔹 VALIDATE LOGIN

  static validateLogin(data: LoginData): ValidationError[] {
    const errors: ValidationError[] = [];

    const emailError =
      this.required(data.email, "Email") || this.email(data.email);
    if (emailError)
      errors.push({ field: "email", message: emailError });

    const passwordError = this.required(data.password, "Password");
    if (passwordError)
      errors.push({ field: "password", message: passwordError });

    return errors;
  }
}

export default ValidatorUser;
