import React from "react";
import SingleProduct from "../components/shop/SingleProduct";
import ProductInfo from "../components/shop/ProductInfo";
import Modern from "../components/repeats/Modern";

const ProductCheckout = () => {
  const details = {
    title:
      "Aluminium-Fronttür 30402D – Elegantes Design, Langanhaltende Sicherheit",
    description: [
      "Die Aluminium-Fronttür 30402D vereint modernes Design mit robuster Sicherheit.",
      "Optional mit ein- oder doppelseitigen Lichtern erhältlich, um natürliches Licht zu erhöhen.",
      "Hitzebeständig und geeignet für dunkle Farbanstriche.",
    ],
    specs: [
      { label: "Artikelnummer", value: "2.51.594" },
      { label: "Marke", value: "Deutsch" },
      { label: "Material", value: "Fiberglas" },
      { label: "Türsystem", value: "Schwenk" },
      { label: "Anwendung", value: "Außen, Französisch" },
      { label: "Glasstruktur", value: "Klar" },
      { label: "Türglasart", value: "Doppelverglast, Flächenverglast" },
    ],
  };

  return (
    <div>
      <SingleProduct />
      <div className="container mx-auto px-4 py-8">
        <ProductInfo
          details={details}
          questions={<p>Stellen Sie eine Frage zu diesem Produkt.</p>}
          reviews={<p>Seien Sie der Erste, der dieses Produkt bewertet.</p>}
          // shipping={
          //   <ul className="list-disc pl-5">
          //     <li>Lieferzeit: 3-5 Werktage</li>
          //     <li>Versand ab Lager Zürich</li>
          //   </ul>
          // }
          // returns={
          //   <p>Rückgabe innerhalb von 14 Tagen in Originalverpackung.</p>
          // }
        />
      </div>
      <Modern />
    </div>
  );
};

export default ProductCheckout;
