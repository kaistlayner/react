import React, { useState } from "react";
import "./App.css"

const App = () => {
  const cals = ['+', '-', '*', '/', '=', 'AC', 'del', '('];
  const fours = ['+', '-', '*', '/'];
  const adds = ['+', '-'];
  const muls = ['*', '/'];

  const [hisList, setHisList] = useState([]);
  const [ansList, setAnsList] = useState([]);
  const [preflag, setPreflag] = useState(false);

  const [flag, setFlag] = useState(false);
  const [popupOn, setPopupOn] = useState(false);
  const [lcnt, setLcnt] = useState(0);
  const [rcnt, setRcnt] = useState(0);
  const [last, setLast] = useState('');
  const [inputs, setInputs] = useState('0');

  const PrintHistory = () => {
    let l = hisList.length;
    if(l === 0){
      document.getElementById("popupContent").innerHTML=`이전 계산식과 결과가 여기에 표시되어 다시 사용할 수 있습니다.`;
      return;
    }
    //let temp = hisList[l-1] + " = " + ansList[l-1];
    let temp = `<div class='historyButtonWrap'><button class="historyButton" id="${l-1}-0">${hisList[l-1]}</button><div id="innerText">=</div><button class="historyButton" id="${l-1}-1">${ansList[l-1]}</button></div>`;
    for(let i = l - 2; i >= 0 ; i--){
        temp += `\n<div class='historyButtonWrap'><button class="historyButton" id="${i}-0">${hisList[i]}</button><div id="innerText">=</div><button class="historyButton" id="${i}-1">${ansList[i]}</button></div>`;
    }
    document.getElementById("popupContent").innerHTML=temp;

    for(let i = 0; i < l; i++){
      temp = document.getElementById(`${i}-0`).onclick = () => setInputs(hisList[i]);
      temp = document.getElementById(`${i}-1`).onclick = () => setInputs(ansList[i]);
    }

    return;
  }

  const PopupOn = (bool) => {
    setPopupOn(bool);
  }

  const inputc = (c) => {
    if(preflag) setPreflag(false);

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
      
      if(hisList.length > 4){
        setHisList(hisList.slice(1).concat(inputs));
        setAnsList(ansList.slice(1).concat(temp));
      }
      else{
        setHisList(hisList.concat(inputs));
        setAnsList(ansList.concat(temp));
      }
      setInputs(temp);
      setLast('');
      setLcnt(0);
      setRcnt(0);
      setPreflag(true);
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

  if(popupOn === true) PrintHistory();
  
  const PrintPre = () => {
    if(preflag){
      return hisList[hisList.length-1] + ' =';
    }
    else if(ansList.length === 0) return "JMJ's calculator!"
    else{
      return 'Ans = ' + ansList[ansList.length-1];
    }
  }
  //console.log(hisList);
  //console.log(ansList);
  //console.log("last: " + last + "\tcur: " + inputs);

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
          <div id="answers">
            <div id="preanswer">
              {PrintPre()}
            </div>
            <div id="answer">
              {inputs}
            </div>
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
