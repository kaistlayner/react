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
            <button onClick={inputc('AC')}>AC</button>
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
  const cals = ['+', '-', '*', '/', '=', 'AC', 'del', '('];
  const fours = ['+', '-', '*', '/'];
  const adds = ['+', '-'];
  const muls = ['*', '/'];

  const [hisList, setHisList] = useState([]);
  //const [body, setBody] = useState();

  const [flag, setFlag] = useState(false);
  const [popupOn, setPopupOn] = useState(false);
  const [lcnt, setLcnt] = useState(0);
  const [rcnt, setRcnt] = useState(0);
  const [last, setLast] = useState('');
  const [inputs, setInputs] = useState('0');

  const PrintHistory = () => {
    let l = hisList.length;
    if(l === 0) return;
    let temp = hisList[l-1];
    for(let i = l - 2; i >= 0 ; i--){
        temp += `\n${hisList[i]}`
    }
    document.getElementById("popupContent").innerHTML=temp;
    return;
    /*return (
      <div>
        1<br/>2<br/>adfgssgese<br/>4<br/>zsefszefge<br/>e<br/>2<br/>3<br/>
      </div>
    );*/
  }

  const PopupOn = (bool) => {
    setPopupOn(bool);
    //const popup = document.querySelector('#popup');
    //popup.classList.remove('hide');
  }

  const inputc = (c) => {
    

    if(c === ')'){
      if(rcnt >= lcnt || cals.indexOf(last) !== -1) return;
      setRcnt(rcnt + 1);
    }
    else if(c === '('){
      if(cals.indexOf(last) === -1 && last !== '') return;
      setLcnt(lcnt + 1);
    }

    if(c === 'del'){
      setInputs(inputs.slice(0, -1));
      if(last === '(') setLcnt(lcnt - 1);
      else if(last === ')') setRcnt(rcnt - 1);
      setLast(inputs[inputs.length - 1]);
    }
    else if(c === '='){
      if(cals.indexOf(last) !== -1 && last !== ')') return;
      else if(lcnt !== rcnt) return;
      let temp = eval(inputs).toString();
      
      if(temp.length > 14) temp = temp.substr(0, 14);
      setHisList(hisList.concat(inputs + ' = ' + temp));
      setInputs(temp);
      setLast('');
      setLcnt(0);
      setRcnt(0);
    }
    else if(inputs.length > 14) return;
    else if(inputs === '0'){
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
    else if(c === 'AC'){
      setInputs('0');
      setLcnt(0);
      setRcnt(0);
    }
    else{
      if(last === '/' && c === '0') return;
      else if(adds.indexOf(last) !== -1){
        if(fours.indexOf(c) !== -1){
          if(muls.indexOf(c) !== -1){
            if(flag){
              return;
            }
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

  PrintHistory();
  console.log(hisList);
  console.log("last: " + last + "\tcur: " + inputs);

  return (
    <div>
      <div id="calculator">
        <div id="display">
          <div id="popup" className={popupOn ? "" : "hide"}>
            <div id="popupOff">
              <button id="popupButton" onClick={()=>PopupOn(false)}>★</button>
            </div>
            <pre id='popupContent'></pre>
          </div>
          <div id="popupOn" className={popupOn ? "hide" : ""}>
            <button id="popupButton" onClick={()=>PopupOn(true)}>☆</button>
          </div>
          <div id="answer">
            <Cal inputstr={inputs} id={1}/>
          </div>
        </div>
        <div id="calculatorBody">
          <div className="buttonWrap">
            <button className="cals" onClick={()=>inputc('(')}>(</button>
            <button className="cals" onClick={()=>inputc(')')}>)</button>
            <button className="cals" onClick={()=>inputc('del')}>del</button>
            <button className="cals" onClick={()=>inputc('AC')}>AC</button>
          </div>
          <div className="buttonWrap">
            <button onClick={()=>inputc('7')}>7</button>
            <button onClick={()=>inputc('8')}>8</button>
            <button onClick={()=>inputc('9')}>9</button>
            <button className="cals" onClick={()=>inputc('/')}>/</button>
          </div>
          <div className="buttonWrap">
            <button onClick={()=>inputc('4')}>4</button>
            <button onClick={()=>inputc('5')}>5</button>
            <button onClick={()=>inputc('6')}>6</button>
            <button className="cals" onClick={()=>inputc('*')}>*</button>
          </div>
          <div className="buttonWrap">
            <button onClick={()=>inputc('1')}>1</button>
            <button onClick={()=>inputc('2')}>2</button>
            <button onClick={()=>inputc('3')}>3</button>
            <button className="cals" onClick={()=>inputc('-')}>-</button>
          </div>
          <div className="buttonWrap">
            <button onClick={()=>inputc('0')}>0</button>
            <button onClick={()=>inputc('.')}>.</button>
            <button className="ans" onClick={()=>inputc('=')}>=</button>
            <button className="cals" onClick={()=>inputc('+')}>+</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
