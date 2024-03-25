import React from "react"
import { useState } from "react"
import styles from "./CreateListings.module.css"

const CreateListing = () => {
  const [formData, setFormData] = useState({
    id: '',
    description: '',
    addressLine1: '',
    addressLine2: '',
    postcode: '',
    city: '',
    county: '',
    numberOfRooms: '',
    roomsAvailable: '',
    availability: '',
    owner: '',
    tenants: '',
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Form data submitted:', formData);
      setFormData({
        id: '',
        description: '',
        addressLine1: '',
        addressLine2: '',
        postcode: '',
        city: '',
        county: '',
        numberOfRooms: '',
        roomsAvailable: '',
        availability: '',
        owner: '',
        tenants: '',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Create Listing</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Property ID:
          <input type="number" name="id" value={formData.id} onChange={handleChange} />
        </label>
        <label>
          Description:
          <input type="text" name="description" value={formData.description} onChange={handleChange} />
        </label>
        <label>
          Address Line 1:
          <input type="text" name="addressLine1" value={formData.addressLine1} onChange={handleChange} />
        </label>
        <label>
          Address Line 2:
          <input type="text" name="addressLine2" value={formData.addressLine2} onChange={handleChange} />
        </label>
        <label>
          Postcode:
          <input type="text" name="postcode" value={formData.postcode} onChange={handleChange} />
        </label>
        <label>
          City:
          <input type="text" name="city" value={formData.city} onChange={handleChange} />
        </label>
        <label>
          County:
          <input type="text" name="county" value={formData.county} onChange={handleChange} />
        </label>
        <label>
          Number of Rooms:
          <input type="number" name="numberOfRooms" value={formData.numberOfRooms} onChange={handleChange} />
        </label>
        <label>
          Rooms Available:
          <input type="number" name="roomsAvailable" value={formData.roomsAvailable} onChange={handleChange} />
        </label>
        <label>
          Availability:
          <select name="availability" value={formData.availability} onChange={handleChange}>
            <option value="available_now_and_future">Available now and in the future</option>
            <option value="available_now_not_future">Available now but not in the future</option>
            <option value="not_available">Not available</option>
          </select>
        </label>
        <label>
          Owner:
          <input type="text" name="owner" value={formData.owner} onChange={handleChange} />
        </label>
        <label>
          Tenants:
          <input type="text" name="tenants" value={formData.tenants} onChange={handleChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}


export default CreateListing