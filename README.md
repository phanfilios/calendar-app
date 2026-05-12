# Ilo Celebra

App movil en React Native para consultar la agenda del 56 aniversario de la Provincia de Ilo, Peru. Incluye actividades oficiales, eventos personales, calendario por categorias y modo claro/oscuro.

## Caracteristicas

- Agenda oficial precargada del 24 de abril al 31 de mayo de 2026.
- Dia central del aniversario de Ilo marcado el 26 de mayo.
- Calendario con puntos por categoria: protocolar, cultural, musica, turismo, familia, deporte, aniversario y personal.
- Eventos personales guardados localmente con AsyncStorage.
- Pantalla principal con resumen de actividades oficiales, eventos de la fecha y eventos personales.
- Pantallas de inicio, detalle, ajustes y creacion de eventos.
- Modo claro/oscuro persistente.
- Manejo defensivo de datos locales corruptos o pantallas abiertas sin parametros.
- Script de Android preparado para proyectos ubicados en OneDrive.


<img width="355" height="650" alt="image" src="https://github.com/user-attachments/assets/aeac019a-d085-47a3-b870-6476d59619a1" />
<img width="352" height="655" alt="image" src="https://github.com/user-attachments/assets/9e63a648-eb06-42d1-bc7d-e426128922f3" />
<img width="353" height="681" alt="image" src="https://github.com/user-attachments/assets/cd7fbf93-86e2-4cc8-96ae-0097695e3b41" />
<img width="340" height="631" alt="image" src="https://github.com/user-attachments/assets/309c9e13-e84c-4162-a19b-29646ef33fe8" />
<img width="347" height="628" alt="image" src="https://github.com/user-attachments/assets/5ba87983-2c12-47d5-b68b-04edc916d606" />


## Requisitos

- Node.js 16 o superior.
- Android Studio con SDK instalado.
- Java 17. El script de Android usa por defecto:
  `C:\Program Files\Microsoft\jdk-17.0.19.10-hotspot`
- Android SDK en:
  `C:\Users\LENOVO\AppData\Local\Android\Sdk`
- Un emulador llamado `IloCelebra_API35` o un dispositivo Android conectado.

## Instalacion

```bash
npm install
```

## Ejecutar en Android

```bash
npm run android
```

Este comando ejecuta `scripts/run-android.ps1`, que:

- Configura `JAVA_HOME`, `ANDROID_HOME` y `ANDROID_SDK_ROOT`.
- Levanta Metro en el puerto 8081 si no esta corriendo.
- Inicia el emulador `IloCelebra_API35` si no hay dispositivo conectado.
- Ejecuta `react-native run-android --no-packager`.
- Crea un junction para `node_modules/@react-native/gradle-plugin/build` fuera de OneDrive. Esto evita errores de Gradle como `not a regular file` cuando OneDrive convierte outputs de build en reparse points.

Si prefieres iniciar Metro manualmente:

```bash
npm start
```

Y luego en otra terminal:

```bash
npm run android
```

## Ejecutar en iOS

Se requiere macOS con Xcode:

```bash
npm run ios
```

## Verificacion

```bash
npm run lint
npm test -- --runInBand
```

Para verificar que Metro genera el bundle Android:

```bash
npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output "%TEMP%\ilo-celebra-test.bundle" --assets-dest "%TEMP%\ilo-celebra-assets"
```

Para verificar compilacion nativa Android:

```bash
cd android
gradlew.bat assembleDebug
```

## Notas tecnicas

- `metro.config.js` ignora `src/assets/icons/oracleJdk-26` porque esa carpeta no pertenece al bundle visual de la app y puede hacer mas lento o inestable el escaneo de Metro.
- El script de Android guarda los outputs del plugin Gradle de React Native en `%LOCALAPPDATA%\IloCelebra\rn-gradle-plugin-build` para evitar conflictos con OneDrive.
- La agenda oficial esta definida en `src/data/iloAnniversaryEvents.js`.

## Fuente de la agenda

El programa inicial fue tomado del PDF publico "56 Aniversario de la Provincia de Ilo" publicado en Y tu que planes. La app conserva el enlace en la pantalla de detalle de cada actividad oficial.

## Estructura

```text
App.js
index.js
scripts/
  run-android.ps1
src/
  assets/
  components/
  context/
  data/
  navigation/
  screens/
  styles/
  utils/
```
