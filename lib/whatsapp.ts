const RAW_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '+573233728547';
const WA_NUMBER = RAW_NUMBER.replace(/[^0-9]/g, '');

export function buildWhatsAppUrl(message?: string): string {
  const text = message ? `?text=${encodeURIComponent(message)}` : '';
  return `https://wa.me/${WA_NUMBER}${text}`;
}

export function productWhatsAppUrl(productName: string): string {
  const msg = `Hola GreenPath! 🌿 Me interesa el producto *${productName}*. ¿Pueden darme más información y disponibilidad?`;
  return buildWhatsAppUrl(msg);
}

export function cartWhatsAppUrl(
  items: { name: string; quantity: number; price: number }[]
): string {
  const lines = items
    .map((i) => `• ${i.name} x${i.quantity} — $${(i.price * i.quantity).toLocaleString('es-CO')}`)
    .join('\n');
  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const msg = [
    'Hola GreenPath! 🌿 Quiero confirmar este pedido:',
    '',
    lines,
    '',
    `*Total: $${total.toLocaleString('es-CO')} COP*`,
    '',
    '¿Pueden confirmar disponibilidad y forma de envío?',
  ].join('\n');
  return buildWhatsAppUrl(msg);
}

export function generalWhatsAppUrl(): string {
  return buildWhatsAppUrl('Hola GreenPath! 🌿 Quiero asesoría para elegir una planta.');
}
