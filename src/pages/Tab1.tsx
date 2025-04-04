import { IonButton, IonButtons, IonCol, IonContent, IonHeader, IonIcon, IonLabel, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import { SkeletonDashboard } from '../components/SkeletonDashboard';
import { refreshOutline } from 'ionicons/icons';
import { CurrentWeather } from '../components/CurrentWeather';
import { WeatherData } from '../data/types';

const Tab1 = () => {

  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [localTime, setLocalTime] = useState<string>("");

  useEffect(() => {
    getCurrentPosition();
  }, []);

  const getCurrentPosition = async () => {
    setCurrentWeather(null);

    const coordenadaEstatica = {
      latitude: '-25.483902792541123',
      longitude: '-54.671193362970264'
    };
    getAddress(coordenadaEstatica);
  }

  const getAddress = async (coords: { latitude: string, longitude: string }) => {
    const query = `${coords.latitude},${coords.longitude}`;
    const response = await fetch(`https://estacion-metereologica-server.onrender.com/api/current-weather`);
    const data = await response.json();
    
    if (data.observations && data.observations[0]) {
      setCurrentWeather(data);
      setLocalTime(data.observations[0].obsTimeLocal); // Actualiza la hora local
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Clima</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => getCurrentPosition()}>
              <IonIcon icon={refreshOutline} color="primary" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Casa</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonRow className="ion-margin-start ion-margin-end ion-justify-content-center ion-text-center">
          <IonCol size="12">
            {localTime && 
              <IonLabel className='ion-padding'>
                <br/><br/>
                <h4>{`Última Actualización: ${(new Date(localTime)).toTimeString().split(' ')[0]}`}</h4>
              </IonLabel>
            }
          </IonCol>
        </IonRow>

        <div style={{ marginTop: "-1.5rem" }}>
          {currentWeather ? <CurrentWeather currentWeather={currentWeather} /> : <SkeletonDashboard />}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;

