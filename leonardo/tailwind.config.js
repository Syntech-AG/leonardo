module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    extend: {
      colors: {
        ink: "#111827",
        muted: "#9CA3AF",
        border: "#EAECEF",
        chipGreenBg: "#E8F7EC",
        chipGreenText: "#177245",
        chipRedBg: "#FDECEC",
        chipRedText: "#D32F2F",
        btnGold: "#F6B100",
        btnGoldHover: "#F3A500",
        btnDisabledBg: "#F2F2F2",
        btnDisabledText: "#B3B3B3",
        tableBg: "#FFFFFF",
      },
      boxShadow: {
        card: "0 1px 0 rgba(0,0,0,.02), 0 8px 24px rgba(15,23,42,.06)",
      },
      borderRadius: {
        mdx: "10px",
      },
      spacing: {
        4.5: "18px",
      },
      fontSize: {
        tiny: ["12px", "16px"],
      },
    },
  },
  plugins: [],
};
