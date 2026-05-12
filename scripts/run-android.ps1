$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
$env:JAVA_HOME = "C:\Program Files\Microsoft\jdk-17.0.19.10-hotspot"
$env:ANDROID_HOME = "C:\Users\LENOVO\AppData\Local\Android\Sdk"
$env:ANDROID_SDK_ROOT = $env:ANDROID_HOME
$env:Path = "$env:JAVA_HOME\bin;$env:ANDROID_HOME\platform-tools;$env:ANDROID_HOME\emulator;$env:ANDROID_HOME\cmdline-tools\latest\bin;$env:Path"

Set-Location $projectRoot

if (-not (Test-Path "$env:JAVA_HOME\bin\java.exe")) {
  throw "No se encontro Java 17 en $env:JAVA_HOME"
}

if (-not (Test-Path "$env:ANDROID_HOME\platform-tools\adb.exe")) {
  throw "No se encontro adb.exe en $env:ANDROID_HOME\platform-tools"
}

$status = try {
  Invoke-WebRequest -UseBasicParsing "http://localhost:8081/status" -TimeoutSec 2
} catch {
  $null
}

if (-not $status -or $status.Content -notmatch "packager-status:running") {
  Start-Process -FilePath "cmd.exe" -ArgumentList "/c npm start -- --port 8081" -WorkingDirectory $projectRoot -WindowStyle Hidden
  Start-Sleep -Seconds 5
}

$devices = (& adb devices) -join "`n"
if ($devices -notmatch "`tdevice") {
  $avdName = "IloCelebra_API35"
  Start-Process -FilePath "$env:ANDROID_HOME\emulator\emulator.exe" -ArgumentList "-avd $avdName"

  $ready = $false
  for ($i = 0; $i -lt 90; $i++) {
    Start-Sleep -Seconds 2
    $booted = try {
      (& adb shell getprop sys.boot_completed 2>$null) -join ""
    } catch {
      ""
    }
    if ($booted.Trim() -eq "1") {
      $ready = $true
      break
    }
  }

  if (-not $ready) {
    throw "El emulador no termino de iniciar. Abre Android Studio > Device Manager y ejecuta IloCelebra_API35."
  }
}

npx react-native run-android --no-packager
