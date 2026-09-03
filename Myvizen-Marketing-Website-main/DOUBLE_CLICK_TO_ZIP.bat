@echo off
echo ===================================================
echo   MyVizen Zip Archive Generator
echo ===================================================
echo.
cd /d "%~dp0"
if exist "create-zip.js" (
    echo Found project. Generating ZIP file...
    node create-zip.js
    echo.
    echo Done! You will find "Myvizen-Marketing-Website.zip" in your Downloads folder.
) else (
    echo Error: Could not find "create-zip.js" script in this directory.
)
echo.
pause
