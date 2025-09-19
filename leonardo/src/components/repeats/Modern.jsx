import React, { useEffect, useRef, useState } from "react";

const Modern = () => {
  const containerRef = useRef(null);
  const [imageHeight, setImageHeight] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      const height = containerRef.current.offsetHeight;
      const newHeight = height * 1.15;
      setImageHeight(newHeight);
    }
  }, []);

  return (
    <div className="relative lg:my-25 my-15">
      <div className="container myHeight flex lg:items-center max-md:items-center max-md:text-center max-lg:flex-col-reverse">
        <div
          ref={containerRef}
          className="flex flex-col gap-6 my-auto bg-white lg:p-7 2xl:w-[30%] w-[40%] max-lg:w-[100%] relative rounded-lg max-md:mt-10 max-md:text-start"
        >
          <img
            className="absolute -right-10 translate-y-[-50%] top-1/2 w-full object-cover rounded-lg max-lg:hidden"
            style={{ height: imageHeight ? `${imageHeight}px` : "auto" }}
            src="/images/transparentBg.svg"
            alt=""
          />
          <h1 className="lg:text-[30px] text-[25px] text-black font-medium leading-[1.05] rounded-lg z-10 leading-[1.6]">
            MODERNE LINIEN - Massgeschneidert
          </h1>
          <p className="lg:text-[16px] text-[14px] text-black z-10 leading-[1.8]">
            Massgeschneidertes Design trifft auf zeitgenössischen Stil.
            Entdecken Sie eine kuratierte Auswahl an schlanken, flachen
            Innentüren, die jetzt nach Ihren genauen Massen angefertigt werden.
            Klare Linien, minimalistisches Design und präzise Handwerkskunst
            vereinen sich für eine zeitlose Passform in jedem modernen Zuhause.
          </p>
          <button className="w-fit text-[14px] bg-black rounded-lg px-10 py-3 text-white z-10">
            Massanfertigung
          </button>
        </div>

        <img
          className="absolute max-lg:relative right-0 top-0 xl:w-[80%] w-[75%] max-lg:w-full h-full -z-1"
          src="/images/modernDoor.png"
          alt=""
        />
      </div>
    </div>
  );
};

export default Modern;
