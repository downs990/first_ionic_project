import React, { Component } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Square from '../components/Square';
import './Home.css';




class Home extends Component {


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
  gameOver = false;
  frames:any = 0


  convertIndexesToClickedList = (arrayOfIndexes: any) => {

    var result = [...this.clearedBoard]; // Deep copy clearedBoard

    for (let i = 0; i < arrayOfIndexes.length; i++) {
      result[arrayOfIndexes[i]] = true;
    }

    return result;
  }


  checkUserInput = () => {

    if (this.gameOver == false && this.isIntervalRunning == false) {
      // Check solution entered
      var clicks = 0;
      for (let i = 0; i < this.state.clickedList.length; i++) {

        if (this.state.clickedList[i] == true) {
          clicks = clicks + 1;


          var currentSolvingPattern = this.state.allPatterns[this.currentIntervalIndex];


          if (currentSolvingPattern.includes(i) == false) {
            console.log("Game Over!");

            this.gameOver = true;
            this.setState({})

          } else {


            // Check if current pattern is solved.
            if (clicks == currentSolvingPattern.length) {
              
              this.currentIntervalIndex = this.currentIntervalIndex + 1;
              this.threadSleep()

              this.setState({
                clickedList: [...this.clearedBoard]
              }, () => {

                // Check if currentSolvingPattern is the last one that was generated
                if (this.currentIntervalIndex == this.intervalsToShow && this.gameOver == false) {

                  console.log("Correct!");
                  this.currentIntervalIndex = 0;
                  this.intervalsToShow += 1;
                  this.playerScore += 100;
                  this.isIntervalRunning = true;
                }

              })

              console.log(this.state);
            }
          }
        }

      }
    }
  }


  onClickMe = (newList: any) => {

    if (this.gameOver == false) {

      this.setState({
        clickedList: newList,
      })


    }
  };



  updateBoardState = (newList: any, newPattern: any) => {

    var existingPatterns = this.state.allPatterns;

    // Only push new pattern if new pattern was generated.
    if (this.currentIntervalIndex == this.intervalsToShow - 1) {
      existingPatterns.push(newPattern);
    }


    this.setState({
      clickedList: newList,
      allPatterns: existingPatterns
    }, 
      () => {

        setTimeout(() => {

          this.setState({
            clickedList: [...this.clearedBoard]
          },

            () => {
              this.currentIntervalIndex = this.currentIntervalIndex + 1;

              if (this.currentIntervalIndex == this.intervalsToShow) { 
                this.currentIntervalIndex = 0;
                this.isIntervalRunning = false;
                
              }
            }
          )
        }, 1000);

      })

  }

  threadSleep = () => {
    for (let i = 0; i < 500000000; i++) {
      let x = i + i;
    }

  }


  displayNewBoard = () => {

    this.frames += 1

    // Check user input every frame 
    this.checkUserInput()

    // Display new board every 2 seconds or so 
    if (this.isIntervalRunning && this.frames % 25 == 0) {


      var currentBoard = [];

      if (this.currentIntervalIndex < (this.intervalsToShow - 1) && this.state.allPatterns.length != 0) { // generate a pattern for first round when allPatterns.length == 0

        // Display existing pattern 
        currentBoard = this.state.allPatterns[this.currentIntervalIndex];

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



  getLabel = () => {
    if (this.gameOver) {
      return "Game Over!"
    } else {
      return "Score: " + this.playerScore
    }
  }

  showBottomScore = () => {
    if (this.gameOver) {
      return "Score: " + this.playerScore
    } else {
      return ""
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
            <p style={{ fontSize: 40, textAlign: 'center', marginTop: '10%' }}>
              {this.getLabel()}
            </p>
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

          <div className="score">
            <p style={{ fontSize: 20, textAlign: 'center', marginTop: '5%' }}>
              {this.showBottomScore()}
            </p>
          </div>


        </IonContent>
      </IonPage>
    );

  }


  componentDidMount() {
    this.interval = setInterval(this.displayNewBoard, 100);

  }

  componentWillUnmount() {
    clearInterval(this.interval);

  }

  componentDidUpdate() {
    console.log(this.currentIntervalIndex);
  }


}; export default Home;
