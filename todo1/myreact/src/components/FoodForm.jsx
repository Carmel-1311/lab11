import { useState } from 'react';

const FoodForm = ({ addItem, types }) => {
  const [inputs, setInputs] = useState({
    name: '',
    price: '',
    isBestSeller: 'true',
    typeId: '',
  });

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    setInputs((values) => ({ ...values, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!inputs.name.trim() || !inputs.price || !inputs.typeId) {
      return;
    }

    const newFood = {
      name: inputs.name.trim(),
      price: Number(inputs.price),
      isBestSeller: inputs.isBestSeller === 'true',
      typeId: Number(inputs.typeId),
    };

    await addItem(newFood);
    setInputs({ name: '', price: '', isBestSeller: 'true', typeId: '' });
  }

  return (
    <form onSubmit={handleSubmit} className="food-form">
      <h4>New Food</h4>
      <label>
        name :
        <input type="text" name="name" value={inputs.name} onChange={handleChange} />
      </label>
      <label>
        price :
        <input type="number" name="price" value={inputs.price} onChange={handleChange} />
      </label>
      <label>
        Best Seller :
        <select name="isBestSeller" value={inputs.isBestSeller} onChange={handleChange}>
          <option value="true">BestSeller</option>
          <option value="false">Normal</option>
        </select>
      </label>
      <label>
        Type :
        <select name="typeId" value={inputs.typeId} onChange={handleChange}>
          <option value="">Select</option>
          {types.map((type) => (
            <option key={type.typeId} value={type.typeId}>
              {type.name}
            </option>
          ))}
        </select>
      </label>
      <button>Add menu</button>
    </form>
  );
};

export default FoodForm;
