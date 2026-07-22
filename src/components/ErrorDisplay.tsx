import React from 'react';
import { IonButton, IonIcon, IonCard, IonCardContent } from '@ionic/react';
import { cloudOfflineOutline, refreshOutline, calendarOutline } from 'ionicons/icons';
import './ErrorDisplay.css';

interface ErrorDisplayProps {
  title?: string;
  message?: string;
  onRetry: () => void;
  secondaryAction?: {
    label: string;
    routerLink?: string;
    onClick?: () => void;
  };
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  title = "Servidor Fuera de Línea",
  message = "No pudimos establecer conexión con la estación meteorológica. Por favor, verifica tu conexión o intenta nuevamente.",
  onRetry,
  secondaryAction,
}) => {
  return (
    <div className="error-container">
      <IonCard className="error-card">
        <IonCardContent className="error-content">
          <div className="error-icon-wrapper">
            <IonIcon icon={cloudOfflineOutline} className="error-main-icon" />
            <div className="pulse-ring"></div>
          </div>
          <h2 className="error-title">{title}</h2>
          <p className="error-message">{message}</p>
          
          <div className="error-actions">
            <IonButton className="retry-button" onClick={onRetry} expand="block" shape="round">
              <IonIcon slot="start" icon={refreshOutline} />
              Reintentar Conexión
            </IonButton>

            {secondaryAction && (
              <IonButton
                className="secondary-button"
                routerLink={secondaryAction.routerLink}
                onClick={secondaryAction.onClick}
                expand="block"
                fill="outline"
                shape="round"
              >
                <IonIcon slot="start" icon={calendarOutline} />
                {secondaryAction.label}
              </IonButton>
            )}
          </div>
        </IonCardContent>
      </IonCard>
    </div>
  );
};
