import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
  }, [isMenuOpen]);

  const navItems = [
    {
      id: 1,
      name: "Home",
      path: "/",
    },
    {
      id: 2,
      name: "Shop",
      path: "/shop",
    },
    {
      id: 3,
      name: "Product View",
      path: "/checkout",
    },
    {
      id: 4,
      name: "Checkout",
      path: "/checkout2",
    },
    // {
    //   id: 5,
    //   name: "About Us",
    //   path: "/aboutus",
    // },
    // {
    //   id: 6,
    //   name: "References",
    //   path: "/references",
    // },
    {
      id: 7,
      name: "Gallery",
      path: "/gallery",
    },
  ];

  return (
    <header>
      <div className="bg-[#F7F7F7]">
        <div className="container flex justify-between max-md:justify-center py-4">
          <div className="flex items-center gap-2">
            <img
              className="w-[15px]"
              src="/images/location.svg"
              alt="Location"
            />
            <p className="text-[#666666] text-[12px]">
              Store Location: Centralstrasse&nbsp;14&nbsp;6410&nbsp;Goldau
            </p>
          </div>

          <div className="hidden sm:flex gap-4">
            <div className="flex items-center gap-1">
              <p className="text-[#666666] text-[12px]">Eng</p>
              <img src="/images/arrowDown.svg" alt="Language" />
            </div>
            <div className="flex items-center gap-1">
              <p className="text-[#666666] text-[12px]">USD</p>
              <img src="/images/arrowDown.svg" alt="Currency" />
            </div>
            <div className="flex gap-2">
              <p className="text-[#666666] text-[12px]">Register</p>
              <p className="text-[#666666] text-[12px]">/</p>
              <p className="text-[#666666] text-[12px]">Log&nbsp;in</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container flex items-center justify-between py-4">
        <nav className="hidden md:block">
          <div className="flex gap-5">
            {navItems.map((item) => (
              <Link
                to={item.path}
                key={item.id}
                className="text-[14px] font-[500] text-[#808080]"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </nav>

        <img src="/images/logo.svg" alt="Logo" className="h-8" />

        <div className="hidden md:flex gap-3">
          <img className="w-[22px]" src="/images/search.svg" alt="Search" />
          <img className="w-[22px]" src="/images/heart.svg" alt="Wishlist" />
          <img className="w-[26px]" src="/images/cart.svg" alt="Cart" />
        </div>

        <button
          aria-label="Open menu"
          onClick={() => setIsMenuOpen(true)}
          className="md:hidden p-2"
        >
          <svg
            width="24"
            height="24"
            stroke="#000"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          >
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>
      </div>

      <div
        onClick={() => setIsMenuOpen(false)}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 
          ${isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      />

      <div
        className={`fixed inset-y-0 right-0 z-50 w-full bg-white overflow-y-auto
          transform transition-transform duration-300
          ${
            isMenuOpen
              ? "translate-x-0"
              : "translate-x-full pointer-events-none"
          }`}
      >
        <div className="container flex items-center justify-between py-4 border-b border-gray-200">
          <img src="/images/logo.svg" alt="Logo" className="h-8" />
          <button
            aria-label="Close menu"
            onClick={() => setIsMenuOpen(false)}
            className="p-2"
          >
            <svg
              width="24"
              height="24"
              stroke="#000"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            >
              <path d="M6 6l12 12M6 18L18 6" />
            </svg>
          </button>
        </div>

        <nav className="mt-6">
          <ul className="flex flex-col items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className="text-[18px] font-semibold text-[#808080]"
              >
                {item.name}
              </Link>
            ))}
          </ul>
        </nav>

        <div className="mt-8 flex justify-center gap-6">
          <img className="w-[22px]" src="/images/search.svg" alt="Search" />
          <img className="w-[22px]" src="/images/heart.svg" alt="Wishlist" />
          <img className="w-[26px]" src="/images/cart.svg" alt="Cart" />
        </div>

        <div className="mt-10 mb-8 flex flex-col items-center gap-4 text-[12px] text-[#666666]">
          <button className="flex items-center gap-1">
            <span>Eng</span>
            <img src="/images/arrowDown.svg" alt="" />
          </button>
          <button className="flex items-center gap-1">
            <span>USD</span>
            <img src="/images/arrowDown.svg" alt="" />
          </button>
          <div className="flex gap-2">
            <span>Register</span>
            <span>/</span>
            <span>Log&nbsp;in</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
