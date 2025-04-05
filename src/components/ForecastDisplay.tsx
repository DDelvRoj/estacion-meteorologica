import React from 'react';
import { ForecastData } from '../data/types';
import './ForecastDisplay.css';
import { IonLabel } from '@ionic/react';

interface ForecastDisplayProps {
  forecast: ForecastData;
}

const ForecastDisplay: React.FC<ForecastDisplayProps> = ({ forecast }) => {
  return (
    <div className="forecast-container">
      
      
      <div className="forecast-summary">
        {forecast.dayOfWeek.map((day, index) => (
          <IonLabel key={index} className="forecast-day ion-text-center">
            <h3>{day}</h3>
            <h1>
              <strong>{forecast.calendarDayTemperatureMax[index]}°C</strong>
            </h1>
            <h2>
               {forecast.calendarDayTemperatureMin[index]}°C
            </h2>
            <h4>
              {forecast.narrative[index]}
            </h4>

            {/* Información detallada del daypart */}
            {false && forecast.daypart[0].daypartName.map((part, i) => (
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
          </IonLabel>
        )).splice(1)}
      </div>
    </div>
  );
};

export default ForecastDisplay;
