import { Color } from '@ionic/core';
import './Square.css';

interface SquareProps { 
    color: any,
    // onClick: any
}

const Square: React.FC<SquareProps> = ({color}) => {
  return (

    <button className="square" style={{background:color}}>
         
    </button>

  );
};

export default Square;
