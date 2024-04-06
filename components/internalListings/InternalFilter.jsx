import React from 'react';

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
    <div style={{
      border: '1px solid lime', 
      borderRadius: '5px', 
      padding: '10px', 
      marginRight: '150px',
      marginLeft: '150px',
    }}>
      <label htmlFor="minPrice" style={{color: 'lime', marginRight: '5px'}}>Min Price:</label>
      <input
        type="number"
        id="minPrice"
        value={minPrice}
        min={0}
        max={maxPrice}
        step="50"
        onChange={(e) => onMinPriceChange(Number(e.target.value))}
        style={{
          color: 'rgb(197, 255, 0)', 
          backgroundColor: 'rgba(0, 0, 0, 0)', 
          border: '1px solid lime',
          borderRadius: '5px',  
          padding: '5px', 
          margin: '5px 0', 
        }}
      />
      <label htmlFor="maxPrice" style={{color: 'lime', marginRight: '5px'}}>Max Price:</label>
      <input
        type="number"
        id="maxPrice"
        min={minPrice}
        max={5000}
        value={maxPrice}
        step="50"
        onChange={(e) => onMaxPriceChange(Number(e.target.value))}
        style={{
          color: 'rgb(197, 255, 0)', // Add lime color for font
          backgroundColor: 'rgba(0, 0, 0, 0)', // Add transparent background
          border: '1px solid lime', // Add border styling
          borderRadius: '5px', // Add border radius for rounded corners
          padding: '5px', // Add padding for better spacing
          margin: '5px 0', // Add margin for better spacing
        }}
      />
      <label htmlFor="minBedrooms" style={{color: 'lime', marginRight: '5px'}}>Min Bedrooms:</label>
      <input
        type="number"
        id="minBedrooms"
        value={minBedrooms}
        min={1}
        max={maxBedrooms}
        onChange={(e) => onMinBedroomsChange(Number(e.target.value))}
        style={{
          color: 'rgb(197, 255, 0)', // Add lime color for font
          backgroundColor: 'rgba(0, 0, 0, 0)', // Add transparent background
          border: '1px solid lime', // Add border styling
          borderRadius: '5px', // Add border radius for rounded corners
          padding: '5px', // Add padding for better spacing
          margin: '5px 0', // Add margin for better spacing
        }}
      />
      <label htmlFor="maxBedrooms" style={{color: 'lime', marginRight: '5px'}}>Max Bedrooms:</label>
      <input
        type="number"
        id="maxBedrooms"
        value={maxBedrooms}
        min={minBedrooms}
        max={5}
        onChange={(e) => onMaxBedroomsChange(Number(e.target.value))}
        style={{
          color: 'rgb(197, 255, 0)', // Add lime color for font
          backgroundColor: 'rgba(0, 0, 0, 0)', // Add transparent background
          border: '1px solid lime', // Add border styling
          borderRadius: '5px', // Add border radius for rounded corners
          padding: '5px', // Add padding for better spacing
          margin: '5px 0', // Add margin for better spacing
        }}
      />
      <label htmlFor="city" style={{color: 'lime', marginRight: '5px'}}>City:</label>
      <input
        type="text"
        id="city"
        placeholder="City"
        value={cityFilter}
        onChange={(e) => onCityFilterChange(e.target.value)}
        style={{
          color: 'rgb(197, 255, 0)', // Add lime color for font
          backgroundColor: 'rgba(0, 0, 0, 0)', // Add transparent background
          border: '1px solid lime', // Add border styling
          borderRadius: '5px', // Add border radius for rounded corners
          padding: '5px', // Add padding for better spacing
          margin: '5px 0', // Add margin for better spacing
        }}
      />
      <label htmlFor="periodAvailable" style={{color: 'lime', marginRight: '5px'}}>Period Available:</label>
      <select
        id="periodAvailable"
        value={periodAvailableFilter}
        onChange={(e) => onPeriodAvailableChange(e.target.value)}
        style={{
          color: 'white', // Add lime color for font
          backgroundColor: 'black', // Add transparent background
          border: '1px solid lime', // Add border styling
          borderRadius: '5px', // Add border radius for rounded corners
          padding: '5px', // Add padding for better spacing
          margin: '5px 0', // Add margin for better spacing
        }}
      >
        <option value="">Any</option>
        <option value="Short Term (0-3 months)">Short Term (0-3 months)</option>
        <option value="Medium Term (3-12 months)">Medium Term (3-12 months)</option>
        <option value="Long Term (12+ months)">Long Term (12+ months)</option>
      </select>
    </div>
  );
};

export default InternalFilter;

