import { useEffect, useState } from 'react';
import './Home.css';


function Home() {
  const [computers, setComputers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/computers')
      .then(res => res.json())
      .then(data => {
        setComputers(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Greška pri učitavanju:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Učitavanje...</p>;

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
