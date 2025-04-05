import type React from "react"
import { IonCard, IonCardContent, IonGrid, IonRow, IonCol, IonText, IonIcon } from "@ionic/react"
import type { WeatherData } from "../data/types"
import { locationOutline } from "ionicons/icons"
import { WeatherProperty } from "./WeatherProperty"

interface CurrentWeatherProps {
  currentWeather: WeatherData
}

export const CurrentWeather: React.FC<CurrentWeatherProps> = ({ currentWeather }) => {
  const observation = currentWeather.observations[0]

  // Determine weather condition based on temperature
  const getWeatherCondition = (temp: number) => {
    if (temp > 30) return "Parcialmente Nublado"
    if (temp > 25) return "Soleado"
    if (temp > 20) return "Despejado"
    if (temp > 15) return "Nublado"
    return "Fresco"
  }

  const weatherCondition = getWeatherCondition(observation.metric.temp)

  return (
    <div className="ion-padding">
      <IonCard className="ion-no-margin">
        <IonCardContent>
          <div className="ion-text-center">
            <h1
              style={{
                fontSize: "1.8rem",
                fontWeight: "bold",
                color: "var(--ion-color-primary)",
                margin: "0 0 8px 0",
              }}
            >
              Estación Meteorológica FPUNE
            </h1>

            <div className="location-text">
              <IonIcon icon={locationOutline} />
              <span>Ciudad del Este, Paraguay</span>
            </div>

            <IonText color="medium">
              <p style={{ margin: "4px 0 16px 0" }}>
                Última Actualización:{" "}
                {new Date(observation.obsTimeLocal).toLocaleTimeString("es-ES", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </IonText>

            <div className="temperature-large">{observation.metric.temp.toFixed(1)}°C</div>

            <div className="weather-condition">{weatherCondition}</div>
          </div>

          <IonGrid>
            <IonRow>
              <IonCol size="6" sizeMd="3">
                <WeatherProperty type="feelsLike" currentWeather={currentWeather} />
              </IonCol>

              <IonCol size="6" sizeMd="3">
                <WeatherProperty type="wind" currentWeather={currentWeather} />
              </IonCol>

              <IonCol size="6" sizeMd="3">
                <WeatherProperty type="indexUV" currentWeather={currentWeather}/>
              </IonCol>

              <IonCol size="6" sizeMd="3">
                <WeatherProperty type="pressure" currentWeather={currentWeather}  />
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonCardContent>
      </IonCard>
    </div>
  )
}

