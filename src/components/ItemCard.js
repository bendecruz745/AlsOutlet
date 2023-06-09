import "../css/ItemCard.css";

function ItemCard({ item }) {
  const itemName = item.name.replace(/\s/g, "");
  const descriptionText = item.description
    .split("\\n")
    .map((line, index) => <p key={index}>{line}</p>);

  return (
    <div className="menu-item-card-container">
      <div className="card-picture-container">
        <img src={require(`../imgs/${itemName}.jpg`)} alt={item.name} />
      </div>
      <div className="card-title-container">
        <h1>{item.name}</h1>
        <h2>${item.cost.$numberDecimal}</h2>
      </div>
      <div className="card-cost-container"></div>
      <div className="card-description-container">{descriptionText}</div>
      <button className="card-add-button">Add</button>
    </div>
  );
}

export default ItemCard;
