import React from 'react';
import { ForecastData } from '../data/types';
import { getWeatherIconMeta, formatTimeLocal } from '../utils/weatherIconUtils';
import './ForecastDisplay.css';
import {
  IonCard,
  IonCardContent,
  IonIcon,
  IonBadge,
} from '@ionic/react';
import {
  sunnyOutline,
  moonOutline,
  waterOutline,
  speedometerOutline,
  arrowUpOutline,
  arrowDownOutline,
} from 'ionicons/icons';

interface ForecastDisplayProps {
  forecast: ForecastData;
}

/** Helper: get UV level class */
function uvLevelClass(index: number | null): string {
  if (index === null || index === undefined) return 'uv-low';
  if (index <= 2) return 'uv-low';
  if (index <= 5) return 'uv-moderate';
  if (index <= 7) return 'uv-high';
  return 'uv-extreme';
}

/** Helper: build a temperature bar position (0-100%) from global min/max range */
function tempBarStyle(min: number | null, max: number | null, globalMin: number, globalMax: number) {
  const range = globalMax - globalMin || 1;
  const left = min !== null ? ((min - globalMin) / range) * 100 : 0;
  const right = max !== null ? ((max - globalMin) / range) * 100 : 100;
  return {
    left: `${Math.max(0, left)}%`,
    width: `${Math.max(8, right - left)}%`,
  };
}

const ForecastDisplay: React.FC<ForecastDisplayProps> = ({ forecast }) => {
  if (!forecast?.dayOfWeek?.length) {
    return (
      <div className="fc-empty">
        <p>No hay datos de pronóstico disponibles.</p>
      </div>
    );
  }

  const dp = forecast.daypart?.[0];

  // Compute global temp range for the temperature bar visualization
  const allMaxTemps = forecast.calendarDayTemperatureMax.filter((t): t is number => t !== null);
  const allMinTemps = forecast.calendarDayTemperatureMin.filter((t): t is number => t !== null);
  const globalMin = Math.min(...allMinTemps, ...allMaxTemps);
  const globalMax = Math.max(...allMaxTemps, ...allMinTemps);

  // Hero day info
  const heroIdx = 0;
  const heroDay = forecast.dayOfWeek[heroIdx];
  const heroMax = forecast.calendarDayTemperatureMax[heroIdx];
  const heroMin = forecast.calendarDayTemperatureMin[heroIdx] ?? forecast.temperatureMin[heroIdx];
  const heroNarr = forecast.narrative[heroIdx] || '';
  const heroRain = forecast.qpfRain?.[heroIdx] ?? forecast.qpf?.[heroIdx] ?? 0;
  const heroIconCode = dp?.iconCode?.[0] ?? dp?.iconCode?.[1];
  const heroPhrase = dp?.wxPhraseLong?.[0] ?? dp?.wxPhraseLong?.[1] ?? heroNarr;
  const heroMeta = getWeatherIconMeta(heroIconCode, heroPhrase);

  // Hero daypart metrics (prefer night turno if day is null)
  const heroDpIdx = dp?.daypartName?.[0] ? 0 : 1;
  const heroHumidity = dp?.relativeHumidity?.[heroDpIdx];
  const heroWind = dp?.windSpeed?.[heroDpIdx];
  const heroWindDir = dp?.windDirectionCardinal?.[heroDpIdx];
  const heroPrecipChance = dp?.precipChance?.[heroDpIdx];

  // Remaining days (skip index 0 for the "rest" list)
  const restDays = forecast.dayOfWeek.slice(1);

  return (
    <div className="fc-root">

      {/* ═══════ HERO CARD ═══════ */}
      <div className="fc-hero" style={{ background: heroMeta.gradient }}>
        <div className="fc-hero__top">
          <div className="fc-hero__info">
            <div className="fc-hero__brand">
              <img
                src="/assets/image.png"
                alt="Facultad Politécnica UNE"
                className="fc-hero__logo"
              />
              <div>
                <span className="fc-hero__badge">Hoy</span>
                <h2 className="fc-hero__day">{heroDay}</h2>
              </div>
            </div>
            <p className="fc-hero__condition">{heroMeta.label}</p>
          </div>
          <IonIcon icon={heroMeta.icon} className="fc-hero__icon" />
        </div>

        <div className="fc-hero__temps">
          <span className="fc-hero__temp-big">{heroMax ?? '--'}°</span>
          <span className="fc-hero__temp-small">/ {heroMin ?? '--'}°C</span>
        </div>

        <p className="fc-hero__narrative">{heroNarr}</p>

        <div className="fc-hero__metrics">
          <div className="fc-hero__metric">
            <IonIcon icon={waterOutline} />
            <div>
              <span className="fc-hero__metric-label">Lluvia</span>
              <span className="fc-hero__metric-value">{heroRain} mm</span>
            </div>
          </div>
          <div className="fc-hero__metric">
            <IonIcon icon={speedometerOutline} />
            <div>
              <span className="fc-hero__metric-label">Humedad</span>
              <span className="fc-hero__metric-value">{heroHumidity ?? '--'}%</span>
            </div>
          </div>
          <div className="fc-hero__metric">
            <IonIcon icon={sunnyOutline} />
            <div>
              <span className="fc-hero__metric-label">Viento</span>
              <span className="fc-hero__metric-value">{heroWind ?? '--'} km/h {heroWindDir ?? ''}</span>
            </div>
          </div>
          <div className="fc-hero__metric">
            <IonIcon icon={moonOutline} />
            <div>
              <span className="fc-hero__metric-label">Precip.</span>
              <span className="fc-hero__metric-value">{heroPrecipChance ?? '--'}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════ ASTRO BAR (TODAY) ═══════ */}
      <div className="fc-astro-bar">
        <div className="fc-astro-bar__item">
          <IonIcon icon={sunnyOutline} className="fc-astro-bar__icon fc-astro-bar__icon--sun" />
          <div className="fc-astro-bar__text">
            <span className="fc-astro-bar__label">Amanecer</span>
            <span className="fc-astro-bar__time">{formatTimeLocal(forecast.sunriseTimeLocal[0])}</span>
          </div>
        </div>
        <div className="fc-astro-bar__divider" />
        <div className="fc-astro-bar__item">
          <IonIcon icon={sunnyOutline} className="fc-astro-bar__icon fc-astro-bar__icon--sunset" />
          <div className="fc-astro-bar__text">
            <span className="fc-astro-bar__label">Atardecer</span>
            <span className="fc-astro-bar__time">{formatTimeLocal(forecast.sunsetTimeLocal[0])}</span>
          </div>
        </div>
        <div className="fc-astro-bar__divider" />
        <div className="fc-astro-bar__item">
          <IonIcon icon={moonOutline} className="fc-astro-bar__icon fc-astro-bar__icon--moon" />
          <div className="fc-astro-bar__text">
            <span className="fc-astro-bar__label">Luna</span>
            <span className="fc-astro-bar__time">{forecast.moonPhase[0]}</span>
          </div>
        </div>
      </div>

      {/* ═══════ SECTION TITLE ═══════ */}
      <h3 className="fc-section-title">Próximos Días</h3>

      {/* ═══════ DAILY FORECAST LIST ═══════ */}
      <div className="fc-days">
        {restDays.map((dayName, i) => {
          const dayIndex = i + 1;
          const maxT = forecast.calendarDayTemperatureMax[dayIndex];
          const minT = forecast.calendarDayTemperatureMin[dayIndex] ?? forecast.temperatureMin[dayIndex];
          const rainMm = forecast.qpfRain?.[dayIndex] ?? forecast.qpf?.[dayIndex] ?? 0;

          const dpDayIdx = dayIndex * 2;
          const dpNightIdx = dayIndex * 2 + 1;

          const dayIconCode = dp?.iconCode?.[dpDayIdx] ?? dp?.iconCode?.[dpNightIdx];
          const dayPhrase = dp?.wxPhraseLong?.[dpDayIdx] ?? dp?.wxPhraseLong?.[dpNightIdx];
          const meta = getWeatherIconMeta(dayIconCode, dayPhrase);

          const precipDay = dp?.precipChance?.[dpDayIdx] ?? 0;
          const precipNight = dp?.precipChance?.[dpNightIdx] ?? 0;
          const maxPrecip = Math.max(precipDay, precipNight);

          const barStyle = tempBarStyle(minT, maxT, globalMin, globalMax);

          return (
            <IonCard key={dayIndex} className="fc-day-card">
              <IonCardContent className="fc-day-card__content">
                {/* Row 1: Day Name + Icon + Temp Bar + Temps */}
                <div className="fc-day-card__row-main">
                  <div className="fc-day-card__left">
                    <IonIcon icon={meta.icon} className="fc-day-card__icon" style={{ color: meta.badgeColor === 'danger' ? '#e74c3c' : meta.badgeColor === 'primary' ? '#3880ff' : meta.badgeColor === 'warning' ? '#f0ad4e' : '#666' }} />
                    <div className="fc-day-card__name-block">
                      <span className="fc-day-card__name">{dayName}</span>
                      <span className="fc-day-card__phrase">{meta.label}</span>
                    </div>
                  </div>

                  <div className="fc-day-card__center">
                    <span className="fc-day-card__temp fc-day-card__temp--min">{minT ?? '--'}°</span>
                    <div className="fc-day-card__temp-bar-track">
                      <div className="fc-day-card__temp-bar-fill" style={barStyle} />
                    </div>
                    <span className="fc-day-card__temp fc-day-card__temp--max">{maxT ?? '--'}°</span>
                  </div>

                  <div className="fc-day-card__right">
                    {maxPrecip > 10 && (
                      <IonBadge className={`fc-precip-badge ${maxPrecip > 60 ? 'fc-precip-badge--high' : maxPrecip > 30 ? 'fc-precip-badge--med' : 'fc-precip-badge--low'}`}>
                        💧 {maxPrecip}%
                      </IonBadge>
                    )}
                  </div>
                </div>

                {/* Row 2: Detailed Daypart Metrics */}
                <div className="fc-day-card__details">
                  {/* Day turno */}
                  {dp?.daypartName?.[dpDayIdx] && (
                    <div className="fc-dp fc-dp--day">
                      <div className="fc-dp__header">
                        <IonIcon icon={sunnyOutline} className="fc-dp__icon fc-dp__icon--day" />
                        <span className="fc-dp__name">{dp.daypartName[dpDayIdx]}</span>
                        <span className="fc-dp__temp">{dp.temperature?.[dpDayIdx]}°C</span>
                      </div>
                      <div className="fc-dp__metrics">
                        <span className="fc-dp__metric">💧 {dp.relativeHumidity?.[dpDayIdx]}%</span>
                        <span className="fc-dp__metric">💨 {dp.windSpeed?.[dpDayIdx]} km/h {dp.windDirectionCardinal?.[dpDayIdx]}</span>
                        <span className={`fc-dp__metric fc-uv ${uvLevelClass(dp.uvIndex?.[dpDayIdx])}`}>
                          UV {dp.uvIndex?.[dpDayIdx]} ({dp.uvDescription?.[dpDayIdx]})
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Night turno */}
                  {dp?.daypartName?.[dpNightIdx] && (
                    <div className="fc-dp fc-dp--night">
                      <div className="fc-dp__header">
                        <IonIcon icon={moonOutline} className="fc-dp__icon fc-dp__icon--night" />
                        <span className="fc-dp__name">{dp.daypartName[dpNightIdx]}</span>
                        <span className="fc-dp__temp">{dp.temperature?.[dpNightIdx]}°C</span>
                      </div>
                      <div className="fc-dp__metrics">
                        <span className="fc-dp__metric">💧 {dp.relativeHumidity?.[dpNightIdx]}%</span>
                        <span className="fc-dp__metric">💨 {dp.windSpeed?.[dpNightIdx]} km/h {dp.windDirectionCardinal?.[dpNightIdx]}</span>
                        <span className={`fc-dp__metric fc-uv ${uvLevelClass(dp.uvIndex?.[dpNightIdx])}`}>
                          UV {dp.uvIndex?.[dpNightIdx]} ({dp.uvDescription?.[dpNightIdx]})
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Row 3: Astro mini-bar */}
                <div className="fc-day-card__astro">
                  <span>
                    <IonIcon icon={arrowUpOutline} className="fc-day-card__astro-icon" />
                    {formatTimeLocal(forecast.sunriseTimeLocal[dayIndex])}
                  </span>
                  <span>
                    <IonIcon icon={arrowDownOutline} className="fc-day-card__astro-icon" />
                    {formatTimeLocal(forecast.sunsetTimeLocal[dayIndex])}
                  </span>
                  <span className="fc-day-card__moon-phase">{forecast.moonPhase[dayIndex]}</span>
                  {rainMm > 0 && <span className="fc-day-card__rain-mm">{rainMm} mm</span>}
                </div>
              </IonCardContent>
            </IonCard>
          );
        })}
      </div>
    </div>
  );
};

export default ForecastDisplay;
