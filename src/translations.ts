interface Translation {
  languageName: string;
  flag: string;
  fields: {
    title: string;
    name: {
      label: string;
      placeholder: string;
    };
    phone: {
      label: string;
      placeholder: string;
    };
    email: {
      label: string;
      placeholder: string;
    };
    password: {
      label: string;
      placeholder: string;
    };
    submit: string;
    loginLink: string;
    dataProtection: string;
  };
}

export const translations: { [key: string]: Translation } = {
  pt: {
    languageName: "Português",
    flag: "🇧🇷",
    fields: {
      title: "",
      name: {
        label: "Nome",
        placeholder: "Digite seu nome completo"
      },
      phone: {
        label: "Celular",
        placeholder: "(00) 00000-0000"
      },
      email: {
        label: "Email",
        placeholder: "Digite seu email"
      },
      password: {
        label: "Senha",
        placeholder: "Digite sua senha"
      },
      submit: "Cadastrar",
      loginLink: "Já é aluno? Clique aqui",
      dataProtection: "Seus dados estão protegidos"
    }
  },
  en: {
    languageName: "English",
    flag: "🇺🇸",
    fields: {
      title: "General",
      name: {
        label: "Name",
        placeholder: "Enter your full name"
      },
      phone: {
        label: "Phone",
        placeholder: "(00) 00000-0000"
      },
      email: {
        label: "Email",
        placeholder: "Enter your email"
      },
      password: {
        label: "Password",
        placeholder: "Enter your password"
      },
      submit: "Register",
      loginLink: "Already a student? Click here",
      dataProtection: "Your data is protected"
    }
  },
  es: {
    languageName: "Español",
    flag: "🇪🇸",
    fields: {
      title: "General",
      name: {
        label: "Nombre",
        placeholder: "Ingrese su nombre completo"
      },
      phone: {
        label: "Teléfono",
        placeholder: "(00) 00000-0000"
      },
      email: {
        label: "Correo",
        placeholder: "Ingrese su correo"
      },
      password: {
        label: "Contraseña",
        placeholder: "Ingrese su contraseña"
      },
      submit: "Registrarse",
      loginLink: "¿Ya eres estudiante? Haz clic aquí",
      dataProtection: "Sus datos están protegidos"
    }
  }
};