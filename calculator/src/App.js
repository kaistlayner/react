import React, { useState } from "react";
import "./App.scss"

const App = () => {
  const [hisList, setHisList] = useState([]);
  const [ansList, setAnsList] = useState([]);
  const [preflag, setPreflag] = useState(false);
  const [popupOn, setPopupOn] = useState(false);
  const [inputs, setInputs] = useState('0');

  // used only at inputc()
  // !not important
  const [flag, setFlag] = useState(false);
  const [lcnt, setLcnt] = useState(0);
  const [rcnt, setRcnt] = useState(0);
  const [last, setLast] = useState('');
  
  // just for avoiding error of eval()
  // !not important
  const inputc = (c) => {
    const cals = ['+', '-', '*', '/', '=', 'AC', 'del', '('];
    const fours = ['+', '-', '*', '/'];
    const adds = ['+', '-'];
    const muls = ['*', '/'];

    if(preflag) setPreflag(false);

    if(c === 'AC'){
      setInputs('0');
      setLcnt(0);
      setRcnt(0);
      return;
    }

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

  const ButtonWrapper = probs => {
    let buttons =[];
    const lst = probs.lst, mrk = probs.mrk;
    for(let i = 0; i < lst.length; i++) buttons.push(<button className={mrk[i]} onClick={()=>inputc(lst[i])} key={lst[i]}>{lst[i]}</button>);
    return <div className="buttonWrap">{buttons}</div>;
  };

  const PrintHistory = () => {
    let l = hisList.length;
    if(l === 0) return <div id="popupContent">이전 계산식과 결과가 여기에 표시되어 다시 사용할 수 있습니다.</div>;
    
    const phistory = [];
    for(let i = l -1; i >= 0; i--){
      let temp = [];
      temp.push(<button className="historyButton" key={'historyButton-'+i+'-0'} onClick={() => setInputs(hisList[i])}>{hisList[i]}</button>);
      temp.push(<div className="innerText" key={'innerText-'+i}>=</div>);
      temp.push(<button className="historyButton" key={'historyButton-'+i+'-1'} onClick={() => setInputs(ansList[i])}>{ansList[i]}</button>);
      phistory.push(<div className='historyButtonWrap' key={'historyButtonWrap-'+i}>{temp}</div>);
    }
    return phistory;
  }

  const PrintPre = () => {
    if(preflag) return hisList[hisList.length-1] + ' =';
    else if(ansList.length === 0) return "JMJ's calculator!"
    else return 'Ans = ' + ansList[ansList.length-1];
  }

  return (
    <calculator>
      <screen>
        <div id="popupOn" className={popupOn ? "hide" : ""}><button class="popupButton" onClick={()=>setPopupOn(true)}>☆</button></div>
        <div id="popup" className={popupOn ? "" : "hide"}>
          <div id="popupOff"><button class="popupButton" onClick={()=>setPopupOn(false)}>★</button></div>
          <PrintHistory/>
        </div>
        <div id="answers">
          <div id="preanswer"><PrintPre/></div>
          <div id="answer">{inputs}</div>
        </div>
      </screen>
      <calculatorbody>
        <ButtonWrapper lst={['(', ')', 'del', 'AC']} mrk={['cals', 'cals', 'cals', 'cals']}/>
        <ButtonWrapper lst={['7', '8', '9', '/']} mrk={['', '', '', 'cals']}/>
        <ButtonWrapper lst={['4', '5', '6', '*']} mrk={['', '', '', 'cals']}/>
        <ButtonWrapper lst={['1', '2', '3', '-']} mrk={['', '', '', 'cals']}/>
        <ButtonWrapper lst={['0', '.', '=', '+']} mrk={['', '', 'ans', 'cals']}/>
      </calculatorbody>
    </calculator>
  );
};

export default App;
