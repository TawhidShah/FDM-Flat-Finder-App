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
    <div className="mx-auto p-2">
      <label htmlFor="minPrice" className="mx-1 text-primary">
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
        className="my-1 rounded-sm border border-primary bg-secondary p-1 text-primary focus:outline-none"
      />
      <label htmlFor="maxPrice" className="mx-1 text-primary">
        Max Price:
      </label>
      <input
        type="number"
        id="maxPrice"
        min={minPrice}
        max={5000}
        value={maxPrice}
        step="50"
        onChange={(e) => onMaxPriceChange(Number(e.target.value))}
        className="my-1 rounded-sm border border-primary bg-secondary p-1 text-primary focus:outline-none"
      />
      <label htmlFor="minBedrooms" className="mx-1 text-primary">
        Min Bedrooms:
      </label>
      <input
        type="number"
        id="minBedrooms"
        value={minBedrooms}
        min={1}
        max={maxBedrooms}
        onChange={(e) => onMinBedroomsChange(Number(e.target.value))}
        className="my-1 rounded-sm border border-primary bg-secondary p-1 text-primary focus:outline-none"
      />
      <label htmlFor="maxBedrooms" className="mx-1 text-primary">
        Max Bedrooms:
      </label>
      <input
        type="number"
        id="maxBedrooms"
        value={maxBedrooms}
        min={minBedrooms}
        max={5}
        onChange={(e) => onMaxBedroomsChange(Number(e.target.value))}
        className="my-1 rounded-sm border border-primary bg-secondary p-1 text-primary focus:outline-none"
      />
      <label htmlFor="city" className="mx-1 text-primary">
        City:
      </label>
      <input
        type="text"
        id="city"
        placeholder="City"
        value={cityFilter}
        onChange={(e) => onCityFilterChange(e.target.value)}
        className="my-1 rounded-sm border border-primary bg-secondary p-1 text-primary focus:outline-none"
      />
      <label htmlFor="periodAvailable" className="mx-1 text-primary">
        Period Available:
      </label>
      <select
        id="periodAvailable"
        value={periodAvailableFilter}
        onChange={(e) => onPeriodAvailableChange(e.target.value)}
        className="my-1 rounded-sm border border-primary bg-secondary p-1 text-primary"
      >
        <option value="">Any</option>
        <option value="ShortTerm">Short Term (0-12 months)</option>
        <option value="LongTerm">Long Term (12+ months)</option>
      </select>
    </div>
  );
};

export default InternalFilter;
