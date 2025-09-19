import React, { useMemo, useState, useEffect } from "react";
import { useDoors } from "../../js-components/useDoors";
import FilterSidebar from "../../mini-components/FilterSidebar";
import Pagination from "../../mini-components/Pagination";
import { Link, useSearchParams } from "react-router-dom";

const arrParam = (v) => (v ? v.split(",").filter(Boolean) : []);
const rangeParam = (v, fallback) => {
  const p = v?.split("-").map(Number);
  return p && p.length === 2 && !isNaN(p[0]) && !isNaN(p[1])
    ? [p[0], p[1]]
    : fallback;
};

export default function DoorCatalog() {
  const { doors, error } = useDoors();
  const [search, setSearch] = useSearchParams();
  const ITEMS_PER_PAGE = 9;

  const [category, setCategory] = useState(() =>
    arrParam(search.get("category"))
  );
  const [material, setMaterial] = useState(() =>
    arrParam(search.get("material"))
  );
  const [color, setColor] = useState(() => arrParam(search.get("color")));
  const [glazing, setGlazing] = useState(() => arrParam(search.get("glazing")));
  const [style, setStyle] = useState(() => arrParam(search.get("style")));
  const [brand, setBrand] = useState(() => arrParam(search.get("brand")));
  const [price, setPrice] = useState(() =>
    rangeParam(search.get("price"), null)
  );
  const [height, setHeight] = useState(() =>
    rangeParam(search.get("height"), null)
  );
  const [width, setWidth] = useState(() =>
    rangeParam(search.get("width"), null)
  );

  const [currentPage, setCurrentPage] = useState(() => {
    const page = parseInt(search.get("page"), 10);
    return isNaN(page) || page < 1 ? 1 : page;
  });

  useEffect(() => {
    const params = new URLSearchParams();
    if (category.length) params.set("category", category.join(","));
    if (material.length) params.set("material", material.join(","));
    if (color.length) params.set("color", color.join(","));
    if (glazing.length) params.set("glazing", glazing.join(","));
    if (style.length) params.set("style", style.join(","));
    if (brand.length) params.set("brand", brand.join(","));
    if (price) params.set("price", price.join("-"));
    if (height) params.set("height", height.join("-"));
    if (width) params.set("width", width.join("-"));
    if (currentPage > 1) params.set("page", currentPage);
    setSearch(params, { replace: true });
  }, [
    category,
    material,
    color,
    glazing,
    style,
    brand,
    price,
    height,
    width,
    currentPage,
    setSearch,
  ]);

  useEffect(() => {
    setCurrentPage(1);
  }, [category, material, color, glazing, style, brand, price, height, width]);

  const filteredDoors = useMemo(() => {
    if (!doors) return [];
    const prices = doors.map((d) => d.price).filter((p) => p != null);
    const priceRange = prices.length
      ? [Math.min(...prices), Math.max(...prices)]
      : [0, 99999];
    const [minPrice, maxPrice] = price || priceRange;

    return doors.filter((d) => {
      const catOK = !category.length || category.includes(d.category);
      const matOK = !material.length || material.includes(d.material);
      const colorOK = !color.length || color.includes(d.color);
      const glazeOK = !glazing.length || glazing.includes(d.glazing);
      const styleOK = !style.length || style.includes(d.style);
      const brandOK = !brand.length || brand.includes(d.brand);
      const priceOK = d.price >= minPrice && d.price <= maxPrice;
      const heightOK =
        !height || (d.height >= height[0] && d.height <= height[1]);
      const widthOK = !width || (d.width >= width && d.width <= width[1]);
      return (
        catOK &&
        matOK &&
        colorOK &&
        glazeOK &&
        styleOK &&
        brandOK &&
        priceOK &&
        heightOK &&
        widthOK
      );
    });
  }, [
    doors,
    category,
    material,
    color,
    glazing,
    style,
    brand,
    price,
    height,
    width,
  ]);

  const pagedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredDoors.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [currentPage, filteredDoors]);

  if (error) return <p className="text-red-600">Fehler: {error.message}</p>;
  if (!doors) return <p className="animate-pulse">Lade Türen ...</p>;

  const sidebarProps = {
    allDoors: doors,
    category,
    setCategory,
    material,
    setMaterial,
    color,
    setColor,
    glazing,
    setGlazing,
    style,
    setStyle,
    brand,
    setBrand,
    price,
    setPrice,
    height,
    setHeight,
    width,
    setWidth,
  };

  return (
    <section className="flex flex-col sm:flex-row md:py-15 py-8">
      <div className="sm:hidden flex justify-end p-4">
        <details className="w-full">
          <summary className="cursor-pointer bg-gray-100 px-3 py-2 rounded-md text-sm font-medium">
            Filter
          </summary>
          <FilterSidebar {...sidebarProps} />
        </details>
      </div>
      <div className="hidden sm:block">
        <FilterSidebar {...sidebarProps} />
      </div>

      <div className="flex-1 pl-4 sm:pl-8">
        <h2 className="font-bold text-xl mb-6">
          {filteredDoors.length} Ergebnis
          {filteredDoors.length === 1 ? "" : "se"} für{" "}
          <span className="text-yellow-600">Türen</span>
        </h2>
        {filteredDoors.length === 0 ? (
          <p className="text-gray-500">
            Keine Türen passen zu den gewählten Filtern.
          </p>
        ) : (
          <>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {pagedItems.map((door) => (
                <Link
                  key={door.id}
                  to="/checkout"
                  className="rounded-lg overflow-hidden hover:shadow-lg transition-shadow bg-white flex flex-col items-center"
                >
                  <div className="bg-[#EBEBE9] w-full flex justify-center items-center py-10 rounded-lg">
                    <img
                      src={door.images[0]}
                      alt={door.name}
                      className="object-contain w-fit h-auto"
                    />
                  </div>
                  <div className="p-4 flex flex-col items-center">
                    <h3 className="font-medium line-clamp-2">{door.name}</h3>
                    <p className="mt-2 font-bold">
                      CHF {door.price.toFixed(2)}
                    </p>
                  </div>
                </Link>
              ))}
            </ul>
            <Pagination
              currentPage={currentPage}
              totalItems={filteredDoors.length}
              itemsPerPage={ITEMS_PER_PAGE}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>
    </section>
  );
}
