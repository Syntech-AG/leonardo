import React from "react";
import DoorCatalog from "../components/shop/DoorCatalog";
import Modern from "../components/repeats/Modern";
import ProductPage from "../components/shop/SingleProduct";

const Products = () => {
  return (
    <div className="container">
      <DoorCatalog />
      <Modern />
    </div>
  );
};

export default Products;
