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
  //   playerScore: 0
  // }

  // }


  state: any = {

    clickedList: [],

    allPatterns: [],   

     
  }

  clearedBoard: any = [
    false, false, false,
    false, false, false,
    false, false, false
  ];

  interval: any;
  currentIntervalIndex: any = 0;
  isIntervalRunning: any = true; 


  intervalsToShow = 1;
  playerScore = 0;
 

  convertIndexesToClickedList = (arrayOfIndexes: any) => {

    var result = [...this.clearedBoard]; // Deep copy clearedBoard

    for (let i = 0; i < arrayOfIndexes.length; i++) {
      result[arrayOfIndexes[i]] = true;
    }

    return result;
  }


  checkUserInput = (newList: any) => {
    // Check solution entered
    var clicks = 0;
    for (let i = 0; i < newList.length; i++) {

      if (newList[i] == true) {
        clicks = clicks + 1;


        var currentSolvingPattern = this.state.allPatterns[this.currentIntervalIndex];
 

        if (currentSolvingPattern.includes(i) == false) {
          console.log("Game Over!");

          // TODO: Clear all variables and show game over message
          // TODO: Blits mode 

        } else {

          // Check if current pattern is solved.
          if (clicks == currentSolvingPattern.length) {


            this.currentIntervalIndex = this.currentIntervalIndex + 1;

            this.setState({
              clickedList: [...this.clearedBoard]
            }, () => {

              // Check if currentSolvingPattern is the last one that was generated
              if (this.currentIntervalIndex == this.intervalsToShow) {


                console.log("Correct!");
                this.currentIntervalIndex = 0;
                this.intervalsToShow += 1;
                this.playerScore +=  100;

                // Un-pause this.interval   
                this.isIntervalRunning = true;

              }  


            })


            console.log(this.state);
          }
        }
      }

    }
  }


  onClickMe = (newList: any) => {

    this.setState({
      clickedList: newList,
    })

    this.checkUserInput(newList);


  };



  updateBoardState = (newList: any, newPattern: any) => {

    var existingPatterns = this.state.allPatterns;

    // Only push new pattern if new pattern was generated.
    if(this.currentIntervalIndex == this.intervalsToShow - 1){
      existingPatterns.push(newPattern);
    }
      
     



    this.setState({
      clickedList: newList,
      allPatterns: existingPatterns
    },
      // Function pointer to the future from the promise of .setState()
      () => {

        setTimeout(() => {

          this.setState({
            clickedList: [...this.clearedBoard]
          },

            () => {
              this.currentIntervalIndex = this.currentIntervalIndex + 1;

              if (this.currentIntervalIndex == this.intervalsToShow) {
                // clearInterval(this.interval);
                this.currentIntervalIndex = 0;
                this.isIntervalRunning = false;
              }

            }

          )


        }, 1000);





      })

  }


  displayNewBoard = () => {

    if (this.isIntervalRunning) {


      var currentBoard = [];
      
      if(this.currentIntervalIndex < (this.intervalsToShow - 1)  && this.state.allPatterns.length != 0){ // generate a pattern for first round when allPatterns.length == 0
        
        // Display existing pattern 
        currentBoard = this.state.allPatterns[this.currentIntervalIndex ];

      } else { 
        // Generate new pattern 

        var numOfSquares = 1 + Math.floor(Math.random() * 4);   // 1 - 5 (both inclusive)
        for (let j = 0; j < numOfSquares; j++) {
          var indexOfSquare = Math.floor(Math.random() * 9);    // 0 - 8 (both inclusive)

          if (currentBoard.includes(indexOfSquare) === false) { // Prevent duplicates 
            currentBoard.push(indexOfSquare);
          }
        } 
      }
       
      


      var clickedMap = [];

      // 2. Convert to clickedMap
      clickedMap = this.convertIndexesToClickedList(currentBoard);


      // 3. Update interface 
      this.updateBoardState(clickedMap, currentBoard);
    }
  }




  render() {

    console.log(this.state.allPatterns)

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
            <p style={{ fontSize: 40, textAlign: 'center', marginTop: '10%' }}>Score: {this.playerScore}</p>
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


  componentDidMount() {
    this.interval = setInterval(this.displayNewBoard, 2000);

  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  componentDidUpdate() {
    console.log(this.currentIntervalIndex);

  }


}; export default Home;
