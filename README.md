# WAIA — Arquitectura final

Plataforma turística digital para conectar viajeros con experiencias auténticas de Nicaragua.

## Stack
- Frontend: React + Vite
- Navegación: React Router
- UI: Bootstrap + Material UI + CSS
- Mapas: React Leaflet
- Backend: PHP nativo
- API: REST + JSON
- Base de datos: MySQL
- Administración/modelado: MySQL Workbench

## Evolución
Durante el hackathon, el Frontend puede funcionar con datos locales y localStorage. La arquitectura queda preparada para evolucionar a **React → API REST PHP → MySQL**.

## Próximo paso
1. Diseñar el esquema MySQL.
2. Crear conexión PDO.
3. Implementar endpoint de experiencias.
4. Conectar `services/api.js`.
5. Migrar progresivamente reservas, usuarios y catálogo.

## UI/UX Premium — versión Hackathon

La interfaz combina de forma intencional:

- **Material UI** para componentes, iconografía y comportamiento responsive.
- **MUI X Date Pickers** para la selección profesional de fechas en reservas.
- **Tailwind CSS v4** para utilidades visuales y composición rápida.
- **Bootstrap 5 / React-Bootstrap** para la grilla y compatibilidad del proyecto existente.
- CSS propio de WAIA para la identidad visual: rojo `#D50F35`, negro, blanco, superficies suaves, bordes sutiles y microinteracciones.

### Instalación

```bash
npm install
npm run dev
```

El proyecto no debe ejecutarse con `npm ci` sobre un lockfile antiguo: esta versión incorpora dependencias nuevas de UI y `npm install` debe generar el lockfile correspondiente.
