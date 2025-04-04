import React from 'react';
import { ForecastData } from '../data/types';
import './ForecastDisplay.css';

interface ForecastDisplayProps {
  forecast: ForecastData;
}

const ForecastDisplay: React.FC<ForecastDisplayProps> = ({ forecast }) => {
  return (
    <div className="forecast-container">
      <h2>Pronóstico del Clima</h2>
      
      <div className="forecast-summary">
        {forecast.dayOfWeek.map((day, index) => (
          <div key={index} className="forecast-day">
            <h3>{day}</h3>
            <p>
              <strong>Máx: </strong> {forecast.calendarDayTemperatureMax[index]}°C
            </p>
            <p>
              <strong>Mín: </strong> {forecast.calendarDayTemperatureMin[index]}°C
            </p>
            <p>
              <strong>Clima: </strong> {forecast.narrative[index]}
            </p>
            <p>
              <strong>Amanecer: </strong> {forecast.sunriseTimeLocal[index]}
            </p>
            <p>
              <strong>Atardecer: </strong> {forecast.sunsetTimeLocal[index]}
            </p>

            {/* Información detallada del daypart */}
            {forecast.daypart[0].daypartName.map((part, i) => (
              <div key={i} className="daypart-details">
                <h4>{part}</h4>
                <p>
                  <strong>Temperatura: </strong> {forecast.daypart[0].temperature[i]}°C
                </p>
                <p>
                  <strong>Descripción: </strong> {forecast.daypart[0].narrative[i]}
                </p>
                <p>
                  <strong>Humedad: </strong> {forecast.daypart[0].relativeHumidity[i]}%
                </p>
                <p>
                  <strong>Viento: </strong> {forecast.daypart[0].windSpeed[i]} km/h {forecast.daypart[0].windDirectionCardinal[i]}
                </p>
                <p>
                  <strong>Índice UV: </strong> {forecast.daypart[0].uvIndex[i]} ({forecast.daypart[0].uvDescription[i]})
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastDisplay;
