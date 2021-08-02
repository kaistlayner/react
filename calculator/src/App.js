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
  const cals = ['+', '-', '*', '/', '=', 'CE', 'del', '('];
  const adds = ['+', '-'];
  const muls = ['*', '/'];
  //const [historyFlag, historyFlagTo] = useState(false);
  const [hisList, historySet] = useState([]);
  const [flag, setFlag] = useState(false);
  const [lcnt, setl] = useState(0);
  const [rcnt, setr] = useState(0);
  const [last, setLast] = useState('');
  const [inputs, setInputs] = useState('0');

  const PrintHistory = (hisList) => {
    var body = "";
    for(var h in hisList){
      body = body + `<li>${h}</li>`
    }
    return body;
  }

  const historyOn = () => {
    //historyFlagTo(true);
    const popup = document.querySelector('#popup');
    popup.classList.remove('hide');
  }

  const historyOff = () => {
    //historyFlagTo(false);
    const popup = document.querySelector('#popup');
    popup.classList.add('hide');
  }

  const inputc = (c) => {
    if(c === ')'){
      if(rcnt >= lcnt) return;
      setr(rcnt + 1);
    }
    else if(c === '(') setl(lcnt + 1);

    if(inputs === '0'){
      if(cals.indexOf(c) !== -1 && c !== '-' && c !== '(') return;
      else if(c === '-'){
        setInputs(inputs + c);
        setLast(c);
      }
      else{
        setInputs(c);
        setLast(c);
      }
    }
    else if(c === '='){
      if(cals.indexOf(last) !== -1 && last !== ')') return;
      else if(lcnt !== rcnt) return;
      var temp = eval(inputs).toString();
      setInputs(temp);
      hisList.push(inputs + ' = ' + temp);
      console.log(hisList);
      setl(0);
      setr(0);
    }
    else if(c === 'CE'){
      setInputs('0');
      setl(0);
      setr(0);
    }
    else if(c === 'del'){
      setInputs(inputs.slice(0, -1));
      if(last === '(') setl(lcnt - 1);
      else if(last === ')') setr(rcnt - 1);
      setLast(inputs[-1]);
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
  };

  return (
    <div id="calculator">
        <div id="display">
          <div id="popup" className="hide">
            <div className="popup_content">
              <ul>
                <PrintHistory hisList = {hisList}/>
              </ul>
              <div id="historyOff">
                <button id="history_button" onClick={()=>historyOff()}>@</button>
              </div>
            </div>
          </div>
          <div id="historyOn">
            <button id="history_button" onClick={()=>historyOn()}>@</button>
          </div>
          <div id="answer">
            <Cal inputstr={inputs} id={1}/>
          </div>
        </div>
        <div id="calculatorBody">
          <div className="buttonWrap">
            <button onClick={()=>inputc('CE')}>CE</button>
            <button onClick={()=>inputc('(')}>(</button>
            <button onClick={()=>inputc(')')}>)</button>
            <button onClick={()=>inputc('*')}>*</button>
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