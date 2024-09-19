import React from 'react'
import axios from 'axios';
import { useState,useEffect } from 'react';

const Vehicles = () => {
    const [vehicles, setVehicles] = useState([]);
    const [form, setForm] = useState({
      model: '',
      brand: '',
      year: '',
      insurance: '',
      fc: '',
      price: ''
    });
    const [editId, setEditId] = useState(null);
  
    // Fetch all vehicles when component mount
    useEffect(() => {
      fetchVehicles();
    }, []);
  
    // Fetch all vehicles
    const fetchVehicles = async () => {
      try {
        const response = await axios.get('http://localhost:5000/vehicles/get');
        setVehicles(response.data);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      }
    };
  
    // Handle form input changes
    const handleChange = (e) => {
      const { name, value } = e.target;
      setForm((prevForm) => ({
        ...prevForm,
        [name]: value
      }));
    };
  
    // Add or update vehicle
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        if (editId) {
          // Update vehicle
          await axios.put(`http://localhost:5000/vehicles/update?id=${editId}`, form);
        } else {
          // Add new vehicle
          await axios.post('http://localhost:5000/vehicles/add', form);
        }
        fetchVehicles(); // Refresh vehicle list
        clearForm();
      } catch (error) {
        console.error('Error saving vehicle:', error);
      }
    };
  
    // Edit vehicle (fill form with data)
    const editVehicle = (vehicle) => {
      setForm(vehicle);
      setEditId(vehicle.id);
    };
  
    // Delete a vehicle
    const deleteVehicle = async (id) => {
      try {
        await axios.delete(`http://localhost:5000/vehicles/delete?id=${id}`);
        fetchVehicles(); // Refresh vehicle list
      } catch (error) {
        console.error('Error deleting vehicle:', error);
      }
    };
  
    // Clear form
    const clearForm = () => {
      setForm({
        model: '',
        brand: '',
        year: '',
        insurance: '',
        fc: '',
        price: ''
      });
      setEditId(null);
    };
  
    return (<div className='container'>
      <form action="">
      <input
            type="text"
            name="model"
            placeholder="model"
            value={form.model}
            onChange={handleChange}
            required
          />
      <input
            type="text"
            name="brand"
            placeholder="brand"
            value={form.brand}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="year"
            placeholder="year"
            value={form.year}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="insurance"
            placeholder="Insurance"
            value={form.insurance}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="fc"
            placeholder="FC"
            value={form.fc}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            required
          />
          <button type="submit">{editId ? 'Update Vehicle' : 'Add Vehicle'}</button>
          {editId && <button type="button" onClick={clearForm}>Cancel</button>}
        </form>
  
        <h2>Vehicles List</h2>
        <table className="vehicles-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Model</th>
              <th>Brand</th>
              <th>Year</th>
              <th>Insurance</th>
              <th>FC</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle) => (
              <tr key={vehicle.id}>
                <td>{vehicle.id}</td>
                <td>{vehicle.model}</td>
                <td>{vehicle.brand}</td>
                <td>{vehicle.year}</td>
                <td>{vehicle.insurance}</td>
                <td>{vehicle.fc}</td>
                <td>{vehicle.price}</td>
                <td>
                  <button onClick={() => editVehicle(vehicle)}>Edit</button>
                  <button onClick={() => deleteVehicle(vehicle.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

export default Vehicles
