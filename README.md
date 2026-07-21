# 🌤️ Estación Meteorológica FPUNE & Pronóstico del Tiempo

Aplicación web y móvil desarrollada para la **Facultad Politécnica de la Universidad Nacional del Este (FPUNE)** - Ciudad del Este, Paraguay. Permite monitorear datos meteorológicos en tiempo real provenientes de la estación PWS local y consultar el pronóstico extendido a 5/6 días respaldado por The Weather Company Data API.

---

## 🏛️ Identidad Institucional
El proyecto integra la identidad de la **Facultad Politécnica - UNE** incorporando su isotipo oficial en la cabecera principal de monitoreo en vivo y en la tarjeta destacada de pronóstico.

---

## 🚀 Características Principales

### 📡 1. Estación Meteorológica en Vivo (Tab 1)
- **Monitoreo en Tiempo Real**: Visualización de temperatura en °C, sensación térmica, dirección y velocidad del viento, presión atmosférica e índice UV de la estación PWS FPUNE.
- **Manejo de Errores y Reconexión**: Pantalla de error amigable con botón de reintento en caso de desconexión del servidor backend.

### 📅 2. Pronóstico Meteorológico & Astronómico (Tab 2)
- **Diseño Responsive Premium**: Optimizado para teléfonos móviles, tablets y monitores de escritorio (con vista en cuadrícula de 2 columnas en pantallas grandes).
- **Hero Card de Hoy con Glassmorphism**: Muestra clima del día con gradientes dinámicos según el estado del tiempo (tormentas, soleado, nublado, etc.).
- **Mapeo de Iconos TWC**: Traducción de códigos numéricos de Weather Channel a iconos vectoriales de Ionicons.
- **Visualizador de Rango Térmico**: Barra visual Mín ─── Máx calculada proporcionalmente entre todos los días de la semana.
- **Desglose Día vs. Noche**: Detalles por turnos con humedad relativa (%), viento en km/h + dirección cardinal (ej. OSO, SSE), e índice UV categorizado por nivel de severidad.
- **Widget Astronómico (Sol & Luna)**: Fases lunares en español (*"Cuarto creciente"*, *"Gibosa creciente"*) y horarios locales de salida/puesta de Sol y Luna.
- **Acumulados de Lluvia**: Alerta visual de milímetros de agua esperados (`qpfRain`).

---

## 🛠️ Tecnologías Utilizadas

- **Frontend Core**: React 18 + TypeScript + Vite.
- **Framework UI**: Ionic React (`@ionic/react`) + Ionicons.
- **Cross-Platform**: Capacitor 6 (soporte Android / iOS / Web).
- **Backend API**: Node.js / Express server que consume APIs de Personal Weather Station & Weather Company Data API.

---

## 💻 Instalación y Ejecución Local

### Prerrequisitos
- Node.js (v18 o superior)
- npm o yarn

### Pasos

1. **Clonar el repositorio:**
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd estacion-meteorologica
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno (opcional):**
   Crea un archivo `.env` en la raíz si deseas cambiar la dirección del backend:
   ```env
   VITE_API_BASE_URL=http://localhost:3000
   ```

4. **Ejecutar servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   Accede a la app en `http://localhost:8100` o `http://localhost:5173`.

5. **Compilar para Producción:**
   ```bash
   npm run build
   ```

---

## 📁 Estructura del Proyecto

```text
src/
├── components/
│   ├── CurrentWeather.tsx      # Componente de la estación en vivo
│   ├── ForecastDisplay.tsx     # Vista principal de pronóstico (Hero + Días + Astro)
│   ├── ForecastDisplay.css     # Estilos responsive mobile-first y dark mode
│   ├── ErrorDisplay.tsx        # Pantalla de error y reconexión
│   └── WeatherProperty.tsx     # Tarjetas de métricas individuales
├── data/
│   └── types.ts                # Tipos de TypeScript (ForecastData, Daypart, Observation)
├── pages/
│   ├── Tab1.tsx                # Página de Estación Meteorológica
│   ├── Tab2.tsx                # Página de Pronóstico del Tiempo
│   └── Tab3.tsx                # Información adicional / créditos
├── utils/
│   └── weatherIconUtils.ts     # Mapeador de códigos TWC a iconos y colores
└── theme/
    └── variables.css           # Variables de Ionic y estilos globales
```

---

## 👨‍🎓 Créditos

Desarrollado para la **Facultad Politécnica - Universidad Nacional del Este (FPUNE)**  
*Ciudad del Este - Paraguay*
