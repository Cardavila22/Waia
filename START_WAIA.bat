@echo off
setlocal
cd /d "%~dp0"

echo ============================================
echo             WAIA 2026 - INICIO
echo ============================================
echo.

where node >nul 2>nul
if errorlevel 1 (
  echo [ERROR] Node.js no esta instalado o no esta en PATH.
  echo Instala Node.js LTS y vuelve a intentarlo.
  pause
  exit /b 1
)

where npm >nul 2>nul
if errorlevel 1 (
  echo [ERROR] npm no esta disponible en PATH.
  pause
  exit /b 1
)

echo Node:
node -v
echo npm:
npm -v
echo.

if not exist package.json (
  echo [ERROR] No se encontro package.json.
  echo Ejecuta este archivo dentro de la carpeta raiz de WAIA.
  pause
  exit /b 1
)

if not exist node_modules\.bin\vite.cmd (
  echo [INFO] Vite no esta instalado correctamente.
  echo [INFO] Eliminando node_modules incompleto...
  if exist node_modules rmdir /s /q node_modules
  echo [INFO] Instalando dependencias...
  call npm install
  if errorlevel 1 (
    echo.
    echo [ERROR] npm install fallo.
    echo Copia el mensaje anterior y envialo para revisarlo.
    pause
    exit /b 1
  )
)

echo.
echo [OK] Dependencias encontradas.
echo [INFO] Iniciando Vite...
echo.
call npm run dev -- --host 127.0.0.1

if errorlevel 1 (
  echo.
  echo [ERROR] Vite no pudo iniciarse.
  echo Ejecuta en esta misma carpeta: npm install
  echo y despues: npm run dev
  pause
  exit /b 1
)

endlocal
