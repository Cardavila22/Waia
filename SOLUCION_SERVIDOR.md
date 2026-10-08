# WAIA — Solución al problema de `npm run dev`

## Qué estaba pasando

La copia que incluía `node_modules` tenía dependencias incompletas/copiadas desde otro sistema operativo. En particular, Vite no estaba disponible correctamente. Además, la configuración anterior de Vite usaba `__dirname` en un proyecto ESM (`"type": "module"`), lo que podía provocar otro error al cargar `vite.config.js`.

## Solución aplicada

- Se corrigió `vite.config.js` para usar `import.meta.url`.
- El proyecto no debe distribuir `node_modules`.
- Se agregó `START_WAIA.bat`, que comprueba Node/npm, instala dependencias si falta Vite y luego ejecuta Vite.
- Se agregó `REPARAR_WAIA.bat` para borrar dependencias incompletas y reinstalarlas desde cero.

## Ejecución normal

```bash
npm install
npm run dev
```

Luego abre:

```text
http://localhost:5173
```

## En Windows

Puedes abrir `START_WAIA.bat` con doble clic. Si la instalación está dañada, ejecuta primero `REPARAR_WAIA.bat`.

## Importante

No copies `node_modules` de otra computadora ni de una instalación hecha para otro sistema operativo. `npm install` debe crear las dependencias correspondientes al sistema donde se ejecuta WAIA.
