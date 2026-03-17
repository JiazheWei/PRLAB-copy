@echo off
REM Lab Members Data Update Script
REM Run this script to manually update members-data.js from markdown files

echo.
echo ========================================
echo   Lab Members Data Update Script
echo ========================================
echo.

python generate_members_data.py

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo   Update completed successfully!
    echo ========================================
    echo.
    echo Next steps:
    echo   1. Review the changes in assets/js/members-data.js
    echo   2. git add assets/js/members-data.js people/
    echo   3. git commit -m "Update members"
    echo.
) else (
    echo.
    echo ========================================
    echo   Error occurred during update!
    echo ========================================
    echo.
    echo Please check the error messages above and fix the issues.
    echo.
)

pause

