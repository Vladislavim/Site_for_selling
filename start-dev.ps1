$stdout = Join-Path $PSScriptRoot '.vite-dev.log'
$stderr = Join-Path $PSScriptRoot '.vite-dev.err.log'

if (Test-Path $stdout) {
  Remove-Item $stdout -Force
}

if (Test-Path $stderr) {
  Remove-Item $stderr -Force
}

$proc = Start-Process -FilePath 'cmd.exe' `
  -ArgumentList '/c', 'run-dev.cmd' `
  -WorkingDirectory $PSScriptRoot `
  -RedirectStandardOutput $stdout `
  -RedirectStandardError $stderr `
  -PassThru

Write-Output "PID=$($proc.Id)"
