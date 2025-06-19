import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMenus, createMenu, deleteMenu } from '../../api/restaurant.api';

const MenuPage = () => {
  const { restaurantId } = useParams();
  const [menus, setMenus] = useState([]);
  const [form, setForm] = useState({
    name_en: '',
    name_ar: '',
    description_en: '',
    description_ar: '',
    isActive: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchMenus = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await getMenus(restaurantId!);
      setMenus(res.data.data || []);
    } catch (e) {
      setError('Failed to load menus');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMenus();
    // eslint-disable-next-line
  }, [restaurantId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setForm(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleCreate = async () => {
    const { name_en, name_ar } = form;
    if (!name_en || !name_ar) return;
    setLoading(true);
    setError('');
    try {
      await createMenu(restaurantId!, {
        ...form,
        restaurantId: parseInt(restaurantId!),
      });
      setForm({
        name_en: '',
        name_ar: '',
        description_en: '',
        description_ar: '',
        isActive: true,
      });
      fetchMenus();
    } catch (e) {
      setError('Failed to create menu');
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    setLoading(true);
    setError('');
    try {
      await deleteMenu(restaurantId!, id);
      fetchMenus();
    } catch (e) {
      setError('Failed to delete menu');
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Menus</h1>
      <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="name_en" value={form.name_en} onChange={handleChange} placeholder="Name (EN)" className="border p-2" />
        <input name="name_ar" value={form.name_ar} onChange={handleChange} placeholder="Name (AR)" className="border p-2" />
        <textarea name="description_en" value={form.description_en} onChange={handleChange} placeholder="Description (EN)" className="border p-2" />
        <textarea name="description_ar" value={form.description_ar} onChange={handleChange} placeholder="Description (AR)" className="border p-2" />
        <label className="flex items-center">
          <input name="isActive" type="checkbox" checked={form.isActive} onChange={handleChange} className="mr-2" />
          Active
        </label>
        <button onClick={handleCreate} className="bg-blue-500 text-white px-4 py-2 rounded col-span-1 md:col-span-2">Add Menu</button>
      </div>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {menus.map((menu: any) => (
            <li key={menu.id} className="flex flex-col md:flex-row md:items-center mb-2 border-b pb-2">
              <div className="flex-1">
                <div><b>{menu.name_en}</b> / {menu.name_ar}</div>
                <div className="text-sm text-gray-600">{menu.description_en} / {menu.description_ar}</div>
                <div className="text-xs">Active: {menu.isActive ? 'Yes' : 'No'}</div>
              </div>
              <button onClick={() => handleDelete(menu.id)} className="bg-red-500 text-white px-2 py-1 rounded mt-2 md:mt-0">Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MenuPage; 