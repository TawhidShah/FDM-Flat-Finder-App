// components/Filter.js
// components/Filter.js

import React from "react";

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
    <div className="filter-container">
      <label htmlFor="minPrice" className="label">
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
        className="input"
      />
      <label htmlFor="maxPrice" className="label">
        Max Price:
      </label>
      <input
        type="number"
        id="maxPrice"
        min={minPrice}
        max={5000}
        step="50"
        onChange={(e) => onMaxPriceChange(Number(e.target.value))}
        className="input"
      />
      <label htmlFor="minBedrooms" className="label">
        Min Bedrooms:
      </label>
      <input
        type="number"
        id="minBedrooms"
        value={minBedrooms}
        min={1}
        max={maxBedrooms}
        onChange={(e) => onMinBedroomsChange(Number(e.target.value))}
        className="input"
      />
      <label htmlFor="maxBedrooms" className="label">
        Max Bedrooms:
      </label>
      <input
        type="number"
        id="maxBedrooms"
        value={maxBedrooms}
        min={minBedrooms}
        max={5}
        onChange={(e) => onMaxBedroomsChange(Number(e.target.value))}
        className="input"
      />
      <label htmlFor="city" className="label">
        City:
      </label>
      <input
        type="text"
        id="city"
        placeholder="City"
        value={cityFilter}
        onChange={(e) => onCityFilterChange(e.target.value)}
        className="input"
      />

      <style jsx>{`
        .filter-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          margin-bottom: 10px;
        }

        .label {
          flex: 1 0 100%;
          margin-bottom: 5px;
        }

        .input {
          flex: 1 0 100%;
          padding: 8px;
          margin-bottom: 10px;
        }
      `}</style>
    </div>
  );
};

export default InternalFilter;
