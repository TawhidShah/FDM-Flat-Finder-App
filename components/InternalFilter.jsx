import React from "react";
import internalStyles from "@/app/listings/internal/internal.css";

const InternalFilter = ({
  minPrice,
  maxPrice,
  minBedrooms,
  maxBedrooms,
  cityFilter,
  onMinPriceChange,
  onMaxPriceChange,
  onMinBedroomsChange,
  onMaxBedroomsChange,
  onCityFilterChange,
}) => {
  return (
    <div className={internalStyles.filterContainer}>
      <label htmlFor="minPrice" className={internalStyles.label}>
        Min Price:
      </label>
      <input
        type="number"
        id="minPrice"
        value={minPrice}
        min={0}
        max={maxPrice}
        step="50"
        onChange={(e) => onMinPriceChange(Number(e.target.value))}
        className={internalStyles.input}
      />
      <label htmlFor="maxPrice" className={internalStyles.label}>
        Max Price:
      </label>
      <input
        type="number"
        id="maxPrice"
        min={minPrice}
        max={5000}
        step="50"
        onChange={(e) => onMaxPriceChange(Number(e.target.value))}
        className={internalStyles.input}
      />
      <label htmlFor="minBedrooms" className={internalStyles.label}>
        Min Bedrooms:
      </label>
      <input
        type="number"
        id="minBedrooms"
        value={minBedrooms}
        min={1}
        max={maxBedrooms}
        onChange={(e) => onMinBedroomsChange(Number(e.target.value))}
        className={internalStyles.input}
      />
      <label htmlFor="maxBedrooms" className={internalStyles.label}>
        Max Bedrooms:
      </label>
      <input
        type="number"
        id="maxBedrooms"
        value={maxBedrooms}
        min={minBedrooms}
        max={5}
        onChange={(e) => onMaxBedroomsChange(Number(e.target.value))}
        className={internalStyles.input}
      />
      <label htmlFor="city" className={internalStyles.label}>
        City:
      </label>
      <input
        type="text"
        id="city"
        placeholder="City"
        value={cityFilter}
        onChange={(e) => onCityFilterChange(e.target.value)}
        className={internalStyles.input}
      />
    </div>
  );
};

export default InternalFilter;
