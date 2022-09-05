import React, {Component} from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react'; 
import Square from '../components/Square';
import './Home.css';
 
 
class Home extends Component{

  state: any = {};
  props: any = {};

  constructor(props:any){
    // TODO: What should parent props come from?
    super(props);



    var listOfPatterns = this.generateListOfPatterns(100);
    var firstPattern = this.convertIndexesToClickedList(listOfPatterns[0]);

    this.state = {

      clickedList:firstPattern,

      allPatterns: listOfPatterns,

      lastDisplayedPatternIndex: 0,
       
      playerScore: 0
    }
 

    console.log(listOfPatterns[0]);

  }

  convertIndexesToClickedList = (arrayOfIndexes: any) => {
    
    var result = [
      false,false,false,
      false,false,false,
      false,false,false
    ];

    for(let i = 0; i < arrayOfIndexes.length; i++){
      result[ arrayOfIndexes[i] ] = true;
    }

    return result;
  }


  // TODO: Update logic to remove duplicates 
  generateListOfPatterns = (numOfPatterns: any) => {

    var listOfBoards = [];

    var numOfBoards = numOfPatterns;
    for(let i = 0; i < numOfBoards; i++){
      
        var numOfSquares = 1 + Math.floor(Math.random() * 4); // 1 - 5 (both inclusive)
        
        var currentBoard = [];
        for(let j = 0; j < numOfSquares; j++){
            var indexOfSquare = Math.floor(Math.random() * 10); // 0 - 9 (both inclusive)
            currentBoard.push(indexOfSquare);
        }
        listOfBoards.push(currentBoard);
        
    }
    
    return listOfBoards;
  }



  onClickMe = (newList: any) => {

        // TODO: Add all state variables when updating ?
        this.setState({
          clickedList: newList
        })
  };


  displayNewBoard = () => {

      // 1. Generate a board 
      var currentBoard = [];
      var numOfSquares = 1 + Math.floor(Math.random() * 4); // 1 - 5 (both inclusive)
      for(let j = 0; j < numOfSquares; j++){
          var indexOfSquare = Math.floor(Math.random() * 10); // 0 - 9 (both inclusive)
          currentBoard.push(indexOfSquare);
      }

      // 2. Convert to clickedMap
      var clickedMap = this.convertIndexesToClickedList(currentBoard);

      // 3. Update interface 
      this.onClickMe(clickedMap);

 

  }


  render(){

    setTimeout(this.displayNewBoard, 1000);
 
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
 