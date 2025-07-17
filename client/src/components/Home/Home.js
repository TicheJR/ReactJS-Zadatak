import { useEffect } from 'react';
import './Home.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComputers } from '../../store/computersSlice';


function Home() {
  const dispatch = useDispatch();
  const { computers, loading, error } = useSelector((state) => state.computers);

  

  useEffect(() => {
    dispatch(fetchComputers())
  }, [dispatch]);

  if (loading) return <p>Učitavanje...</p>;
  if (error) return <p>Greška: {error}</p>;


  const totalQuantity = computers.length;
  const totalValue = computers.reduce((sum, c) => sum + c.price, 0);
  const topVisited = [...computers]
    .sort((a, b) => b.visits - a.visits)
    .slice(0, 3);

  return (
    <div className="home-container">
    <h2 className="home-title">Home</h2>

    <div className="card-wrapper">
      <Card title="Total Computers Quantity" value={totalQuantity} />
      <Card title="Total Value (EUR)" value={`€ ${totalValue}`} />
      <Card
        title="Top Visited"
        value={
          <ul className="top-visited-list">
            {topVisited.map((c, i) => (
              <li key={i}>
                {i + 1} {c.brand} – <em>{c.visits} visits</em>
              </li>
            ))}
          </ul>
        }
      />
    </div>
  </div>

  );
}

function Card({ title, value }) {
  return (
    <div className="card">
      <h4>{title}</h4>
      <div className="card-value">{value}</div>
    </div>
  );
}

export default Home;
