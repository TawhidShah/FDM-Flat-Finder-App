import internalStyles from "@/app/listings/internal/internal.css";

const InternalFilter = ({
  minPrice,
  maxPrice,
  minBedrooms,
  maxBedrooms,
  cityFilter,
  periodAvailableFilter,
  onMinPriceChange,
  onMaxPriceChange,
  onMinBedroomsChange,
  onMaxBedroomsChange,
  onCityFilterChange,
  onPeriodAvailableChange,
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
      {/* Period Available filter */}
      <label htmlFor="periodAvailable" className={internalStyles.label}>
        Period Available:
      </label>
      <select
        id="periodAvailable"
        value={periodAvailableFilter}
        onChange={(e) => onPeriodAvailableChange(e.target.value)}
        className={internalStyles.input}
      >
        <option value="">Any</option>
        <option value="Short Term (0-3 months)">Short Term (0-3 months)</option>
        <option value="Medium Term (3-12 months)">
          Medium Term (3-12 months)
        </option>
        <option value="Long Term (12+ months)">Long Term (12+ months)</option>
      </select>
    </div>
  );
};

export default InternalFilter;
