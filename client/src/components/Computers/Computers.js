import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchComputers, addComputer } from '../../store/computersSlice';
import { useForm } from 'react-hook-form';
import './Computers.css';

function Computers() {
  const dispatch = useDispatch();
  const { computers, loading, error } = useSelector((state) => state.computers);
  const [searchTerm, setSearchTerm] = useState('');
  const [formOpen, setFormOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    dispatch(fetchComputers());
  }, [dispatch]);

  const filteredComputers = computers.filter(comp =>
    comp.brand.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  const onSubmit = (data) => {
    dispatch(addComputer({
      ...data,
      price: Number(data.price),
      quantity: Number(data.quantity),
      visits: 0,
    })).then(() => {
      reset();
      setFormOpen(false);
    });
  };

  const highlightMatch = (text, query) => {
    if (!query) return text;
    const regex = new RegExp(`^(${query})`, 'i');
    return text.replace(regex, '<strong>$1</strong>');
  };

  if (loading) return <p>Učitavanje...</p>;
  if (error) return <p>Greška pri učitavanju podataka.</p>;

  return (
    <div className="computers-container">
      <h2>Lista računara</h2>

      <input
        type="text"
        placeholder="Pretraga po brendu"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <button onClick={() => setFormOpen(true)}>Add PC</button>

      {formOpen && (
        <form className="add-computer-form" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input {...register('brand', { required: 'Brand je obavezan' })} placeholder="Brand" />
            {errors.brand && <span className="error-msg">{errors.brand.message}</span>}
          </div>

          <div>
            <input {...register('ram', { required: 'RAM je obavezan' })} placeholder="RAM" />
            {errors.ram && <span className="error-msg">{errors.ram.message}</span>}
          </div>

          <div>
            <input {...register('cpu', { required: 'CPU je obavezan' })} placeholder="CPU" />
            {errors.cpu && <span className="error-msg">{errors.cpu.message}</span>}
          </div>

          <div>
            <input {...register('gpu', { required: 'GPU je obavezan' })} placeholder="GPU" />
            {errors.gpu && <span className="error-msg">{errors.gpu.message}</span>}
          </div>

          <div>
            <input {...register('description', { required: 'Opis je obavezan' })} placeholder="Description" />
            {errors.description && <span className="error-msg">{errors.description.message}</span>}
          </div>

          <div>
            <input
              type="number"
              {...register('price', { required: 'Cena je obavezna', valueAsNumber: true })}
              placeholder="Price (€)"
            />
            {errors.price && <span className="error-msg">{errors.price.message}</span>}
          </div>

          <div>
            <input
              type="number"
              {...register('quantity', { required: 'Količina je obavezna', valueAsNumber: true })}
              placeholder="Quantity"
            />
            {errors.quantity && <span className="error-msg">{errors.quantity.message}</span>}
          </div>

          <button type="submit">Dodaj računar</button>
          <button type="button" onClick={() => setFormOpen(false)}>Otkaži</button>
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
