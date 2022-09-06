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

    allPatterns: [],  // TODO: Why no make this a normal member variable ?

    playerScore: 0,

    successfulUserPatterns: 0,

  }

  clearedBoard: any = [
    false, false, false,
    false, false, false,
    false, false, false
  ];

  interval: any;
  intervalCount: any = 0;

  isIntervalRunning: any = true;

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


        var currentSolvingPattern = this.state.allPatterns[this.state.successfulUserPatterns ];
        if (currentSolvingPattern.includes(i) == false) {
          console.log("Game Over!");
        } else {
          if (clicks == currentSolvingPattern.length) {

            console.log("Correct!")

            this.intervalCount = this.intervalCount + 1;  
            this.setState({
              clickedList: [...this.clearedBoard],
              successfulUserPatterns: this.state.successfulUserPatterns + 1,
              playerScore: this.state.playerScore + 100
            }, () => {

              // Un-pause this.interval  
              this.interval = setInterval(this.displayNewBoard, 2000); 
              this.isIntervalRunning = true;

              // TODO: Either use setInterval() or this.isIntervalRunning = true
              //       you don't need both. (i.e, remove isIntervalRunning)
           
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
    existingPatterns.push(newPattern); 
    


    this.setState({
      clickedList: newList,
      allPatterns: existingPatterns
    },
      // Function pointer to the future from the promise of .setState()
      () => {

        setTimeout(() => {
  
          this.setState({
            clickedList: [...this.clearedBoard]
          })
        }, 1000); 

        

        if (this.intervalCount == this.state.successfulUserPatterns) {
          // clearInterval(this.interval);
          this.isIntervalRunning = false;
        } 

        

      })

  }


  displayNewBoard = () => {

    if (this.isIntervalRunning) {

      var currentBoard = [];
      // 1. Generate a board 

      var numOfSquares = 1 + Math.floor(Math.random() * 4); // 1 - 5 (both inclusive)
      for (let j = 0; j < numOfSquares; j++) {
        var indexOfSquare = Math.floor(Math.random() * 9); // 0 - 8 (both inclusive)


        // Prevent duplicates 
        if (currentBoard.includes(indexOfSquare) === false) {
          currentBoard.push(indexOfSquare);
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

    // 4. Black out screen
    // setTimeout(this.displayNewBoard, 2000);
    // this.displayNewBoard();
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
            <p style={{ fontSize: 40, textAlign: 'center', marginTop: '10%' }}>Score: {this.state.playerScore}</p>
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
    console.log(this.intervalCount);

  }


}; export default Home;
