import React from "react";

const InfoSection = () => {
  return (
    <div className="bg-black">
      <div className="container py-10 flex md:flex-row flex-col gap-18 max-md:gap-8 max-md:items-center justify-center">
        <div className="flex flex-row gap-2 items-center">
          <img className="w-[20px]" src="/images/truck.svg" alt="" />
          <h1 className="text-[18px] text-white">
            Kostenloser Versand ab 500CHF
          </h1>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <img className="w-[20px]" src="/images/globe.svg" alt="" />
          <h1 className="text-[18px] text-white">Weltweiter Versand</h1>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <img className="w-[20px]" src="/images/box.svg" alt="" />
          <h1 className="text-[18px] text-white">Kostenlose Rücksendungen</h1>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <img className="w-[20px]" src="/images/door.svg" alt="" />
          <h1 className="text-[18px] text-white">5 Jahre Garantie</h1>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
