'use client';

import { useCart, type CartItem } from '@/app/components/CartContext';
import { useState } from 'react';

interface Props {
  product: Omit<CartItem, 'quantity'>;
}

export function AddToCartButton({ product }: Props) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleClick() {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <button
      onClick={handleClick}
      className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-base transition-all ${
        added
          ? 'bg-green-600 text-white scale-95'
          : 'bg-green-800 hover:bg-green-700 text-white'
      }`}
    >
      {added ? '✓ Añadido al carrito' : '🛒 Añadir al carrito'}
    </button>
  );
}
