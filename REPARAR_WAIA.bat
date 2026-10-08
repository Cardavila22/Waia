@echo off
setlocal
cd /d "%~dp0"
echo ============================================
echo          REPARAR DEPENDENCIAS WAIA
 echo ============================================
echo.
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del /f /q package-lock.json
call npm cache verify
call npm install
if errorlevel 1 (
  echo.
  echo [ERROR] No fue posible instalar las dependencias.
  pause
  exit /b 1
)
echo.
echo [OK] Dependencias reinstaladas.
echo Ahora ejecuta: npm run dev
pause
endlocal
