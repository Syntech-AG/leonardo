import React, { useState } from "react";
import { HiStar, HiOutlineHeart, HiChevronUp } from "react-icons/hi2";
import ImageGallery from "../repeats/ImageGallery";
import QuantitySelector from "../../mini-components/QuantitySelector";
import { productData } from "../../js-components/product-data";

const formatCurrency = (amount, currency = "CHF") => {
  return new Intl.NumberFormat("de-CH", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
  }).format(amount);
};

export default function SingleProduct() {
  const [product] = useState(productData);
  const [quantities, setQuantities] = useState({});
  const [isSizeSelectorOpen, setSizeSelectorOpen] = useState(true);

  const handleQuantityChange = (variantId, newQuantity) => {
    setQuantities((prev) => ({
      ...prev,
      [variantId]: newQuantity >= 0 ? newQuantity : 0,
    }));
  };

  const totalQuantity = Object.values(quantities).reduce(
    (sum, qty) => sum + qty,
    0
  );

  const handleAddToCart = () => {
    const itemsToAdd = Object.entries(quantities)
      .filter(([, qty]) => qty > 0)
      .map(([variantId, quantity]) => ({ variantId, quantity }));

    if (itemsToAdd.length === 0) {
      alert("Please select a quantity for at least one size.");
      return;
    }

    console.log("Adding to cart:", itemsToAdd);
    alert(
      `${totalQuantity} item(s) added to cart! Check the console for details.`
    );
  };

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          <ImageGallery images={product.images} />

          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              {product.name} {product.id}
            </h1>
            <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <HiStar
                    key={i}
                    className={`h-5 w-5 ${
                      i < product.rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="ml-2">
                  {product.reviewCount} Review{product.reviewCount !== 1 && "s"}
                </span>
              </div>
              <span>•</span>
              <span>SKU: {product.sku}</span>
            </div>

            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-3xl font-bold text-gray-900">
                {formatCurrency(product.price.current, product.price.currency)}
              </span>
              <span className="text-xl font-medium text-gray-400 line-through">
                {formatCurrency(product.price.original, product.price.currency)}
              </span>
              <span className="px-2 py-0.5 text-xs font-semibold text-white bg-yellow-500 rounded-md">
                {product.price.discount}% OFF
              </span>
            </div>

            <div className="mt-6 border-t border-b border-gray-200">
              <button
                onClick={() => setSizeSelectorOpen(!isSizeSelectorOpen)}
                className="w-full flex justify-between items-center py-4 text-left"
              >
                <span className="font-semibold text-gray-800">CHOOSE SIZE</span>
                <HiChevronUp
                  className={`h-5 w-5 text-gray-500 transition-transform ${
                    isSizeSelectorOpen ? "" : "transform rotate-180"
                  }`}
                />
              </button>
              {isSizeSelectorOpen && (
                <div className="pb-4 space-y-2">
                  {product.variants.map((variant) => (
                    <div
                      key={variant.id}
                      className="grid grid-cols-3 gap-4 items-center p-2 rounded-md hover:bg-gray-50"
                    >
                      <div className="col-span-1">
                        <p className="font-medium text-sm text-gray-800">
                          {variant.size}
                        </p>
                        <p className="text-xs text-gray-500">
                          {variant.description}
                        </p>
                      </div>
                      <div className="col-span-1 text-sm text-center">
                        <p className="font-semibold">
                          {formatCurrency(variant.price)} inc. VAT
                        </p>
                        {variant.stock > 0 && variant.stock <= 5 && (
                          <p className="text-yellow-600 font-medium">
                            Low Stock
                          </p>
                        )}
                        {variant.stock === 0 && (
                          <p className="text-red-600 font-medium">
                            Out Of Stock
                          </p>
                        )}
                      </div>
                      <div className="col-span-1 flex justify-end">
                        {variant.stock > 0 ? (
                          <QuantitySelector
                            quantity={quantities[variant.id] || 0}
                            onQuantityChange={(newQty) =>
                              handleQuantityChange(variant.id, newQty)
                            }
                          />
                        ) : (
                          <button
                            disabled
                            className="w-full px-4 py-2 text-sm font-medium text-gray-500 bg-gray-200 border border-gray-300 rounded-md cursor-not-allowed"
                          >
                            Out of Stock
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-center gap-4">
              <div className="w-full sm:w-auto">
                <p className="text-lg font-bold text-center sm:text-left">
                  {totalQuantity} Item(s)
                </p>
              </div>
              <button
                onClick={handleAddToCart}
                className="w-full sm:flex-1 bg-yellow-500 text-white font-bold py-3 px-6 rounded-md hover:bg-yellow-600 transition-colors"
              >
                Add to Cart
              </button>
              <button className="p-3 text-gray-400 hover:text-red-500 transition-colors">
                <HiOutlineHeart className="h-7 w-7" />
              </button>
            </div>

            <p className="mt-4 text-sm text-gray-500">
              Delivery time including production: {product.deliveryTime}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
