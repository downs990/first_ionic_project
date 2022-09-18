import React, { Component } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonToast } from '@ionic/react';
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
  frames: any = 0;
  toastMessage: any = "";


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
    if (this.isIntervalRunning && this.frames % 250 == 0) {


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

  // TODO: how to update toast message ?
  makeToast = (msg: any) => {
    return (<IonToast isOpen={true} message={"toast: " + msg}  />)

  }

  
  debugMessages = () => {
    let msg1 = ""
    let msg2 = ""
 
    let t = new Array(9)
    if(this.state.clickedList.length > 0){ 

          for(let i = 0; i < this.state.clickedList.length; i++){
             if(this.state.clickedList[i]){
                t[i] = "true"
             }else{
                t[i] = "false"
             }
          }
    }

    
    let p = []
    for(let i = 0; i < this.state.allPatterns.length; i++){ 
      p.push(<div> [ {this.state.allPatterns[i].toString()} ] </div> )
      
    }

    return (
    <div>
      clicked -- <br/> 
      {t[0]}, {t[1]}, {t[2]}, <br/>
      {t[3]}, {t[4]}, {t[5]}, <br/>
      {t[6]}, {t[6]}, {t[7]}, <br/>

      <br/>
      allPatterns -- <br/> 
      {
        p
      } 
      

    </div>
    )

  }

  render() {

    console.log(this.state.clickedList)

    
    let msg = "clicked: " + this.state.clickedList.toString()+ "\n" + this.state.allPatterns.toString()


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

           
          { 

              //  this.makeToast(msg)
              this.debugMessages()
          }

        </IonContent>
      </IonPage>
    );

  }


  componentDidMount() {
    this.interval = setInterval(this.displayNewBoard, 10);

  }

  componentWillUnmount() {
    clearInterval(this.interval);

  }

  componentDidUpdate() {
    console.log(this.currentIntervalIndex);

  }


}; export default Home;
