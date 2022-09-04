import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import Square from '../components/Square';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>

        {/* TODO: Add a 3x3 grid of 9 square buttons with random colors 
         
            0. Convert Home into a non functional component and give it a state.
            1. Add click logic and functionality. 
            2. Rebuild this in iOS and Android.

        */}
        {/* <ExploreContainer /> */}

        <div className="score">
          <p style={{fontSize:40, textAlign:'center', marginTop:'10%'}}>Score: 0000</p>  
        </div>


        <div className="board">
          <div>
            {/* <Square onClick={()=>{this.handleClick(0)} }/> */}
            <Square color={"#987090"}   />
            <Square color={"#fff"}/>
            <Square color={"#fff"} />
          </div>
          <div>
            <Square color={"#fff"} />
            <Square color={"#fff"} />
            <Square color={"#fff"} />
          </div>
          <div>
            <Square color={"#fff"} />
            <Square color={"#fff"} />
            <Square color={"#fff"} />
          </div>
        </div>


      </IonContent>
    </IonPage>
  );
};

export default Home;
