import { useEffect, useState } from "react";
import countries from "country-data";

interface PhoneNumber {
  id: string;
  country: string;
  code: string;
  prefix: string;
}

export function usePhoneNumberData(): PhoneNumber[] | null {
  const [phoneNumbersData, setPhoneNumbersData] = useState<
    PhoneNumber[] | null
  >(null);

  useEffect(() => {
    const countryCodeToPhoneNumber = Object.keys(countries.countries).map(
      (countryCode: string) => countries.countries[countryCode]
    );
    console.log(countryCodeToPhoneNumber);
    const phoneNumbersData = countryCodeToPhoneNumber
      .filter((country: any) => country.countryCallingCodes)
      .map((country: any) => ({
        id: country.alpha2,
        country: country.name,
        code: country.alpha2,
        prefix: `${country.countryCallingCodes}`,
      }));

    setPhoneNumbersData(phoneNumbersData);
    console.log(phoneNumbersData);
  }, []);

  return phoneNumbersData;
}
