import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMeals, createMeal, deleteMeal, getMenus } from '../../api/restaurant.api';

const MealsPage = () => {
  const { restaurantId } = useParams();
  const [meals, setMeals] = useState([]);
  const [menus, setMenus] = useState([]);
  const [form, setForm] = useState({
    name_en: '',
    name_ar: '',
    description_en: '',
    description_ar: '',
    price: '',
    menuId: '',
    imageUrl: '',
    isAvailable: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchMeals = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await getMeals(restaurantId!);
      setMeals(res.data.data || []);
    } catch (e) {
      setError('Failed to load meals');
    }
    setLoading(false);
  };

  const fetchMenus = async () => {
    try {
      const res = await getMenus(restaurantId!);
      setMenus(res.data.data || []);
    } catch (e) {
      // ignore for now
    }
  };

  useEffect(() => {
    fetchMeals();
    fetchMenus();
    // eslint-disable-next-line
  }, [restaurantId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (e.target instanceof HTMLInputElement && e.target.type === 'checkbox') {
      setForm(prev => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked
      }));
      return;
    }
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreate = async () => {
    const { name_en, name_ar, description_en, description_ar, price, menuId } = form;
    if (!name_en || !name_ar || !description_en || !description_ar || !price || !menuId) return;
    setLoading(true);
    setError('');
    try {
      await createMeal(restaurantId!, {
        ...form,
        price: parseFloat(form.price),
        menuId: parseInt(form.menuId),
      });
      setForm({
        name_en: '',
        name_ar: '',
        description_en: '',
        description_ar: '',
        price: '',
        menuId: '',
        imageUrl: '',
        isAvailable: true,
      });
      fetchMeals();
    } catch (e) {
      setError('Failed to create meal');
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    setLoading(true);
    setError('');
    try {
      await deleteMeal(restaurantId!, id);
      fetchMeals();
    } catch (e) {
      setError('Failed to delete meal');
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Meals</h1>
      <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="name_en" value={form.name_en} onChange={handleChange} placeholder="Name (EN)" className="border p-2" />
        <input name="name_ar" value={form.name_ar} onChange={handleChange} placeholder="Name (AR)" className="border p-2" />
        <input name="description_en" value={form.description_en} onChange={handleChange} placeholder="Description (EN)" className="border p-2" />
        <input name="description_ar" value={form.description_ar} onChange={handleChange} placeholder="Description (AR)" className="border p-2" />
        <input name="price" value={form.price} onChange={handleChange} placeholder="Price" type="number" className="border p-2" />
        <input name="imageUrl" value={form.imageUrl} onChange={handleChange} placeholder="Image URL (optional)" className="border p-2" />
        <select name="menuId" value={form.menuId} onChange={handleChange} className="border p-2">
          <option value="">Select Menu</option>
          {menus.map((menu: any) => (
            <option key={menu.id} value={menu.id}>{menu.name_en}</option>
          ))}
        </select>
        <label className="flex items-center">
          <input name="isAvailable" type="checkbox" checked={form.isAvailable} onChange={handleChange} className="mr-2" />
          Available
        </label>
        <button onClick={handleCreate} className="bg-blue-500 text-white px-4 py-2 rounded col-span-1 md:col-span-2">Add Meal</button>
      </div>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {meals.map((meal: any) => (
            <li key={meal.id} className="flex items-center mb-2">
              <span className="flex-1">{meal.name_en} / {meal.name_ar}</span>
              <button onClick={() => handleDelete(meal.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MealsPage; 