import type React from "react"
import { IonCard, IonCardContent, IonGrid, IonRow, IonCol, IonSkeletonText } from "@ionic/react"

export const SkeletonDashboard: React.FC = () => (
  <div className="ion-padding">
    <IonCard className="ion-no-margin">
      <IonCardContent>
        <div className="ion-text-center">
          <IonSkeletonText animated style={{ height: "2rem", width: "80%", margin: "0 auto 8px auto" }} />

          <IonSkeletonText animated style={{ height: "1.2rem", width: "60%", margin: "0 auto 16px auto" }} />

          <IonSkeletonText animated style={{ height: "4rem", width: "40%", margin: "16px auto" }} />

          <IonSkeletonText animated style={{ height: "1.2rem", width: "50%", margin: "0 auto 16px auto" }} />
        </div>

        <IonGrid>
          <IonRow>
            {[1, 2, 3, 4].map((item) => (
              <IonCol size="6" sizeMd="3" key={item}>
                <div className="weather-card">
                  <IonSkeletonText animated style={{ height: "2.5rem", width: "2.5rem", borderRadius: "50%" }} />
                  <IonSkeletonText animated style={{ height: "0.9rem", width: "80%", margin: "8px 0" }} />
                  <IonSkeletonText animated style={{ height: "1.5rem", width: "60%", margin: "4px 0" }} />
                </div>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonCardContent>
    </IonCard>

    <IonCard className="ion-no-margin ion-margin-top">
      <div className="tab-container">
        <div className="tab-button active">
          <IonSkeletonText animated style={{ height: "1rem", width: "80%" }} />
        </div>
        <div className="tab-button">
          <IonSkeletonText animated style={{ height: "1rem", width: "80%" }} />
        </div>
        <div className="tab-button">
          <IonSkeletonText animated style={{ height: "1rem", width: "80%" }} />
        </div>
      </div>

      <IonCardContent>
        <IonGrid>
          <IonRow>
            {[1, 2, 3].map((item) => (
              <IonCol size="12" sizeMd="4" key={item}>
                <div className="forecast-card">
                  <IonSkeletonText animated style={{ height: "1rem", width: "50%", margin: "0 auto 8px auto" }} />
                  <IonSkeletonText
                    animated
                    style={{ height: "2.5rem", width: "2.5rem", borderRadius: "50%", margin: "8px auto" }}
                  />
                  <IonSkeletonText animated style={{ height: "1.5rem", width: "40%", margin: "8px auto" }} />
                  <IonSkeletonText animated style={{ height: "1rem", width: "30%", margin: "4px auto" }} />
                  <IonSkeletonText animated style={{ height: "0.9rem", width: "60%", margin: "8px auto 0 auto" }} />
                </div>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonCardContent>
    </IonCard>
  </div>
)

