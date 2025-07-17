import {  useState } from 'react';
import './Computers.css'
import { useQuery } from '@tanstack/react-query';

function Computers() {
 const [searchTerm, setSearchTerm] = useState('');

 const {data: computers = [], isLoading, error} = useQuery({
  queryKey: ['computers'],
  queryFn: () => fetch('/api/computers').then(res => res.json()),
  staleTime: 1000 * 60 * 5,
 });


  const filteredComputers = computers.filter(comp =>
    comp.brand.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  if (isLoading) return <p>Učitavanje...</p>;
  if (error) return <p>Greška pri učitavanju podataka.</p>;


  function highlightMatch(text, query) {
    if (!query) return text;
    const regex = new RegExp(`^(${query})`, 'i');
    return text.replace(regex, '<strong>$1</strong>');
  }

  return (
    <div className="computers-container">
  <h2>List of computers</h2>

  <input
    type="text"
    placeholder="Search laptop by brand name(example: Dell)"
    value={searchTerm}
    onChange={e => setSearchTerm(e.target.value)}
    className="search-input"
  />

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
      {filteredComputers.map((comp, index) => (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>
          <span
            dangerouslySetInnerHTML={{
              __html: highlightMatch(comp.brand, searchTerm)
            }}
          />
        </td>
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
