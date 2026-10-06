import FoodItem from './FoodItem.jsx';

const FoodList = ({ food, deleteItem, isAdmin }) => {
  return (
    <div className="food-list">
      <ul>
        {food.map((item, index) => (
          <FoodItem
            key={item.menuId || `${item.name}-${index}`}
            index={index}
            name={item.name}
            price={item.price}
            item={item}
            deleteItem={deleteItem}
            isAdmin={isAdmin}
          />
        ))}
      </ul>
    </div>
  );
};

export default FoodList;
