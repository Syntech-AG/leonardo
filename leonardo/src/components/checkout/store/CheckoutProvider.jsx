import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";

const CheckoutCtx = createContext(null);

const load = () => {
  try {
    const raw = sessionStorage.getItem("checkout");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const initial = load() || {
  cart: {
    items: [
      // Example item; replace with real cart injection
      {
        id: "door-30402D",
        name: "Aluminium-Fronttür 30402D",
        price: 235.41,
        qty: 1,
        image: "",
        options: { variant: '78" x 30" Kolonial (44mm)', color: "#2F2F2F" },
      },
    ],
  },
  customer: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    zip: "",
    country: "Schweiz",
  },
  shipping: {
    methodId: "dhl",
    label: "DHL Express",
    cost: 0,
    eta: "20. Juli – 03. August",
  },
  payment: { method: "card", token: null, brand: null, last4: null },
  meta: {
    step: 0,
    currency: "CHF",
    totals: { subtotal: 0, discount: 0, shipping: 0, tax: 0, grand: 0 },
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_STEP":
      return { ...state, meta: { ...state.meta, step: action.step } };
    case "SET_CART":
      return { ...state, cart: { ...state.cart, ...action.payload } };
    case "SET_CUSTOMER":
      return { ...state, customer: { ...state.customer, ...action.payload } };
    case "SET_SHIPPING":
      return { ...state, shipping: { ...state.shipping, ...action.payload } };
    case "SET_PAYMENT":
      return { ...state, payment: { ...state.payment, ...action.payload } };
    case "RECALC_TOTALS":
      return { ...state, meta: { ...state.meta, totals: action.totals } };
    case "RESET":
      return initial;
    default:
      return state;
  }
}

export function CheckoutProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initial);

  // Derived totals
  const totals = useMemo(() => {
    const subtotal = state.cart.items.reduce(
      (s, it) => s + it.price * it.qty,
      0
    );
    const discount = 0; // plug rules
    const shipping = state.shipping?.cost || 0;
    const tax = 0; // plug tax if needed
    const grand = Math.max(0, subtotal - discount + shipping + tax);
    return { subtotal, discount, shipping, tax, grand };
  }, [state.cart.items, state.shipping?.cost]);

  useEffect(() => {
    dispatch({ type: "RECALC_TOTALS", totals });
  }, [totals]);

  useEffect(() => {
    try {
      sessionStorage.setItem("checkout", JSON.stringify(state));
    } catch {}
  }, [state]);

  const value = useMemo(() => ({ state, dispatch }), [state]);
  return <CheckoutCtx.Provider value={value}>{children}</CheckoutCtx.Provider>;
}

export const useCheckout = () => {
  const ctx = useContext(CheckoutCtx);
  if (!ctx) throw new Error("useCheckout must be used within CheckoutProvider");
  return ctx;
};
