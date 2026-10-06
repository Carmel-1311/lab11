const FoodItem = ({ index, name, price, item, deleteItem, isAdmin }) => {
  return (
    <li>
      <span>
        {name} - {price} baht {item.type && <span className="type-name">({item.type.name})</span>}{' '}
        {item.isBestSeller && <span className="best-seller">Best</span>}
      </span>
      {isAdmin && (
        <button type="button" onClick={() => deleteItem(index)}>
          Del
        </button>
      )}
    </li>
  );
};

export default FoodItem;
