import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRestaurantStatistics } from '../../api/restaurant.api';

const DashboardPage: React.FC = () => {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const today = new Date().toISOString().slice(0, 10);
  const [from, setFrom] = useState(today);
  const [to, setTo] = useState(today);

  // Only fetch on submit
  const [filter, setFilter] = useState({ from: today, to: today });

  useEffect(() => {
    if (!restaurantId) return;
    setLoading(true);
    getRestaurantStatistics(restaurantId, filter.from, filter.to)
      .then((res: any) => {
        setStats(res.data.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load statistics');
        setLoading(false);
      });
  }, [restaurantId, filter]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (from > to) {
      setError('The "From" date cannot be after the "To" date.');
      return;
    }
    setError(null);
    setFilter({ from, to });
  };

  if (loading) return <div style={{ padding: 24 }}>Loading...</div>;
  if (error) return <div style={{ padding: 24, color: 'red' }}>{error}</div>;
  if (!stats) return null;

  return (
    <div style={{ padding: 24 }}>
      <h2>Restaurant Dashboard</h2>
      <form style={{ margin: '16px 0' }} onSubmit={handleSubmit}>
        <label>
          From: <input type="date" value={from} onChange={e => setFrom(e.target.value)} />
        </label>
        <label style={{ marginLeft: 16 }}>
          To: <input type="date" value={to} onChange={e => setTo(e.target.value)} />
        </label>
        <button type="submit" style={{ marginLeft: 16 }}>Filter</button>
      </form>
      {error && <div style={{ color: 'red', marginBottom: 16 }}>{error}</div>}
      <div style={{ display: 'flex', gap: 24, marginTop: 24 }}>
        <div>
          <h3>Total Orders</h3>
          <p>{stats.totalOrders}</p>
        </div>
        <div>
          <h3>Total Revenue</h3>
          <p>${stats.totalRevenue}</p>
        </div>
        <div>
          <h3>Active Menus</h3>
          <p>{stats.activeMenus}</p>
        </div>
        <div>
          <h3>Total Meals</h3>
          <p>{stats.totalMeals}</p>
        </div>
      </div>
      {stats.orderStatusCounts && (
        <div style={{ marginTop: 32 }}>
          <h3>Order Status Breakdown</h3>
          <ul>
            {Object.entries(stats.orderStatusCounts).map(([status, count]) => (
              <li key={String(status)}>
                {String(status)}: {Number(count)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DashboardPage; 