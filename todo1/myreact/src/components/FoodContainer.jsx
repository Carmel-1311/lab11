import { useEffect, useState } from 'react';
import FoodForm from './FoodForm.jsx';
import FoodList from './FoodList.jsx';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const FoodContainer = () => {
  const [food, setFood] = useState([]);
  const [types, setTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [mode, setMode] = useState(() => localStorage.getItem('mode') || 'user');

  const isAdmin = mode === 'admin';

  useEffect(() => {
    async function loadData() {
      try {
        const [menuResponse, typeResponse] = await Promise.all([
          fetch(`${API_URL}/api/menu`),
          fetch(`${API_URL}/api/type`),
        ]);

        if (!menuResponse.ok || !typeResponse.ok) {
          throw new Error('Cannot load API data');
        }

        const [menuData, typeData] = await Promise.all([
          menuResponse.json(),
          typeResponse.json(),
        ]);

        setFood(menuData);
        setTypes(typeData);
        setErrorMessage('');
      } catch (error) {
        setErrorMessage('Cannot connect to server');
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  useEffect(() => {
    localStorage.setItem('mode', mode);
  }, [mode]);

  const toggleMode = () => {
    setMode((currentMode) => (currentMode === 'user' ? 'admin' : 'user'));
  };

  const deleteItem = (index) => {
    setFood((items) => items.filter((_, itemIndex) => itemIndex !== index));
  };

  const addItem = async (item) => {
    const response = await fetch(`${API_URL}/api/menu`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });

    if (!response.ok) {
      setErrorMessage('Cannot add menu');
      return;
    }

    const newMenu = await response.json();
    const menuType = types.find((type) => type.typeId === newMenu.typeId);

    setFood((items) => [...items, { ...newMenu, type: menuType }]);
    setErrorMessage('');
  };

  return (
    <div className="food-container">
      <div className="mode-bar">
        <span>{isAdmin ? 'Admin Mode' : 'User Mode'}</span>
        <button type="button" onClick={toggleMode}>
          {isAdmin ? 'User' : 'Admin'}
        </button>
      </div>
      <h3>Our Menu</h3>
      {isLoading && <p className="status-text">Loading...</p>}
      {errorMessage && <p className="status-text error">{errorMessage}</p>}
      {!isLoading && <FoodList food={food} deleteItem={deleteItem} isAdmin={isAdmin} />}
      {isAdmin && <FoodForm addItem={addItem} types={types} />}
    </div>
  );
};

export default FoodContainer;
