import styled from "styled-components";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useState } from "react";

interface Props {
  className?: string;
  min : number;
  max : number;
  newValueSelected: () => void;
}

const ProductFilterSlider = ({ className, min, max }: Props) => {

  const [[currentMin, currentMax], setRange] = useState([min,max])

  //clamp range between min and max
  if(currentMin < min || currentMax > max) {
    let _min = currentMin < min ? min : currentMin
    let _max = currentMax > max ? max : currentMax
    //return function early to render with only clamped range
    setRange([_min,_max])
    return;
  }

  const NewRangeSelected = () => {
    // |FIX| currently using arrow keys on input box, can cause rapid triggering 

    //TODO
  }

  return (
    <div className={className}>
      <div className="values">
        <input type="number" 
          value={currentMin} 
          onChange={(e) => {
            setRange([Number(e.target.value), currentMax])
            NewRangeSelected()
          }}
          min={min}
          max={max}
        />

        <input type="number" 
          value={currentMax} 
          onChange={(e) => {
            setRange([currentMin, Number(e.target.value)])
            NewRangeSelected()
          }}
          min={min}
          max={max}
        />
      </div>
      <Slider
      range
      min={min}
      max={max}
      value={[currentMin, currentMax]}
      onChange={(newRange) => setRange(newRange as [number,number])}
      onChangeComplete={NewRangeSelected}
      defaultValue={[min,max]}
      />
    </div>
    
  );
};

const StyledProductFilterSlider = styled(ProductFilterSlider)`
  padding: 10px 10px;
 
  .values {
    padding: 5px 0 5px;
    width: 90%;
    margin: auto;
    display: flex;
    justify-content: space-between;
    input {
      text-align: center;
      font-size: 1.2em;
      width: 4em;
      &:hover{
        background-color: rgb(240, 240, 240);
      }
    }
    
    //hidin number input spinbox
    input[type="number"]::-webkit-outer-spin-button, 
    input[type="number"]::-webkit-inner-spin-button { 
      -webkit-appearance: none;
    } 
       
    /* For Firefox  */   
    input[type="number"] { 
      -moz-appearance: textfield; 
    }
  }
`;

export default StyledProductFilterSlider;