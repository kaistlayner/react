import React, { useState } from "react";
import Cal from "./cal";
import "./App.css"
/*
class App extends React.Component {
  state = {
    inputStr: ""
  };

  inputc = (inputChar) => {
    var inputs = this.state.inputStr + inputChar;
    this.setState({inputStr: inputs});
  };

  render() {
    const {inputStr} = this.state;
    return(
      <div id="calculator">
        <div id="display">
          <div id="answer">
            <Cal inputstr={inputStr}/>
          </div>
        </div>
        <div id="calculatorBody">
          <div className="buttonWrap">
            <button onClick={inputc('CE')}>CE</button>
            <button onClick={inputc('(')}>(</button>
            <button onClick={inputc(')')}>)</button>
            <button onClick={inputc('X')}>X</button>
          </div>
          <div className="buttonWrap">
            <button onClick={inputc('7')}>7</button>
            <button onClick={inputc('8')}>8</button>
            <button onClick={inputc('9')}>9</button>
            <button onClick={inputc('/')}>/</button>
          </div>
          <div className="buttonWrap">
            <button onClick={inputc('4')}>4</button>
            <button onClick={inputc('5')}>5</button>
            <button onClick={inputc('6')}>6</button>
            <button onClick={inputc('-')}>-</button>
          </div>
          <div className="buttonWrap">
            <button onClick={inputc('1')}>1</button>
            <button onClick={inputc('2')}>2</button>
            <button onClick={inputc('3')}>3</button>
            <button onClick={inputc('+')}>+</button>
          </div>
          <div className="buttonWrap">
            <button onClick={inputc('.')}>.</button>
            <button onClick={inputc('0')}>0</button>
            <button onClick={inputc('del')}>del</button>
            <button onClick={inputc('=')}>=</button>
          </div>
        </div>
      </div>
    )
  };
}*/

const App = () => {
  const cals = ['+', '-', 'X', '/'];
  const adds = ['+', '-'];
  const muls = ['X', '/'];
  const [flag, setFlag] = useState(false);
  const [last, setLast] = useState('');
  const [inputs, setInputs] = useState('0');
  const inputc = (c) => {
    if(inputs === '0'){
      if(cals.indexOf(c) !== -1) return;
      setInputs(c);
      setLast(c);
    }
    else if(c === 'CE'){
      setInputs('0');
    }
    else{
      if(adds.indexOf(last) !== -1){
        if(cals.indexOf(c) !== -1){
          if(flag){
            return;
          }
          setInputs(inputs.slice(0, -1) + c);
        }
        else setInputs(inputs + c);
      }
      else if(muls.indexOf(last) !== -1){
        if(muls.indexOf(c) !== -1) setInputs(inputs.slice(0, -1) + c);
        else if(adds.indexOf(c) !== -1){
          if(c === '-') setInputs(inputs + c);
          setLast(c);
          setFlag(true);
          return;
        }
        else setInputs(inputs + c);
      }
      else setInputs(inputs + c);
      setLast(c);
      if(flag) setFlag(false);
    }
    console.log("last: " + last);
    console.log("cur: " + c);
  };

  return (
    <div id="calculator">
        <div id="display">
          <div id="answer">
            <Cal inputstr={inputs} id={1}/>
          </div>
        </div>
        <div id="calculatorBody">
          <div className="buttonWrap">
            <button onClick={()=>inputc('CE')}>CE</button>
            <button onClick={()=>inputc('(')}>(</button>
            <button onClick={()=>inputc(')')}>)</button>
            <button onClick={()=>inputc('X')}>X</button>
          </div>
          <div className="buttonWrap">
            <button onClick={()=>inputc('7')}>7</button>
            <button onClick={()=>inputc('8')}>8</button>
            <button onClick={()=>inputc('9')}>9</button>
            <button onClick={()=>inputc('/')}>/</button>
          </div>
          <div className="buttonWrap">
            <button onClick={()=>inputc('4')}>4</button>
            <button onClick={()=>inputc('5')}>5</button>
            <button onClick={()=>inputc('6')}>6</button>
            <button onClick={()=>inputc('-')}>-</button>
          </div>
          <div className="buttonWrap">
            <button onClick={()=>inputc('1')}>1</button>
            <button onClick={()=>inputc('2')}>2</button>
            <button onClick={()=>inputc('3')}>3</button>
            <button onClick={()=>inputc('+')}>+</button>
          </div>
          <div className="buttonWrap">
            <button onClick={()=>inputc('.')}>.</button>
            <button onClick={()=>inputc('0')}>0</button>
            <button onClick={()=>inputc('del')}>del</button>
            <button onClick={()=>inputc('=')}>=</button>
          </div>
        </div>
      </div>
  );
};

export default App;
