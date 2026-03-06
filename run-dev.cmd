@echo off
setlocal
set "ROOT=%~dp0"
set "PATH=%ROOT%.tools\node-v24.14.0-win-x64;%PATH%"
call "%ROOT%.tools\node-v24.14.0-win-x64\npm.cmd" run dev -- --host 127.0.0.1 --port 5173
