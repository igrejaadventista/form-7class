import React from 'react';

interface CountryFlag {
  code: string;
  name: string;
  dialCode: string;
}

// This is a sample of countries with their codes and dial codes
const countries: CountryFlag[] = [
  { code: 'AF', name: 'Afghanistan', dialCode: '+93' },
  { code: 'AL', name: 'Albania', dialCode: '+355' },
  { code: 'DZ', name: 'Algeria', dialCode: '+213' },
  { code: 'AD', name: 'Andorra', dialCode: '+376' },
  { code: 'AR', name: 'Argentina', dialCode: '+54' },
  { code: 'BR', name: 'Brazil', dialCode: '+55' },
  { code: 'CL', name: 'Chile', dialCode: '+56' },
  { code: 'EC', name: 'Ecuador', dialCode: '+593' },
  { code: 'PY', name: 'Paraguay', dialCode: '+595' },
  { code: 'PE', name: 'Peru', dialCode: '+51' },
  { code: 'UY', name: 'Uruguay', dialCode: '+598' },
  // Add more countries as needed
];

interface CountrySelectProps {
  value: string;
  onChange: (dialCode: string) => void;
}

const CountrySelect: React.FC<CountrySelectProps> = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedCountry, setSelectedCountry] = React.useState<CountryFlag | null>(
    countries.find(country => country.dialCode === value) || countries.find(country => country.code === 'BR') || null
  );

  const handleSelect = (country: CountryFlag) => {
    setSelectedCountry(country);
    onChange(country.dialCode);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div 
        className="flex items-center gap-2 bg-[#1A1A1A] text-white rounded-lg px-3 py-3 border border-gray-800 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedCountry && (
          <>
            <span className="flag-icon">{getFlagEmoji(selectedCountry.code)}</span>
            <span>{selectedCountry.dialCode}</span>
          </>
        )}
      </div>
      
      {isOpen && (
        <div className="absolute z-20 mt-1 w-64 max-h-60 overflow-y-auto bg-[#1A1A1A] border border-gray-800 rounded-lg">
          {countries.map(country => (
            <div 
              key={country.code}
              className="flex items-center gap-3 px-4 py-2 hover:bg-gray-800 cursor-pointer"
              onClick={() => handleSelect(country)}
            >
              <span className="flag-icon">{getFlagEmoji(country.code)}</span>
              <span className="text-white">{country.name}</span>
              <span className="text-gray-400 ml-auto">{country.dialCode}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Function to convert country code to flag emoji
function getFlagEmoji(countryCode: string) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

export default CountrySelect;