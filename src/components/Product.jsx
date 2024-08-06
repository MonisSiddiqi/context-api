import { useContext } from "react";
import { CartContext } from "../context/cart-context";

export default function Product({ id, image, title, price, description }) {
  const { onAddToCart, items, onRemoveFromCart } = useContext(CartContext);
  const isAlreadyInCart = items.find((item) => item.id === id);

  return (
    <article className="product">
      <img src={image} alt={title} />
      <div className="product-content">
        <div>
          <h3>{title}</h3>
          <p className="product-price">${price}</p>
          <p>{description}</p>
        </div>
        <p className="product-actions">
          {isAlreadyInCart ? (
            <button
              style={{
                backgroundColor: "transparent",
                border: "1px solid gray",
              }}
              onClick={() => onRemoveFromCart(id)}
            >
              Remove from Cart
            </button>
          ) : (
            <button onClick={() => onAddToCart(id)}>Add to Cart</button>
          )}
        </p>
      </div>
    </article>
  );
}
