
import './Square.css';

interface SquareProps {
    number: any,
    clickedList: any,
    onClickMe: any
}
 

function updateGUI(n: any, clickedList: any, onClickMe: any) {
  
    clickedList[n] = !clickedList[n];
    console.log(clickedList)

 
    onClickMe(clickedList); 
}





const Square: React.FC<SquareProps> = ({ number, clickedList, onClickMe }) => {
 
    var clicked = clickedList[number];
    var correctColor = "#000"
    if(clicked){
        correctColor = "#fff"
    }

    return (

        <button
            className="square"
            style={{ background: correctColor }} onClick={() => updateGUI(number, clickedList, onClickMe)}>
        </button>

    );
};

export default Square;
