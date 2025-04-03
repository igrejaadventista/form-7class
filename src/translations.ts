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
    acceptEmails: string;
    referralSource?: {
      label: string;
      placeholder: string;
      options?: {
        friend: string;
        social: string;
        whatsapp: string;
        google: string;
        events: string;
        church: string;
        email: string;
        ads: string;
        other: string;
      };
    };
    platformLanguage?: {
      label: string;
      options?: {
        pt: string;
        es: string;
      };
    };
    country?: {
      label: string;
      placeholder: string;
      options?: {
        other: string;
      };
    };
    association?: {
      label: string;
      placeholder: string;
    };
    successMessage: string;
    errorMessage: string;
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
      dataProtection: "Seus dados estão protegidos",
      acceptEmails: "Aceito receber emails com novidades e promoções",
      referralSource: {
        label: "Como você conheceu o 7Class?",
        placeholder: "Selecione uma opção",
        options: {
          friend: "Indicação de um amigo(a)",
          social: "Redes sociais (Instagram, Facebook, YouTube etc.)",
          whatsapp: "WhatsApp",
          google: "Google / Buscadores",
          events: "Eventos ou palestras",
          church: "Igreja local",
          email: "E-mail ou newsletter",
          ads: "Propaganda online (anúncios)",
          other: "Outro"
        }
      },
      platformLanguage: {
        label: "Selecione o idioma da sua plataforma",
        options: {
          pt: "Português",
          es: "Español"
        }
      },
      country: {
        label: "Selecione seu país",
        placeholder: "Selecione um país",
        options: {
          other: "Outros"
        }
      },
      association: {
        label: "Selecione sua associação",
        placeholder: "Selecione uma associação"
      },
      successMessage: "Formulário enviado com sucesso! Obrigado pelo seu cadastro.",
      errorMessage: "Ocorreu um erro ao enviar o formulário. Por favor, tente novamente."
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
      dataProtection: "Your data is protected",
      acceptEmails: "I agree to receive emails with news and promotions",
      referralSource: {
        label: "How did you hear about 7Class?",
        placeholder: "Select an option",
        options: {
          friend: "Referred by a friend",
          social: "Social media (Instagram, Facebook, YouTube, etc.)",
          whatsapp: "WhatsApp",
          google: "Google / Search engines",
          events: "Events or lectures",
          church: "Local church",
          email: "Email or newsletter",
          ads: "Online advertising",
          other: "Other"
        }
      },
      platformLanguage: {
        label: "Select your platform language",
        options: {
          pt: "Portuguese",
          es: "Spanish"
        }
      },
      country: {
        label: "Select your country",
        placeholder: "Select a country",
        options: {
          other: "Others"
        }
      },
      association: {
        label: "Select your association",
        placeholder: "Select an association"
      },
      successMessage: "Form submitted successfully! Thank you for your registration.",
      errorMessage: "An error occurred while submitting the form. Please try again."
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
      dataProtection: "Sus datos están protegidos",
      acceptEmails: "Acepto recibir correos con novedades y promociones",
      referralSource: {
        label: "¿Cómo conociste 7Class?",
        placeholder: "Seleccione una opción",
        options: {
          friend: "Recomendación de un amigo",
          social: "Redes sociales (Instagram, Facebook, YouTube, etc.)",
          whatsapp: "WhatsApp",
          google: "Google / Buscadores",
          events: "Eventos o conferencias",
          church: "Iglesia local",
          email: "Correo electrónico o boletín",
          ads: "Publicidad en línea",
          other: "Otro"
        }
      },
      platformLanguage: {
        label: "Seleccione el idioma de su plataforma",
        options: {
          pt: "Portugués",
          es: "Español"
        }
      },
      country: {
        label: "Seleccione su país",
        placeholder: "Seleccione un país",
        options: {
          other: "Otros"
        }
      },
      association: {
        label: "Seleccione su asociación",
        placeholder: "Seleccione una asociación"
      },
      successMessage: "¡Formulario enviado con éxito! Gracias por su registro.",
      errorMessage: "Ocurrió un error al enviar el formulario. Por favor, inténtelo de nuevo."
    }
  }
};