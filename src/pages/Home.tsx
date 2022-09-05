import React, { Component } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Square from '../components/Square';
import './Home.css';


 

class Home extends Component {

  // state: any = {};
  // props: any = {};
  
  // constructor(props: any) {
  // TODO: What should parent props come from?
  // super(props);

  // this.state = {

  //   clickedList: [],
  //   allPatterns: [],
  //   lastDisplayedPatternIndex: 0,
  //   playerScore: 0
  // }

  // }


  state: any = {

    clickedList: [],

    allPatterns: [],

    lastDisplayedPatternIndex: 0,

    playerScore: 0
  }

  clearedBoard : any= [
    false, false, false,
    false, false, false,
    false, false, false
  ];
   

  convertIndexesToClickedList = (arrayOfIndexes: any) => {

    var result = [...this.clearedBoard]; // Deep copy clearedBoard

    for (let i = 0; i < arrayOfIndexes.length; i++) {
      result[arrayOfIndexes[i]] = true;
    }

    return result;
  }



  onClickMe = (newList: any) => {
 
    this.setState({
      clickedList: newList,
    }) 
  };


  // TODO: Update logic to remove duplicates 
  updateBoardState = (newList: any, newPattern: any) => {
    var existingPatterns = this.state.allPatterns;
    existingPatterns.push(newPattern);

    this.setState({
      clickedList: newList,
      allPatterns: existingPatterns
    }, 
    
    
    // Function pointer to the future from the promise of .setState()
    ()=>{

      setTimeout(()=>{

        this.setState({
          clickedList: this.clearedBoard
        })
      }, 1000);
      
    })

  }


  displayNewBoard = () => {


    var currentBoard = [];
    // 1. Generate a board 

    var numOfSquares = 1 + Math.floor(Math.random() * 4); // 1 - 5 (both inclusive)
    for (let j = 0; j < numOfSquares; j++) {
      var indexOfSquare = Math.floor(Math.random() * 10); // 0 - 9 (both inclusive)
      currentBoard.push(indexOfSquare);
    }


    var clickedMap = []; 

    // 2. Convert to clickedMap
    clickedMap = this.convertIndexesToClickedList(currentBoard);
 

    // 3. Update interface 
    this.updateBoardState(clickedMap, currentBoard);

  }


  componentDidMount(){

    setInterval(this.displayNewBoard, 2000);
    // console.log(this.state)
     
         
  }


  render() {

    // 4. Black out screen
    // setTimeout(this.displayNewBoard, 2000);
    console.log(this.state)
    


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



          <div className="score">
            <p style={{ fontSize: 40, textAlign: 'center', marginTop: '10%' }}>Score: 0000</p>
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

}; export default Home;
