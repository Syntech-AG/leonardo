import React, { useState, useEffect } from "react";
import ProductCard from "../../mini-components/ProductCard";

const mockProducts = [
  {
    id: 1,
    name: "Innentür Eiche Premium",
    price: "CHF 1477.80",
    rating: 5,
    imageUrl: "/images/door5.png",
    category: "Innentüren",
  },
  {
    id: 2,
    name: "Innentür Eiche Premium",
    price: "CHF 1477.80",
    rating: 5,
    imageUrl: "/images/door2.png",
    category: "Innentüren",
    discount: "15% RABATT",
  },
  {
    id: 3,
    name: "Innentür Grigio Premium",
    price: "CHF 1477.80",
    rating: 5,
    imageUrl: "/images/door6.png",
    category: "Innentüren",
  },
  {
    id: 4,
    name: "Innentür Massivholz",
    price: "CHF 1477.80",
    rating: 4,
    imageUrl: "/images/door4.png",
    category: "Innentüren",
  },
  {
    id: 5,
    name: "Aluminium-Haustür",
    price: "CHF 1477.80",
    rating: 5,
    imageUrl: "/images/door5.png",
    category: "Aussentüren",
    discount: "15% RABATT",
  },
  {
    id: 6,
    name: "Aluminium-Haustür",
    price: "CHF 1477.80",
    rating: 5,
    imageUrl: "/images/door2.png",
    category: "Aussentüren",
  },
  {
    id: 7,
    name: "Aluminium-Haustür",
    price: "CHF 1477.80",
    rating: 5,
    imageUrl: "/images/door6.png",
    category: "Aussentüren",
  },
  {
    id: 8,
    name: "Aluminium-Haustür",
    price: "CHF 1477.80",
    rating: 5,
    imageUrl: "/images/door4.png",
    category: "Aussentüren",
    discount: "15% RABATT",
  },
];

const filterCategories = ["Alle", "Innentüren", "Aussentüren", "Rahmentüren"];

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeFilter, setActiveFilter] = useState("Alle");

  useEffect(() => {
    setProducts(mockProducts);
    setFilteredProducts(mockProducts);
  }, []);

  const handleFilter = (category) => {
    setActiveFilter(category);
    if (category === "Alle") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((p) => p.category === category);
      setFilteredProducts(filtered);
    }
  };

  return (
    <div className="container mx-auto px-4 md:py-35 py-15">
      <div className="flex flex-row justify-between max-md:flex-col ">
        <h2 className="text-3xl font-bold mb-6 max-md:text-center">
          Unsere Produkte
        </h2>

        <div className="flex items-center justify-center gap-4 mb-8 max-md:flex-col">
          {filterCategories.map((category) => (
            <button
              key={category}
              onClick={() => handleFilter(category)}
              className={`px-6 py-2 rounded-lg text-sm font-medium hover:border hover:border-black transition-colors ${
                activeFilter === category ? "border border-black" : ""
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 gap-y-12">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="text-center mt-12">
        <button className="px-8 py-3 rounded-lg text-black border border-gray-400 transition-colors hover:bg-black">
          Alle anzeigen
        </button>
      </div>
    </div>
  );
};

export default ProductGrid;
