import { forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';
import Cart from './Cart';
import {useContext} from "react"
import {CartContext} from "../context/cart-context"

const CartModal = forwardRef(function Modal(
  { title, actions },
  ref
) {
  const dialog = useRef();

  const {onUpdateToCart, items} = useContext(CartContext)
  useImperativeHandle(ref, () => {
    return {
      open: () => {
        dialog.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog id="modal" ref={dialog}>
      <h2>{title}</h2>
      <Cart items={items} onUpdateItemQuantity={onUpdateToCart} />
      <form method="dialog" id="modal-actions">
       {actions}
      </form>
    </dialog>,
    document.getElementById('modal')
  );
});

export default CartModal;
