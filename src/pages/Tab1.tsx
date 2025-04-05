"use client"

import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
  IonRefresher,
  IonRefresherContent,
  IonLabel,
} from "@ionic/react"
import { useEffect, useState } from "react"
import { SkeletonDashboard } from "../components/SkeletonDashboard"
import { refreshOutline } from "ionicons/icons"
import { CurrentWeather } from "../components/CurrentWeather"
import type { WeatherData, ForecastData } from "../data/types"
import ForecastDisplay from "../components/ForecastDisplay"

const Tab1 = () => {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null)
  const [forecast, setForecast] = useState<ForecastData | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    fetchWeatherData()
  }, [])

  const fetchWeatherData = async () => {
    setLoading(true)
    try {
      // Fetch current weather
      const currentResponse = await fetch("https://estacion-metereologica-server.onrender.com/api/current-weather")
      const currentData = await currentResponse.json()

      if (currentData.observations && currentData.observations[0]) {
        setCurrentWeather(currentData)
      }

      // Fetch forecast data
      const forecastResponse = await fetch("https://estacion-metereologica-server.onrender.com/api/forecast")
      const forecastData = await forecastResponse.json()

      if (forecastData) {
        setForecast(forecastData)
      }
    } catch (error) {
      console.error("Error fetching weather data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleRefresh = async (event: CustomEvent) => {
    await fetchWeatherData()
    event.detail.complete()
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Estación Meteorológica</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={fetchWeatherData}>
              <IonIcon icon={refreshOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        {loading ? (
          <SkeletonDashboard />
        ) : (
          <>
            {currentWeather && <CurrentWeather currentWeather={currentWeather} />}
            {forecast && 
            <>
              <IonLabel className="ion-text-center">
                <h1>Pronóstico del Tiempo</h1>
              </IonLabel>
              <ForecastDisplay forecast={forecast} />
            </>
            }
          </>
        )}
      </IonContent>
    </IonPage>
  )
}

export default Tab1

