'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/app/components/CartContext';
import { cartWhatsAppUrl } from '@/lib/whatsapp';

export default function CarritoPage() {
  const { items, count, total, removeItem, updateQty, clearCart } = useCart();

  const waUrl =
    items.length > 0
      ? cartWhatsAppUrl(items.map((i) => ({ name: i.name, quantity: i.quantity, price: i.price })))
      : '#';

  const formattedTotal = total.toLocaleString('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  });

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center">
        <div className="text-6xl mb-4">🛒</div>
        <h1 className="text-2xl font-serif text-stone-800 mb-3">Tu carrito está vacío</h1>
        <p className="text-stone-500 mb-8">
          Explora nuestro catálogo y agrega las plantas que quieras.
        </p>
        <Link
          href="/catalogo"
          className="inline-block bg-green-800 text-white px-8 py-3 rounded-full font-bold hover:bg-green-700 transition-colors"
        >
          Ir al catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-serif text-stone-900">Mi carrito</h1>
          <p className="text-stone-400 text-sm mt-1">{count} {count === 1 ? 'producto' : 'productos'}</p>
        </div>
        <button
          onClick={clearCart}
          className="text-sm text-red-500 hover:underline"
          aria-label="Vaciar carrito"
        >
          Vaciar carrito
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items list */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {items.map((item) => {
            const lineTotal = (item.price * item.quantity).toLocaleString('es-CO', {
              style: 'currency',
              currency: 'COP',
              maximumFractionDigits: 0,
            });

            return (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row gap-4 bg-white rounded-2xl p-4 border border-stone-100 shadow-sm"
              >
                {/* Image */}
                <div className="relative w-full sm:w-20 h-56 sm:h-20 rounded-xl overflow-hidden flex-shrink-0">
                  <Image
                    src={item.urlPhoto}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/catalogo/${item.id}`}
                    className="font-bold text-stone-800 hover:text-green-800 transition-colors line-clamp-1"
                  >
                    {item.name}
                  </Link>
                  <p className="text-stone-500 text-xs capitalize mt-0.5">{item.productType}</p>

                  <div className="flex items-center gap-3 mt-3">
                    {/* Quantity controls */}
                    <div className="flex items-center border border-stone-200 rounded-lg overflow-hidden">
                      <button
                        onClick={() => updateQty(item.id, item.quantity - 1)}
                        className="px-2.5 py-1 text-stone-600 hover:bg-stone-100 transition-colors text-sm"
                        aria-label="Reducir cantidad"
                      >
                        −
                      </button>
                      <span className="px-3 py-1 text-sm font-medium text-stone-700 min-w-[2rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQty(item.id, item.quantity + 1)}
                        className="px-2.5 py-1 text-stone-600 hover:bg-stone-100 transition-colors text-sm"
                        aria-label="Aumentar cantidad"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-xs text-red-400 hover:text-red-600 transition-colors ml-auto"
                      aria-label={`Eliminar ${item.name}`}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>

                {/* Price */}
                <div className="text-right flex-shrink-0">
                  <p className="font-bold text-stone-800 text-sm">{lineTotal}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-6 border border-stone-100 shadow-sm lg:sticky lg:top-24">
            <h2 className="font-bold text-stone-800 text-lg mb-4">Resumen</h2>

            <div className="flex justify-between text-sm text-stone-600 mb-2">
              <span>Subtotal ({count} productos)</span>
              <span>{formattedTotal}</span>
            </div>
            <div className="flex justify-between text-sm text-stone-400 mb-4">
              <span>Envío</span>
              <span>A confirmar</span>
            </div>
            <div className="border-t border-stone-100 pt-4 flex justify-between font-bold text-stone-900 mb-6">
              <span>Total estimado</span>
              <span className="text-green-800">{formattedTotal}</span>
            </div>

            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-green-700 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-bold transition-colors text-sm"
            >
              <span>💬</span> Confirmar por WhatsApp
            </a>
            <p className="text-xs text-stone-400 text-center mt-3">
              Te contactaremos para coordinar el pago y envío.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
