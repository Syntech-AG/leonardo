import React from "react";

const Footer = () => {
  return (
    <div className="bg-black md:pt-25 pt-14 pb-8">
      <div className="container">
        <div className="flex lg:flex-row flex-col md:justify-between">
          <div className="flex flex-col lg:items-start items-center max-lg:text-center max-xl:mb-10">
            <h1 className="text-[#FECC17] lg:text-[30px] text-[24px] font-medium">
              KOMMEN SIE ZU UNS
            </h1>
            <h1 className="lg:text-[80px] text-[56px] font-regular leading-[1.5] max-xl:leading-[1.3] text-white">
              Wir sind für <br /> Sie da
            </h1>
            <p className="text-white lg:text-[18px] text-[16px] border-b border-b-[#FECC17] w-fit">
              Jetzt kontaktieren
            </p>
          </div>
          <div className="flex flex-col md:gap-20 gap-12">
            <div className="flex lg:flex-row max-lg:flex-col gap-12">
              <div className="flex flex-col max-lg:items-center gap-6 max-xl:text-center">
                <div>
                  <h1 className="text-[#C5C5C5] md:text-[20px] text-[18px] font-regular">
                    Telefon
                  </h1>
                  <p className="text-white md:text-[16px] text-[14px] mt-2">
                    041 855 06 56
                  </p>
                </div>
                <div>
                  <h1 className="text-[#C5C5C5] md:text-[20px] text-[18px] font-regular">
                    E-Mail
                  </h1>
                  <p className="text-white md:text-[16px] text-[14px] mt-2">
                    info@leonard-tueren.ch
                  </p>
                </div>
                <div>
                  <h1 className="text-[#C5C5C5] md:text-[20px] text-[18px] font-regular">
                    Adresse
                  </h1>
                  <p className="text-white md:text-[16px] text-[14px] mt-2">
                    Leonard Türen GmbH <br />
                    Centralstrasse 14 6410 Goldau
                  </p>
                </div>
              </div>
              <img
                className="max-xl:w-[40%] max-md:w-[60%] max-xl:mx-auto"
                src="/images/footerIcon.svg"
                alt=""
              />
            </div>
            <div className="flex xl:flex-row flex-col max-lg:items-center">
              <p className="p-10 max-xl:min-w-[204px] max-md:min-w-[194px] max-xl:justify-center flex items-center border lg:border-b-transparent border-white text-white md:text-[20px] text-[18px]">
                Aussentüren
              </p>
              <p className="p-10 max-xl:min-w-[204px] max-md:min-w-[194px] max-xl:justify-center flex items-center border lg:border-b-transparent border-white text-white md:text-[20px] text-[18px]">
                Innentüren
              </p>
              <p className="p-10 max-xl:min-w-[204px] max-md:min-w-[194px] max-xl:justify-center flex items-center border lg:border-b-transparent border-white text-white md:text-[20px] text-[18px]">
                Rahmen
              </p>
              <p className="xl:p-10 max-xl:min-w-[204px] max-md:min-w-[194px] flex items-center p-2 border lg:border-b-transparent border-white text-white md:text-[20px] text-[18px] min-w-[50px]">
                <img
                  className="w-[44px] max-xl:mx-auto"
                  src="/images/upArrow.svg"
                  alt=""
                />
              </p>
            </div>
          </div>
        </div>
        <div className="flex lg:flex-row justify-between flex-col max-lg:items-center border-t border-t-white pt-12">
          <h1 className="text-white text-[14px]">
            © 2025 Entworfen von Syntech Solutions AG
          </h1>
          <h1 className="text-white text-[14px]">
            Allgemeine Geschäftsbedingungen
          </h1>
          <h1 className="text-white text-[14px]">Datenschutzrichtlinie</h1>
          <h1 className="text-white text-[14px]">Cookies</h1>
          <div className="flex flex-row gap-2">
            <img src="/images/linkedin.svg" alt="" />
            <img src="/images/Facebook.svg" alt="" />
            <img src="/images/Twitter.svg" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
