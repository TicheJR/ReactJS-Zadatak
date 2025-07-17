import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchComputers, addComputer } from '../../store/computersSlice'
import './Computers';

function Computers() {
  const dispatch = useDispatch();

  const { computers, loading, error } = useSelector((state) => state.computers);
  const [searchTerm, setSearchTerm] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    brand: '',
    ram: '',
    cpu: '',
    gpu: '',
    description: '',
    price: '',
    quantity: '',
  });

  useEffect(() => {
    dispatch(fetchComputers());
  }, [dispatch]);

  const filteredComputers = computers.filter(comp =>
    comp.brand.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  // Form handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddClick = () => {
    setFormOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.brand ||
      !formData.ram ||
      !formData.cpu ||
      !formData.gpu ||
      !formData.description ||
      !formData.price ||
      !formData.quantity
    ) {
      alert('Popunite sva polja!');
      return;
    }

    dispatch(
      addComputer({
        ...formData,
        price: Number(formData.price),
        quantity: Number(formData.quantity),
        visits: 0,
      })
    ).then(() => {
      setFormData({
        brand: '',
        ram: '',
        cpu: '',
        gpu: '',
        description: '',
        price: '',
        quantity: '',
      });
      setFormOpen(false);
    });
  };



  if (loading) return <p>Učitavanje...</p>;
  if (error) return <p>Greška pri učitavanju podataka.</p>;


  function highlightMatch(text, query) {
    if (!query) return text;
    const regex = new RegExp(`^(${query})`, 'i');
    return text.replace(regex, '<strong>$1</strong>');
  }

  return (
    <div className="computers-container">
      <h2>Lista računara</h2>
      <div>
        <input
          type="text"
          placeholder="Pretraga po brendu"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button onClick={handleAddClick}>Add PC</button>
      </div>

      {formOpen && (
        <form className="add-computer-form" onSubmit={handleFormSubmit}>
          <input
            name="brand"
            placeholder="Brand"
            value={formData.brand}
            onChange={handleInputChange}
          />
          <input
            name="ram"
            placeholder="RAM"
            value={formData.ram}
            onChange={handleInputChange}
          />
          <input
            name="cpu"
            placeholder="CPU"
            value={formData.cpu}
            onChange={handleInputChange}
          />
          <input
            name="gpu"
            placeholder="GPU"
            value={formData.gpu}
            onChange={handleInputChange}
          />
          <input
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleInputChange}
          />
          <input
            name="price"
            type="number"
            placeholder="Price (€)"
            value={formData.price}
            onChange={handleInputChange}
          />
          <input
            name="quantity"
            type="number"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={handleInputChange}
          />
          <button type="submit">Dodaj računar</button>
          <button type="button" onClick={() => setFormOpen(false)}>
            Otkaži
          </button>
        </form>
      )}

      <table className="computers-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Brand</th>
            <th>RAM</th>
            <th>CPU</th>
            <th>GPU</th>
            <th>Description</th>
            <th>Price (€)</th>
            <th>Available</th>
          </tr>
        </thead>
        <tbody>
          {filteredComputers.map((comp, i) => (
            <tr key={comp.id || i}>
              <td>{i + 1}</td>
              <td dangerouslySetInnerHTML={{ __html: highlightMatch(comp.brand, searchTerm) }} />
              <td>{comp.ram}</td>
              <td>{comp.cpu}</td>
              <td>{comp.gpu}</td>
              <td>{comp.description}</td>
              <td>{comp.price}</td>
              <td>{comp.quantity}</td>
            </tr>
          ))}
          {filteredComputers.length === 0 && (
            <tr>
              <td colSpan="8" style={{ textAlign: 'center', padding: '20px' }}>
                Nema rezultata.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Computers;
