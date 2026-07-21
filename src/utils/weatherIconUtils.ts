import {
  sunnyOutline,
  thunderstormOutline,
  rainyOutline,
  cloudyOutline,
  cloudyNightOutline,
  partlySunnyOutline,
  moonOutline,
  snowOutline
} from 'ionicons/icons';

export interface WeatherIconMeta {
  icon: string;
  label: string;
  badgeColor: string;
  gradient: string;
}

export function getWeatherIconMeta(iconCode: number | null | undefined, phrase?: string | null): WeatherIconMeta {
  if (iconCode === null || iconCode === undefined) {
    return {
      icon: partlySunnyOutline,
      label: phrase || 'Tiempo variable',
      badgeColor: 'tertiary',
      gradient: 'linear-gradient(135deg, #4b6cb7 0%, #182848 100%)'
    };
  }

  // Mapeo según la documentación oficial TWC Icon Codes
  switch (iconCode) {
    case 0: // Tornado
    case 1: // Tormenta tropical
    case 2: // Huracán
    case 3: // Tormentas severas
    case 4: // Tormentas eléctricas
    case 37: // Tormentas aisladas
    case 38: // Tormentas dispersas
    case 47: // Chubascos con tormenta
      return {
        icon: thunderstormOutline,
        label: phrase || 'Tormentas eléctricas',
        badgeColor: 'danger',
        gradient: 'linear-gradient(135deg, #373B44 0%, #4286f4 100%)'
      };

    case 5: // Lluvia y nieve
    case 6: // Lluvia y aguanieve
    case 7: // Nieve y aguanieve
    case 13: // Flurries
    case 14: // Nieve ligera
    case 15: // Nieve con viento
    case 16: // Nieve
    case 17: // Granizo
    case 41: // Nieve pesada
    case 42: // Chubascos de nieve
    case 43: // Nieve fuerte
      return {
        icon: snowOutline,
        label: phrase || 'Nieve / Aguanieve',
        badgeColor: 'light',
        gradient: 'linear-gradient(135deg, #E0EAFC 0%, #CFDEF3 100%)'
      };

    case 8: // Llovizna helada
    case 9: // Llovizna
    case 10: // Lluvia congelante
    case 11: // Chubascos
    case 12: // Lluvia
    case 39: // Chubascos dispersos (día)
    case 40: // Lluvia fuerte
    case 45: // Chubascos dispersos (noche)
      return {
        icon: rainyOutline,
        label: phrase || 'Lluvia / Chubascos',
        badgeColor: 'primary',
        gradient: 'linear-gradient(135deg, #2b5876 0%, #4e4376 100%)'
      };

    case 19: // Polvo
    case 20: // Neblina
    case 21: // Calima
    case 22: // Humo
    case 26: // Nublado
    case 27: // Mayormente nublado (noche)
    case 28: // Mayormente nublado (día)
      return {
        icon: cloudyOutline,
        label: phrase || 'Nublado',
        badgeColor: 'medium',
        gradient: 'linear-gradient(135deg, #606c88 0%, #3f4c6b 100%)'
      };

    case 29: // Parcialmente nublado (noche)
    case 33: // Mayormente despejado (noche)
      return {
        icon: cloudyNightOutline,
        label: phrase || 'Noche parcialmente nublada',
        badgeColor: 'dark',
        gradient: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)'
      };

    case 30: // Parcialmente nublado (día)
    case 34: // Mayormente despejado (día)
      return {
        icon: partlySunnyOutline,
        label: phrase || 'Parcialmente nublado',
        badgeColor: 'warning',
        gradient: 'linear-gradient(135deg, #3a7bd5 0%, #3a6073 100%)'
      };

    case 31: // Despejado (noche)
      return {
        icon: moonOutline,
        label: phrase || 'Despejado',
        badgeColor: 'dark',
        gradient: 'linear-gradient(135deg, #141E30 0%, #243B55 100%)'
      };

    case 32: // Soleado (día)
    case 36: // Caluroso
      return {
        icon: sunnyOutline,
        label: phrase || 'Despejado / Soleado',
        badgeColor: 'warning',
        gradient: 'linear-gradient(135deg, #FF8008 0%, #FFC837 100%)'
      };

    default:
      return {
        icon: partlySunnyOutline,
        label: phrase || 'Tiempo variable',
        badgeColor: 'tertiary',
        gradient: 'linear-gradient(135deg, #3a7bd5 0%, #3a6073 100%)'
      };
  }
}

export function formatTimeLocal(isoString: string | undefined | null): string {
  if (!isoString) return '--:--';
  try {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } catch {
    return '--:--';
  }
}
