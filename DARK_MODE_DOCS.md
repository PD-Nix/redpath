# 🌙 Implementación de Modo Oscuro - GreenPath

## ¿Qué se implementó?

Se ha agregado soporte completo para modo oscuro en la aplicación GreenPath. Los usuarios pueden ahora:

1. **Elegir manualmente** entre modo claro, oscuro o automático (del sistema)
2. **Transiciones suaves** entre temas
3. **Respeto al `prefers-color-scheme`** del dispositivo
4. **Persistencia** - La preferencia se guarda en localStorage

## Archivos Creados

### 1. **ThemeContext.tsx** - Gestión del Tema
- Nuevo context provider para manejar el estado del tema
- Almacena la preferencia en localStorage
- Escucha cambios en `prefers-color-scheme` del sistema
- Proporciona el hook `useTheme()` para acceder al tema en cualquier componente

**Ubicación:** `app/components/ThemeContext.tsx`

**Uso:**
```tsx
import { useTheme } from './ThemeContext';

export function MyComponent() {
  const { theme, setTheme, isDark } = useTheme();
  
  return (
    <button onClick={() => setTheme('dark')}>
      Cambiar a oscuro
    </button>
  );
}
```

**Temas disponibles:**
- `'light'` - Modo claro forzado
- `'dark'` - Modo oscuro forzado
- `'system'` - Sigue la preferencia del dispositivo

### 2. **tailwind.config.ts** - Configuración de Tailwind
- Configura el modo oscuro con estrategia `'class'`
- Define el contenido para purga de CSS
- Extiende los colores base

## Archivos Modificados

### 1. **Providers.tsx**
```tsx
export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <CartProvider>{children}</CartProvider>
    </ThemeProvider>
  );
}
```
- Envuelve la aplicación con `ThemeProvider`

### 2. **layout.tsx**
- Agregado `suppressHydrationWarning` para evitar warnings
- Actualizado className del body con:
  - `dark:bg-slate-950` - Fondo oscuro
  - `dark:text-stone-100` - Texto oscuro
  - `transition-colors` - Transición suave

### 3. **globals.css**
- Agregada clase `.dark` al html element
- Variables CSS dinámicas para colores
- Transición de 300ms para cambios suaves

### 4. **Navbar.tsx**
- ✅ Nuevo botón de toggle de tema (☀️ 🌙 ⚙️)
- ✅ Selector visual en móvil
- ✅ Estilos oscuros en:
  - Header y bordes
  - Links y hover states
  - Icono del carrito
  - Menú móvil

### 5. **Footer.tsx**
- ✅ Estilos oscuros completos
- ✅ Bordes y enlaces con variantes oscuras

### 6. **ProductCard.tsx**
- ✅ Fondo de tarjeta: `dark:bg-slate-800`
- ✅ Bordes: `dark:border-slate-700`
- ✅ Texto: `dark:text-stone-100`
- ✅ Sombras mejoradas en modo oscuro

### 7. **Badge.tsx**
- ✅ Todos los badges con variantes oscuras:
  - Emerald, Amber, Red, Green, Violet, Blue, Stone
  - Contraste apropiado en ambos modos

## Cómo Funciona

1. **En la primera carga:**
   - Busca la preferencia guardada en localStorage
   - Si no la encuentra, usa `system` (respeta `prefers-color-scheme`)
   - Aplica la clase `dark` al `<html>`

2. **Cuando el usuario cambia de tema:**
   - Guarda la nueva preferencia en localStorage
   - Aplica o quita la clase `dark` del `<html>`
   - Todos los elementos con `dark:` se actualizan automáticamente

3. **Si el sistema cambia `prefers-color-scheme`:**
   - Solo afecta si el usuario tiene `system` seleccionado
   - Los cambios se aplican en tiempo real

## Usar en Nuevos Componentes

Para agregar estilos oscuros en nuevos componentes:

```tsx
{/* Ejemplo básico */}
<div className="bg-white dark:bg-slate-800 text-stone-900 dark:text-stone-100">
  {/* Contenido */}
</div>

{/* Con transición */}
<button className="bg-green-700 dark:bg-green-600 transition-colors">
  Acción
</button>

{/* Estructura de colores oscuros recomendados */}
Fondo: dark:bg-slate-950 o dark:bg-slate-900
Tarjetas: dark:bg-slate-800
Bordes: dark:border-slate-700
Texto: dark:text-stone-100 o dark:text-stone-300
Hover: dark:hover:bg-slate-700
```

## Navegación del Toggle (Mobile)

El menú móvil incluye un selector visual:

```
┌─────────────────────────┐
│ Tema     ☀️ 🌙 ⚙️        │
│          [S][D][O]      │ (S=Sistema, D=Dark, O=Oscuro)
└─────────────────────────┘
```

El tema actual está resaltado en verde.

## Navegación del Toggle (Desktop)

En el navbar, a la izquierda del carrito, hay un botón que cambia:
- ☀️ (amarillo) - Modo claro activo
- 🌙 (gris) - Modo oscuro activo  
- ⚙️ (gris) - Sistema (usa `prefers-color-scheme`)

Hacer click lo cambia secuencialmente: claro → oscuro → sistema → claro...

## Próximos Pasos Opcionales

Si quieres mejorar aún más el modo oscuro:

1. **Agregar transiciones a más elementos**
   ```css
   transition: background-color 0.3s ease, color 0.3s ease;
   ```

2. **Personalizar colores específicos por tema**
   - Crear una paleta en `tailwind.config.ts`

3. **Prefers-reduced-motion**
   ```tsx
   @media (prefers-reduced-motion: reduce) {
     * { transition: none !important; }
   }
   ```

4. **Sincronizar con localStorage de forma más robusta**
   - Agregar debouncing en los cambios

## Compatibilidad

- ✅ Navegadores modernos (Chrome, Firefox, Safari, Edge)
- ✅ Modo oscuro del SO
- ✅ Preferencia manual del usuario
- ✅ Persistencia entre sesiones

---

**¿Preguntas?** El ThemeProvider maneja todo automáticamente. Solo usa `useTheme()` en componentes cliente.
