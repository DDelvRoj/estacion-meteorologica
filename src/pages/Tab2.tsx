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
import { refreshOutline } from "ionicons/icons"
import type { ForecastData } from "../data/types"
import ForecastDisplay from "../components/ForecastDisplay"
import { SkeletonDashboard } from "../components/SkeletonDashboard"
import { ErrorDisplay } from "../components/ErrorDisplay"
import "./Tab2.css"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://estacion-metereologica-server.onrender.com"

const Tab2: React.FC = () => {
  const [forecast, setForecast] = useState<ForecastData | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean>(false)

  useEffect(() => {
    fetchForecastData()
  }, [])

  const fetchForecastData = async () => {
    setLoading(true)
    setError(false)
    try {
      const response = await fetch(`${API_BASE_URL}/api/forecast`)
      if (!response.ok) {
        throw new Error("HTTP error " + response.status)
      }
      const data = await response.json()
      if (data) {
        setForecast(data)
      } else {
        throw new Error("No forecast data returned")
      }
    } catch (err) {
      console.error("Error fetching forecast:", err)
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  const handleRefresh = async (event: CustomEvent) => {
    await fetchForecastData()
    event.detail.complete()
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Pronóstico del Tiempo</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={fetchForecastData}>
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
            title="Pronóstico No Disponible"
            message="No se pudo obtener el pronóstico meteorológico. Intenta reintentar la conexión."
            onRetry={fetchForecastData}
            secondaryAction={{
              label: "Volver a Estación",
              routerLink: "/tab1"
            }}
          />
        ) : (
          forecast && <ForecastDisplay forecast={forecast} />
        )}
      </IonContent>
    </IonPage>
  )
}

export default Tab2