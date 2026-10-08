# WAIA — Arquitectura de navegación

Este paquete agrega la estructura base para evolucionar WAIA hacia una SPA con React Router.

## 1. Dependencia

Desde la raíz del proyecto:

```bash
npm install react-router-dom
```

## 2. Carpetas nuevas

- `src/pages/`
- `src/routes/`
- `src/data/departmentsData.js`

## 3. Rutas

- `/`
- `/departamentos`
- `/departamentos/:slug`
- `/experiencias/:slug`
- `/reservas`
- `/favoritos`
- `/contacto`
- `*` → 404

## 4. Componentes existentes

Se conservan los componentes que ya tienes:

- Header
- Hero
- ExperienceCard
- FilterBar
- Footer
- DetailModal (temporalmente)

## 5. Importante antes de reemplazar App.jsx y main.jsx

Si tu proyecto actual ya tiene `ThemeProvider`, `Toaster`, Material UI, React Hot Toast, React Leaflet u otros providers, integra el `BrowserRouter` sin eliminar esos providers.

## 6. Próximo paso

Agregar `slug` y `departmentSlug` a `experiencesData.js`, por ejemplo:

```js
{
  id: 1,
  title: "Volcán Cerro Negro",
  slug: "volcan-cerro-negro",
  department: "León",
  departmentSlug: "leon",
  category: "Naturaleza y Aventura",
  price: {
    nio: 1800,
    usd: 49
  }
}
```

Luego `ExperienceCard` navegará a:

`/experiencias/volcan-cerro-negro`

La base de datos sigue siendo una mejora futura; actualmente los datos y reservas permanecen en el frontend/localStorage.
