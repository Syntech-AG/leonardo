import React, { useState, useMemo, useEffect } from "react";

function FilterSection({ label, open, toggle, children }) {
  return (
    <section className="border-b last:border-b-0">
      <button
        type="button"
        onClick={toggle}
        className="flex w-full items-center justify-between py-3"
      >
        <span className="font-semibold">{label}</span>
        <span className="select-none text-xl leading-none">
          {open ? "−" : "+"}
        </span>
      </button>
      {open && <div className="pb-4">{children}</div>}
    </section>
  );
}

function RangeInputFilter({ value, onChange, min, max, unit = "" }) {
  const sanitizePair = (p) => {
    let [a, b] = Array.isArray(p) ? p : [min, max];
    a = Number.isFinite(+a) ? +a : min;
    b = Number.isFinite(+b) ? +b : max;
    a = Math.max(min, Math.min(a, max));
    b = Math.max(min, Math.min(b, max));
    if (a > b) [a, b] = [b, a];
    return [a, b];
  };

  const [appliedMin, appliedMax] = sanitizePair(value);
  const [minInput, setMinInput] = useState(String(appliedMin));
  const [maxInput, setMaxInput] = useState(String(appliedMax));

  useEffect(() => {
    const [p0, p1] = sanitizePair(value);
    setMinInput(String(p0));
    setMaxInput(String(p1));
  }, [value, min, max]);

  const handleApply = () => {
    const newMin = parseFloat(minInput) || min;
    const newMax = parseFloat(maxInput) || max;
    const [finalMin, finalMax] = sanitizePair([newMin, newMax]);
    if (finalMin !== appliedMin || finalMax !== appliedMax) {
      onChange([finalMin, finalMax]);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="flex-1">
          <label className="mb-1 block text-[11px] text-gray-500">
            Min ({unit})
          </label>
          <input
            type="number"
            min={min}
            max={max}
            value={minInput}
            onChange={(e) => setMinInput(e.target.value)}
            onBlur={handleApply}
            className="w-full rounded border px-2 py-1 text-sm"
            placeholder={String(min)}
          />
        </div>
        <div className="flex-1">
          <label className="mb-1 block text-[11px] text-gray-500">
            Max ({unit})
          </label>
          <input
            type="number"
            min={min}
            max={max}
            value={maxInput}
            onChange={(e) => setMaxInput(e.target.value)}
            onBlur={handleApply}
            className="w-full rounded border px-2 py-1 text-sm"
            placeholder={String(max)}
          />
        </div>
      </div>
      <div className="flex items-center gap-2 text-[11px]">
        <span className="rounded bg-gray-100 px-2 py-1">
          {appliedMin} - {appliedMax} {unit}
        </span>
      </div>
    </div>
  );
}

export default function FilterSidebar({
  allDoors,
  category = [],
  setCategory = () => {},
  color = [],
  setColor = () => {},
  glazing = [],
  setGlazing = () => {},
  material = [],
  setMaterial = () => {},
  style = [],
  setStyle = () => {},
  brand = [],
  setBrand = () => {},
  price,
  setPrice = () => {},
  height,
  setHeight = () => {},
  width,
  setWidth = () => {},
}) {
  const {
    categoryCounts,
    materialCounts,
    colorCounts,
    glazingCounts,
    styleCounts,
    brandCounts,
    heightRange,
    widthRange,
    priceRange,
  } = useMemo(() => {
    const data = {
      category: {},
      material: {},
      color: {},
      glazing: {},
      style: {},
      brand: {},
      heights: [],
      widths: [],
      prices: [],
    };
    allDoors.forEach((d) => {
      if (d.category)
        data.category[d.category] = (data.category[d.category] || 0) + 1;
      if (d.material)
        data.material[d.material] = (data.material[d.material] || 0) + 1;
      if (d.color) data.color[d.color] = (data.color[d.color] || 0) + 1;
      if (d.glazing)
        data.glazing[d.glazing] = (data.glazing[d.glazing] || 0) + 1;
      if (d.style) data.style[d.style] = (data.style[d.style] || 0) + 1;
      if (d.brand) data.brand[d.brand] = (data.brand[d.brand] || 0) + 1;
      if (d.height) data.heights.push(d.height);
      if (d.width) data.widths.push(d.width);
      if (d.price) data.prices.push(d.price);
    });
    const getRange = (arr, fallback) =>
      arr.length ? [Math.min(...arr), Math.max(...arr)] : fallback;
    return {
      categoryCounts: data.category,
      materialCounts: data.material,
      colorCounts: data.color,
      glazingCounts: data.glazing,
      styleCounts: data.style,
      brandCounts: data.brand,
      heightRange: getRange(data.heights, [1800, 2200]),
      widthRange: getRange(data.widths, [700, 1200]),
      priceRange: getRange(data.prices, [0, 10000]),
    };
  }, [allDoors]);

  const categories = Object.keys(categoryCounts).sort();
  const materials = Object.keys(materialCounts).sort();
  const colors = Object.keys(colorCounts).sort();
  const glazings = Object.keys(glazingCounts).sort();
  const styles = Object.keys(styleCounts).sort();
  const brands = Object.keys(brandCounts).sort();

  const [open, setOpen] = useState({
    cat: true,
    color: true,
    glazing: true,
    mat: true,
    price: true,
    height: false,
    width: false,
    style: false,
    brand: false,
  });
  const toggle = (key) => setOpen((o) => ({ ...o, [key]: !o[key] }));

  const toggleVal = (arr, val, setter) =>
    setter(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]);

  const renderCheckboxList = (items, counts, selected, setter) => {
    if (!items || items.length === 0) {
      return <p className="text-sm text-gray-500">Keine Optionen.</p>;
    }
    return items.map((item) => (
      <label
        key={item}
        className="flex cursor-pointer justify-between text-sm mb-1"
      >
        <span className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={selected.includes(item)}
            onChange={() => toggleVal(selected, item, setter)}
            className="accent-yellow-600"
          />
          {item}
        </span>
        <span className="text-[11px] text-gray-400">
          ({String(counts[item] || 0)})
        </span>
      </label>
    ));
  };

  return (
    <aside className="w-full shrink-0 space-y-1 px-4 pt-2 pb-6 sm:w-72 sm:px-6">
      <FilterSection label="Türen" open={open.cat} toggle={() => toggle("cat")}>
        {renderCheckboxList(categories, categoryCounts, category, setCategory)}
      </FilterSection>
      <FilterSection
        label="Farbe"
        open={open.color}
        toggle={() => toggle("color")}
      >
        {renderCheckboxList(colors, colorCounts, color, setColor)}
      </FilterSection>
      <FilterSection
        label="Verglasung"
        open={open.glazing}
        toggle={() => toggle("glazing")}
      >
        {renderCheckboxList(glazings, glazingCounts, glazing, setGlazing)}
      </FilterSection>
      <FilterSection
        label="Materialien"
        open={open.mat}
        toggle={() => toggle("mat")}
      >
        {renderCheckboxList(materials, materialCounts, material, setMaterial)}
      </FilterSection>
      <FilterSection
        label="Preis"
        open={open.price}
        toggle={() => toggle("price")}
      >
        <RangeInputFilter
          value={price}
          onChange={setPrice}
          min={priceRange[0]}
          max={priceRange[1]}
          unit="CHF"
        />
      </FilterSection>
      {/* <FilterSection
        label="Türhöhe"
        open={open.height}
        toggle={() => toggle("height")}
      >
        <RangeInputFilter
          value={height}
          onChange={setHeight}
          min={heightRange}
          max={heightRange[1]}
          unit="mm"
        />
      </FilterSection>
      <FilterSection
        label="Türbreite"
        open={open.width}
        toggle={() => toggle("width")}
      >
        <RangeInputFilter
          value={width}
          onChange={setWidth}
          min={widthRange}
          max={widthRange[1]}
          unit="mm"
        />
      </FilterSection> */}
      <FilterSection
        label="Türstil"
        open={open.style}
        toggle={() => toggle("style")}
      >
        {renderCheckboxList(styles, styleCounts, style, setStyle)}
      </FilterSection>
      <FilterSection
        label="Marke"
        open={open.brand}
        toggle={() => toggle("brand")}
      >
        {renderCheckboxList(brands, brandCounts, brand, setBrand)}
      </FilterSection>
    </aside>
  );
}
