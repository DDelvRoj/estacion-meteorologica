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
} from "@ionic/react"
import { useEffect, useState } from "react"
import { SkeletonDashboard } from "../components/SkeletonDashboard"
import { refreshOutline } from "ionicons/icons"
import { CurrentWeather } from "../components/CurrentWeather"
import type { WeatherData } from "../data/types"
import { ErrorDisplay } from "../components/ErrorDisplay"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://estacion-metereologica-server.onrender.com"

const Tab1 = () => {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean>(false)

  useEffect(() => {
    fetchWeatherData()
  }, [])

  const fetchWeatherData = async () => {
    setLoading(true)
    setError(false)
    try {
      const currentResponse = await fetch(`${API_BASE_URL}/api/current-weather`)
      if (!currentResponse.ok) {
        throw new Error("HTTP error " + currentResponse.status)
      }
      const currentData = await currentResponse.json()

      if (currentData.observations && currentData.observations[0]) {
        setCurrentWeather(currentData)
      } else {
        throw new Error("No data observations found")
      }
    } catch (err) {
      console.error("Error fetching current weather:", err)
      setError(true)
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
        ) : error ? (
          <ErrorDisplay
            title="Estación Fuera de Línea"
            message="No pudimos conectar con la estación meteorológica en vivo. Puedes consultar el pronóstico de 5 días en la otra sección."
            onRetry={fetchWeatherData}
            secondaryAction={{
              label: "Ver Pronóstico (5 Días)",
              routerLink: "/tab2"
            }}
          />
        ) : (
          currentWeather && <CurrentWeather currentWeather={currentWeather} />
        )}
      </IonContent>
    </IonPage>
  )
}

export default Tab1
