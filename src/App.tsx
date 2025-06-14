import React, { useState, useEffect, useRef } from 'react';
import InputMask from 'react-input-mask';
import { Eye, EyeOff, User, Phone, Mail, Lock, Lightbulb } from 'lucide-react';
import { translations } from './translations';
import CountrySelect from './components/CountrySelect';
// Import the background image
import backgroundImage from './assets/images/background.jpg';

// Atualizar a interface FormData para remover o campo state
interface FormData {
  name: string;
  phone: string;
  countryCode: string;
  email: string;
  password: string;
  acceptEmails: boolean;
  referralSource: string;
  platformLanguage: string;
  country: string; // New field for country selection
  association: string; // New field for association selection
}

// Update the WebhookResponse interface
interface WebhookResponse {
  success: boolean;
  message?: string;
  error?: string;
  details?: string;
  data?: any;
}

// Update the translations interface in the file
interface Translation {
  // ... existing fields ...
  association?: {
    label: string;
    placeholder: string;
    filterPlaceholder?: string; // Add this field
  };
  // ... rest of the fields ...
}

// Move the countryAssociations object here, before it's used
const countryAssociations = {
  "Argentina": [
    "Asociación Argentina Central - AAC / UA",
    "Asociación Argentina del Norte - AAN / UA",
    "Asociación Argentina del Sur - AAS / UA",
    "Asociación Bonaerense - ABo / UA",
    "Misión Argentina del Centro Oeste - MACO / UA",
    "Misión Argentina del Noroeste - MANo / UA",
    "Misión Bonaerense del Norte - MiBoN / UA"
  ],
  "Bolivia": [
    "Misión Boliviana Central - MBC / UB",
    "Misión Boliviana Occidental Sur - MBOS / UB",
    "Misión Boliviana Occidental Norte - MBON / UB",
    "Misión del Oriente Boliviano - MOB / UB"
  ],
  "Brasil": [
    "(AL) Missão Alagoas - MisAl / UNeB",
    "(AM) Associação Central Amazonas - ACeAm / UNoB",
    "(AM) Missão Leste do Amazonas (nova) - MLA / UNoB",
    "(AM-RR) Associação Amazonas Roraima - AAmaR / UNoB",
    "(AP) Missão Pará-Amapá - MPA / UNB",
    "(BA) Associação Bahia - AB / ULB",
    "(BA) Associação Bahia Central - ABaC / ULB",
    "(BA) Associação Bahia Norte - ABN / ULB",
    "(BA) Associação Bahia Sul - ABS / ULB",
    "(BA) Missão Bahia Extremo Sul - MiBES / ULB",
    "(BA) Missão Bahia Sudoeste - MBSo / ULB",
    "(CE) Associação Cearense - ACe / UNeB",
    "(DF) Associação Planalto Central - APlac / UCOB",
    "(ES) Associação Espírito Santense - AES / USeB",
    "(ES) Associação Sul Espírito Santense - ASES / USeB",
    "(GO) Associação Brasil Central - ABC / UCOB",
    "(MA) Associação Maranhense - AMA / UNB",
    "(MA) Associação Sul-Maranhense - ASuMa / UNB",
    "(MA) Missão Nordeste Maranhense - MNeM / UNB",
    "(MA) Missão Oeste do Pará - MOPa / UNB",
    "(MG) Associação Mineira Central - AMC / USeB",
    "(MG) Associação Mineira Leste - AML / USeB",
    "(MG) Associação Mineira Sul - AMS / USeB",
    "(MG) Missão Mineira Norte - MMN / USeB",
    "(MG) Missão Mineira Oeste - MMO / USeB",
    "(MT) Associação Leste Mato-grossense - ALM / UCOB",
    "(MT) Associação Oeste Mato-grossense - AOM / UCOB",
    "(MS) Associação Sul Mato-grossense - ASM / UCOB",
    "(PA) Associação Norte do Pará - ANPa / UNB",
    "(PA) Associação Sul do Pará - ASPa / UNB",
    "(PA) Missão Oeste do Pará - MOPa / UNB",
    "(PA-AP) Missão Pará-Amapá - MPA / UNB",
    "(PE) Associação Pernambucana - APe / UNeB",
    "(PE) Associação Pernambucana Central - APeC / UNeB",
    "(PI) Missão Piauiense - MPi / UNeB",
    "(PR) Associação Central Paranaense - ACP / USB",
    "(PR) Associação Norte Paranaense - ANP / USB",
    "(PR) Associação Oeste Paranaense - AOP / USB",
    "(PR) Associação Sul Paranaense - ASP / USB",
    "(PR) Associação Norte Sul-Rio-Grandense - ANSR / USB",
    "(RS) Associação Central Sul-Rio-Grandense - ACSR / USB",
    "(RJ) Associação Rio de Janeiro - ARJ / USeB",
    "(RJ) Associação Rio Fluminense - ARF / USeB",
    "(RJ) Associação Rio Sul - ARS / USeB",
    "(RS) Associação Norte Sul-Rio-Grandense - ANSR / USB",
    "(RS) Associação Sul Rio-Grandense - ASR / USB",
    "(RO) Associação Sul de Rondônia - ASuR / UNoB",
    "(RO-AC) Associação Norte de Rondônia e Acre - ANRA / UNoB",
    "(SC) Associação Sul Catarinense - AC / USB",
    "(SC) Associação Norte Catarinense - ANC / USB",
    "(SE) Missão Sergipe - MSe / ULB",
    "(SP) Associação Paulista Central - APaC / UCB",
    "(SP) Associação Paulista do Vale - APV / UCB",
    "(SP) Associação Paulista Leste - APL / UCB",
    "(SP) Associação Paulista Oeste - APO / UCB",
    "(SP) Associação Paulista Sudeste - APSe / UCB",
    "(SP) Associação Paulista Sudoeste - APSo / UCB",
    "(SP) Associação Paulista Sul - APS / UCB",
    "(SP) Associação Paulistana - AP / UCB",
    "(TO) Missão do Tocantins - MTo / UCOB",
    "(RN-PB) Missão Rio Grande do Norte-Paraíba - MRP / UNeB"
  ],
  "Chile": [
    "Asociación Centro Sur de Chile - ACSCh / UCh",
    "Asociación Metropolitana de Chile - AMCh / UCh",
    "Asociación Norte de Chile - ANCh / UCh",
    "Asociación Sur Austral de Chile - ASACh / UCh",
    "Misión Central de Chile - MCCh / UCh",
    "Misión Chilena del Pacífico - MChP / UCh",
    "Misión Sur Metropolitana de Chile - MSMCh / UCh"
  ],
  "Equador": [
    "Misión Ecuatoriana del Norte - MEN / UE",
    "Misión Ecuatoriana del Sur - MES / UE"
  ],
  "Paraguay": [
    "Unión Paraguaya - UP"
  ],
  "Peru": [
    "Asociación Norte Pacífico del Perú - ANoP / UPN",
    "Asociación Peruana Central Este - APCE / UPN",
    "Misión Centro-oeste del Perú - MiCOP / UPN",
    "Misión Norte Oriental - MiNOP / UPN",
    "Misión Peruana del Norte - MPN / UPN",
    "Asociación Peruana Central - APC / UPS",
    "Asociación Peruana del Sur - APSur / UPS",
    "Misión Central del Perú - MCP / UPS",
    "Misión del Oriente Peruano - MOP / UPS",
    "Misión Peruana Central Sur - MPCS / UPS",
    "Misión Peruana del Lago Titicaca - MPLT / UPS",
    "Misión Sur Oriental del Perú - MSOP / UPS"
  ],
  "Uruguay": [
    "Unión Uruguaya - UU"
  ],
  "Ilhas Malvinas (Falkland)": [
    "Estação de Campo Ilhas Malvinas (Falkland) - ECIM / DSA"
  ]
}
;

// Add this function after the countryAssociations object
const getPhoneMask = (countryCode: string) => {
  switch (countryCode) {
    case '+55': // Brazil
      return '(99) 99999-9999';
    case '+1': // USA, Canada
      return '(999) 999-9999';
    case '+44': // UK
      return '99999 999999';
    case '+34': // Spain
      return '999 999 999';
    case '+351': // Portugal
      return '999 999 999';
    case '+54': // Argentina
      return '(999) 999-9999';
    case '+56': // Chile
      return '9 9999 9999';
    case '+57': // Colombia
      return '999 999 9999';
    case '+58': // Venezuela
      return '999-999-9999';
    case '+593': // Ecuador
      return '999 999 999';
    case '+595': // Paraguay
      return '999 999 999';
    case '+598': // Uruguay
      return '999 999 999';
    case '+51': // Peru
      return '999 999 999';
    default:
      return '999999999999999'; // Generic mask for other countries
  }
};

// Update the sendWebhookWithRetry function with better error handling
async function sendWebhookWithRetry(data: FormData, maxRetries = 3): Promise<WebhookResponse> {
  const WEBHOOK_URL = `https://autoflow.adv.st/webhook/7class`;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`Attempt ${attempt} of ${maxRetries}`);
      
      // Format the phone with country code - ensure we're only using digits
      const countryCodeDigits = data.countryCode.replace(/\D/g, '');
      const phoneDigits = data.phone.replace(/\D/g, '');
      const formattedPhone = countryCodeDigits + phoneDigits;
      
      // Create a payload that matches what the webhook might expect
      const payload = {
        name: data.name,
        email: data.email,
        phone: formattedPhone,
        password: data.password,
        marketing_consent: data.acceptEmails,
        referral_source: data.referralSource,
        platform_language: data.platformLanguage,
        country: data.country,
        association: data.association,
        source: "website_form",
        submitted_at: new Date().toISOString()
      };
      
      try {
        const response = await fetch(WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(payload),
          mode: 'cors', // Try with cors mode explicitly set
        });

        // Check if response is ok before trying to parse JSON
        if (!response.ok) {
          // Handle specific HTTP status codes with more user-friendly messages
          if (response.status === 409) {
            throw new Error('Este email já está cadastrado no sistema.');
          } else if (response.status === 400) {
            throw new Error('Dados inválidos. Por favor, verifique as informações fornecidas.');
          } else if (response.status === 401 || response.status === 403) {
            throw new Error('Sem permissão para realizar esta operação.');
          } else if (response.status === 404) {
            throw new Error('Serviço não encontrado.');
          } else if (response.status === 500) {
            throw new Error('Erro interno do servidor. Por favor, tente novamente mais tarde.');
          } else {
            // Generic error for other status codes
            throw new Error(`Erro no servidor (${response.status}). Por favor, tente novamente.`);
          }
        }
        
        // Check if response has content before parsing JSON
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          try {
            // Check if response body is empty before parsing
            const text = await response.text();
            if (!text || text.trim() === '') {
              console.log('Empty response body');
              return { 
                success: true, 
                message: 'Operação realizada com sucesso.' 
              };
            }
            
            // Parse the JSON from the text
            const result = JSON.parse(text);
            
            // Some webhooks might return different success indicators
            if (result.success === false) {
              // Return the exact error message from the API response
              return {
                success: false,
                message: result.message || result.error || result.details || 'Webhook request failed'
              };
            }
            
            // If we get here, assume success even if there's no explicit success flag
            return { 
              success: true, 
              data: result,
              message: result.message || 'Cadastro realizado com sucesso!'
            };
          } catch (error) {
            console.error('Error parsing JSON:', error);
            return { 
              success: false, 
              message: 'Erro ao processar resposta do servidor.' 
            };
          }
        } else {
          // Handle empty or non-JSON responses
          console.log('Response is not JSON or is empty');
          return { 
            success: true, 
            message: 'Operação realizada com sucesso.' 
          };
        }
      } catch (error) {
        // This will catch network errors including CORS
        if (error instanceof Error && error.message.includes('CORS')) {
          console.error('CORS error detected:', error);
          return {
            success: false,
            message: 'Erro de acesso ao servidor. Por favor, tente novamente mais tarde.'
          };
        }
        throw error; // Re-throw other errors to be handled by the outer catch
      }
    } catch (error) {
      console.error(`Attempt ${attempt} failed:`, error);
      
      if (attempt === maxRetries) {
        return { 
          success: false, 
          message: `Falha ao enviar formulário: ${error instanceof Error ? error.message : 'Erro desconhecido'}. Por favor, tente novamente.`
        };
      }
      // Wait before retrying (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
    }
  }
  return { success: false, message: 'Erro inesperado ocorreu' };
}

function App() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  
  // Add new state for error popup
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  
  // Modificar para usar inglês como idioma padrão
  const [language, setLanguage] = useState(() => {
    // Primeiro tenta obter o idioma do navegador que detectamos
    const browserLang = localStorage.getItem('browserLanguage');
    // Verifica se o idioma detectado é suportado em nossas traduções
    if (browserLang && translations[browserLang]) {
      return browserLang;
    }
    // Usa inglês como idioma padrão
    return 'en';
  });
  
  // Update the formData state to remove the default platformLanguage
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    countryCode: '+55', // Padrão para Brasil
    email: '',
    password: '',
    acceptEmails: false,
    referralSource: '',
    platformLanguage: '', // Changed from 'pt' to empty string
    country: 'Brasil', // Set Brazil as default country
    association: '' // Default empty
  });

  const t = translations[language].fields;

  // Add the handleCountryChange function here
  // Add these new state variables after the formData state
  const [associationFilter, setAssociationFilter] = useState('');
  const [showAssociationDropdown, setShowAssociationDropdown] = useState(false);
  
  // Add this function to handle the association filter input
  const handleAssociationFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAssociationFilter(e.target.value);
  };
  
  // // Add this function to handle selecting an association from the filtered list
  // const handleAssociationSelect = (association: string) => {
  //   console.log("Selected association:", association); // Add logging
  //   setFormData(prev => {
  //     const updated = {
  //       ...prev,
  //       association: association
  //     };
  //     console.log("Updated formData:", updated); // Log the updated state
  //     return updated;
  //   });
  //   setAssociationFilter('');
  //   setShowAssociationDropdown(false);
  // };

  // Modify the existing handleCountryChange function to reset the association filter
  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setFormData(prev => ({
      ...prev,
      country: value,
      association: '' // Reset association when country changes
    }));
    setAssociationFilter(''); // Reset the filter when country changes
  };

  // Remove the first handleInputChange function and keep only this one
  // that handles both input and select elements
  // Modificar a função handleInputChange para limpar o filtro quando uma associação é selecionada
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value 
    }));
    
    // Limpar o filtro quando uma associação é selecionada
    if (name === 'association' && value) {
      setAssociationFilter('');
      setShowAssociationDropdown(false);
    }
  };
  

  // Update the handleSubmit function to check email before submission
  // Update the handleSubmit function to validate association
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    
    // Check if country is selected and not "Outros" but association is empty
    if (formData.country && formData.country !== "Outros" && !formData.association) {
      setSubmitError('Por favor, selecione uma associação.');
      setShowErrorPopup(true);
      return;
    }
    
    setLoading(true);

    try {
  
      const result = await sendWebhookWithRetry(formData);
      
      // In handleSubmit, update the form reset
      if (result.success) {
      // Show success popup
      setShowSuccessPopup(true);
      
      // Reset form on success
      setFormData({
        name: '',
        phone: '',
        countryCode: '+55',
        email: '',
        password: '',
        acceptEmails: false,
        referralSource: '',
        platformLanguage: 'pt',
        country: 'Brasil',
        association: ''
      });
      
        // Hide success popup after 5 seconds
        setTimeout(() => {
          setShowSuccessPopup(false);
        }, 5000);
      } else {
        setSubmitError(result.message || 'Ocorreu um erro ao enviar o formulário');
        setShowErrorPopup(true); // Show error popup
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Add useEffect to auto-hide error popup after 5 seconds
  useEffect(() => {
    if (showErrorPopup) {
      const timer = setTimeout(() => {
        setShowErrorPopup(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [showErrorPopup]);

  // Move the useEffect hook inside the component
  useEffect(() => {
    // Remove localStorage language persistence
  }, []);

  // Add this useEffect to handle clicking outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('#associationFilter') && !target.closest('.association-dropdown')) {
        setShowAssociationDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#0A0A0A] relative"
      style={{
        backgroundImage: `
          linear-gradient(to right, 
            rgba(10, 10, 10, 0.95), 
            rgba(10, 10, 10, 0.8)
          ),
          url(${backgroundImage})
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'right center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed' // This makes the background fixed when scrolling
      }}
    >
      {/* Removed the entire language selector dropdown section */}

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowSuccessPopup(false)}></div>
          <div className="bg-[#1A1A1A] rounded-lg p-6 shadow-xl max-w-md w-full relative z-10 border border-teal-500/20">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-teal-500/20 rounded-full p-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-medium text-white text-center">Formulário enviado com sucesso!</h3>
            <p className="text-gray-400 text-center mt-2">Obrigado pelo seu cadastro.</p>
          </div>
        </div>
      )}

      {/* Error Popup */}
      {showErrorPopup && submitError && (
        <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowErrorPopup(false)}></div>
          <div className="bg-[#1A1A1A] rounded-lg p-6 shadow-xl max-w-md w-full relative z-10 border border-red-500/20">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-red-500/20 rounded-full p-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-medium text-white text-center">Erro</h3>
            <p className="text-red-400 text-center mt-2">{submitError}</p>
            <div className="mt-4 flex justify-center">
              <button 
                onClick={() => setShowErrorPopup(false)}
                className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Existing header */}
      <div className="mb-8 flex items-center gap-2 mt-20 md:mt-0">
        <div className="bg-teal-500 p-2 rounded-lg">
          <Lightbulb className="h-6 w-6 text-white" />
        </div>
        <span className="text-white text-2xl font-bold">7Class</span>
      </div>

      <div className="w-full max-w-md bg-[#111111]/90 backdrop-blur-sm rounded-xl p-6 shadow-2xl">

        {submitError && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-red-500 text-sm">{submitError}</p>
          </div>
        )}

        {/* Removed the inline success message */}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-white mb-1">
              {t.name.label} <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder={t.name.placeholder}
                className="w-full bg-[#1A1A1A] text-white rounded-lg pl-10 pr-4 py-3 border border-gray-800 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                required
              />
            </div>
          </div>

          {/* Campo de telefone com código de país */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-white mb-1">
              {t.phone.label} <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              <div className="relative w-24">
                <CountrySelect 
                  value={formData.countryCode}
                  onChange={(dialCode) => {
                    setFormData(prev => ({ 
                      ...prev, 
                      countryCode: dialCode,
                      phone: '' // Clear phone when country changes
                    }));
                  }}
                />
              </div>
              <div className="relative flex-1">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <InputMask
                  id="phone"
                  mask={getPhoneMask(formData.countryCode)}
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder={t.phone.placeholder}
                  className="w-full bg-[#1A1A1A] text-white rounded-lg pl-10 pr-4 py-3 border border-gray-800 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* Campo de email (vem logo após o telefone, já que o estado foi removido) */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
              {t.email.label} <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder={t.email.placeholder}
                className="w-full bg-[#1A1A1A] text-white rounded-lg pl-10 pr-4 py-3 border border-gray-800 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                required
              />
            </div>
          </div>

          {/* Campo select para fonte de referência - Atualizado com novas opções */}
          <div>
            <label htmlFor="referralSource" className="block text-sm font-medium text-white mb-1">
              {t.referralSource?.label || "Como você conheceu o 7Class?"} <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                id="referralSource"
                name="referralSource"
                value={formData.referralSource}
                onChange={handleInputChange}
                className="w-full bg-[#1A1A1A] text-white rounded-lg px-4 py-3 border border-gray-800 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 appearance-none"
                required
              >
                <option value="" disabled>{t.referralSource?.placeholder || "Selecione uma opção"}</option>
                <option value="indicacao">{t.referralSource?.options?.friend || "Indicação de um amigo(a)"}</option>
                <option value="redes_sociais">{t.referralSource?.options?.social || "Redes sociais (Instagram, Facebook, YouTube etc.)"}</option>
                <option value="whatsapp">{t.referralSource?.options?.whatsapp || "WhatsApp"}</option>
                <option value="google">{t.referralSource?.options?.google || "Google / Buscadores"}</option>
                <option value="eventos">{t.referralSource?.options?.events || "Eventos ou palestras"}</option>
                <option value="igreja">{t.referralSource?.options?.church || "Igreja local"}</option>
                <option value="email">{t.referralSource?.options?.email || "E-mail ou newsletter"}</option>
                <option value="anuncios">{t.referralSource?.options?.ads || "Propaganda online (anúncios)"}</option>
                <option value="outro">{t.referralSource?.options?.other || "Outro"}</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          {/* Campo select para idioma da plataforma - Convertido para checkboxes */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              {t.platformLanguage?.label || "Selecione o idioma da sua plataforma"} <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center">
                <input
                  id="platformLanguage-pt"
                  type="radio"
                  name="platformLanguage"
                  value="pt"
                  checked={formData.platformLanguage === "pt"}
                  onChange={handleInputChange}
                  className="w-4 h-4 bg-[#1A1A1A] border border-gray-800 rounded-full focus:ring-teal-500 focus:ring-1"
                  required
                />
                <label htmlFor="platformLanguage-pt" className="ml-3 text-white">
                  {t.platformLanguage?.options?.pt || "Português"}
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="platformLanguage-es"
                  type="radio"
                  name="platformLanguage"
                  value="es"
                  checked={formData.platformLanguage === "es"}
                  onChange={handleInputChange}
                  className="w-4 h-4 bg-[#1A1A1A] border border-gray-800 rounded-full focus:ring-teal-500 focus:ring-1"
                  required
                />
                <label htmlFor="platformLanguage-es" className="ml-3 text-white">
                  {t.platformLanguage?.options?.es || "Español"}
                </label>
              </div>
            </div>
          </div>

          {/* Campo select para país */}
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-white mb-1">
              {t.country?.label || "Selecione seu país"} <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleCountryChange}
                className="w-full bg-[#1A1A1A] text-white rounded-lg px-4 py-3 border border-gray-800 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 appearance-none"
                required
              >
                <option value="" disabled>{t.country?.placeholder || "Selecione um país"}</option>
                {Object.keys(countryAssociations).map((country) => (
                  <option key={country} value={country}>{country}</option>
                ))}
                <option value="Outros">{t.country?.options?.other || "Outros"}</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

        {/* Campo select para associação (aparece apenas quando um país é selecionado) */}
        {formData.country && formData.country !== "Outros" && (
          <div>
            <label htmlFor="association" className="block text-sm font-medium text-white mb-1">
              {t.association?.label || "Selecione sua associação"} <span className="text-red-500">*</span>
            </label>
        
            {/* Implementação simplificada com dropdown personalizado */}
            <div className="relative">
              <div 
                className="w-full bg-[#1A1A1A] text-white rounded-lg px-4 py-3 border border-gray-800 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 cursor-pointer flex justify-between items-center"
                onClick={() => setShowAssociationDropdown(!showAssociationDropdown)}
              >
                <span className="truncate">
                  {formData.association || (t.association?.placeholder || "Selecione uma associação")}
                </span>
                <svg className="h-5 w-5 text-gray-400 flex-shrink-0 ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
        
              {showAssociationDropdown && (
                <div className="absolute z-10 w-full mt-1 bg-[#1A1A1A] border border-gray-800 rounded-lg max-h-60 overflow-y-auto association-dropdown">
                  <div className="sticky top-0 bg-[#1A1A1A] p-2 border-b border-gray-800">
                    <input
                      type="text"
                      id="associationFilter"
                      value={associationFilter}
                      onChange={handleAssociationFilterChange}
                      placeholder={t.association?.filterPlaceholder || "Filtrar associações..."}
                      className="w-full bg-[#222222] text-white rounded-lg px-3 py-2 border border-gray-700 focus:border-teal-500 focus:outline-none"
                      autoFocus
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
        
                  <div>
                    {countryAssociations[formData.country as keyof typeof countryAssociations]
                      ?.filter(association => 
                        !associationFilter || association.toLowerCase().includes(associationFilter.toLowerCase())
                      )
                      .map((association) => (
                        <div 
                          key={association} 
                          className={`px-4 py-2 cursor-pointer hover:bg-gray-800 text-white ${
                            formData.association === association ? 'bg-teal-500/20 border-l-2 border-teal-500' : ''
                          }`}
                          onClick={() => {
                            setFormData({
                              ...formData,
                              association: association
                            });
                            setAssociationFilter('');
                            setShowAssociationDropdown(false);
                          }}
                        >
                          {association}
                        </div>
                      ))}
                  </div>
                </div>
              )}
        
              {/* Campo oculto para manter a validação do formulário */}
              <input
                type="hidden"
                name="association"
                value={formData.association}
                required
              />
            </div>
          </div>
        )}


          {/* Checkbox para aceitar emails */}
          <div className="mt-4">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="acceptEmails"
                  name="acceptEmails"
                  type="checkbox"
                  checked={formData.acceptEmails}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-teal-500 border-gray-700 rounded focus:ring-teal-500 bg-[#1A1A1A]"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="acceptEmails" className="text-gray-300">
                  {t.acceptEmails} 
                </label>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white mb-1">
              {t.password.label} <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder={t.password.placeholder}
                className="w-full bg-[#1A1A1A] text-white rounded-lg pl-10 pr-12 py-3 border border-gray-800 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-teal-500 text-white font-medium rounded-lg py-3 transition-all duration-200 ${
              loading 
                ? 'opacity-75 cursor-not-allowed' 
                : 'hover:bg-teal-600'
            }`}
          >
            {loading ? 'Enviando...' : t.submit}
          </button>

          <a
            href="https://www.7class.app/login/01hrf18gpwq6mx2s4qp3bn2hk7"
            className="block w-full bg-[#1A1A1A] text-teal-500 hover:bg-teal-500/10 font-medium rounded-lg py-3 transition-colors duration-200 text-center"
          >
            {t.loginLink}
          </a>
        </form>

        <p className="text-center text-gray-500 text-sm mt-6">
          {t.dataProtection}
        </p>
      </div>
    </div>
  );
}

export default App;
