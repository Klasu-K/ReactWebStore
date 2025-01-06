import styled from "styled-components";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useRef, useState } from "react";

interface Props {
  className?: string;
  min: number;
  max: number;
  newValueSelected: (min: number, max: number) => void;
}

const ProductFilterSlider = ({ className, min, max, newValueSelected }: Props) => {

  const [[currentMin, currentMax], setRange] = useState([min,max])

  //clamp range between min and max
  if(currentMin < min || currentMax > max) {
    let _min = currentMin < min ? min : currentMin
    let _max = currentMax > max ? max : currentMax
    //return function early to render with only clamped range
    setRange([_min,_max])
    return;
  }

  let timeoutID = useRef(0)
  const NewRangeSelected = () => {
    //timeouts prevent accidental spam when using arrowkeys to change number input
    clearTimeout(timeoutID.current)
    timeoutID.current = setTimeout(() => newValueSelected(currentMin, currentMax), 50)
  }

  return (
    <div className={className}>
      <div className="values">
        <input type="number" 
          value={Math.round(currentMin)} 
          onChange={(e) => {
            setRange([Number(e.target.value), currentMax])
            NewRangeSelected()
          }}
          min={min}
          max={max}
        />

        <input type="number" 
          value={Math.round(currentMax)} 
          onChange={(e) => {
            setRange([currentMin, Number(e.target.value)])
            NewRangeSelected()
          }}
          min={min}
          max={max}
        />
      </div>
      <Slider className="test"
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
  .rc-slider-track {
    background-color: #00000050;
  }

  .rc-slider-handle {
    background-color: #afe8ff;
    border: solid 1px #000000ce;
    width: 16px;
    height: 16px;
    margin-top: -6px;
  }

  .values {
    padding-bottom: 10px;
    width: 90%;
    margin: auto;
    display: flex;
    justify-content: space-between;
    input {
      text-align: center;
      font-family: "Funnel Sans", "Arial";
      font-weight: 500;
      font-size: 1em;
      border-style: none;
      border-radius: 5px;
      box-sizing: content-box;
      padding: 3px;
      width: 4em;
      &:hover{
        box-shadow: 0 0 0 2px #000000;
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