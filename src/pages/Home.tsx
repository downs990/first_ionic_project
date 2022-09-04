import React, {Component} from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react'; 
import Square from '../components/Square';
import './Home.css';
 
 
class Home extends Component{

  state: any = {};
  props: any = {};

  constructor(props:any){
    super(props);

    this.state = {

      clickedList:[
        false,false,false,
        false,true,false,
        false,false,false
      ]
    }
  }

  onClickMe = (clickedList: any) => {
        this.setState({
          clickedList: clickedList
        })
  };


  render(){

    return(
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
  
     
  
          <div className="score">
            <p style={{fontSize:40, textAlign:'center', marginTop:'10%'}}>Score: 0000</p>  
          </div>
  
  
          <div className="board">
            <div> 
              
              <Square number={0} clickedList={this.state.clickedList} onClickMe={this.onClickMe} />
              <Square number={1} clickedList={this.state.clickedList} onClickMe={this.onClickMe} />
              <Square number={2} clickedList={this.state.clickedList} onClickMe={this.onClickMe} />
            </div>
            <div>
              <Square number={3} clickedList={this.state.clickedList} onClickMe={this.onClickMe} />
              <Square number={4} clickedList={this.state.clickedList} onClickMe={this.onClickMe} />
              <Square number={5} clickedList={this.state.clickedList} onClickMe={this.onClickMe} />
            </div>
            <div>
              <Square number={6} clickedList={this.state.clickedList} onClickMe={this.onClickMe} />
              <Square number={7} clickedList={this.state.clickedList} onClickMe={this.onClickMe} />
              <Square number={8} clickedList={this.state.clickedList} onClickMe={this.onClickMe} />
            </div>
          </div> 
  
  
        </IonContent>
      </IonPage>
    );

  }

};export default Home;
 