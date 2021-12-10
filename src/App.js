import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [funcShow, setfuncShow] = useState(true);
  const [ClassShow, setClassShow] = useState(true);

  return (
    <div className="container">
      <h1>Hello World</h1>
      <input
        type="button"
        value="remove func"
        onClick={function () {
          setfuncShow(false);
        }}
      ></input>
      <input
        type="button"
        value="remove comp"
        onClick={function () {
          setClassShow(false);
        }}
      ></input>
      {funcShow ? <FuncComp initNumber={1}></FuncComp> : null}
      {ClassShow ? <ClassComp initNumber={1}></ClassComp> : null}
    </div>
  );
}

let funcId = 0;
function FuncComp(props) {
  const numberState = useState(props.initNumber);
  const number = numberState[0];
  const setNumber = numberState[1];
  const [_date, setDate] = useState(new Date().toString());
  // 최초실행
  useEffect(function () {
    console.log('func => useEffect (componentdidMount) ' + ++funcId);
    document.title = number;

    return function () {
      console.log('func => useEffect return (componentWillUnMount)' + ++funcId);
    };
  }, []);
  // side effect
  useEffect(
    function () {
      console.log('func => useEffect number ' + ++funcId);
      document.title = number;

      return function () {
        console.log('func => useEffect return number ' + ++funcId);
      };
      // number 값이 바뀔 때만 실행하려면 두번째 인자로 넣어주어야 함.
    },
    [number]
  );
  useEffect(
    function () {
      console.log('func => useEffect date ' + ++funcId);
      document.title = _date;
      return function () {
        console.log('%cfunc => useEffect return date ' + ++funcId);
      };
      // number 값이 바뀔 때만 실행하려면 두번째 인자로 넣어주어야 함.
    },
    [_date]
  );

  console.log('render ' + ++funcId);

  return (
    <div className="container">
      <h2>Function Style Component</h2>
      <p>Number : {number}</p>
      <p>Date : {_date}</p>
      <input
        type="button"
        value="random"
        onClick={function () {
          setNumber(Math.random());
        }}
      ></input>
      <input
        type="button"
        value="date"
        onClick={function () {
          setDate(new Date().toString());
        }}
      ></input>
    </div>
  );
}

class ClassComp extends React.Component {
  state = {
    number: this.props.initNumber,
    date: new Date().toString(),
  };
  render() {
    return (
      <div className="container">
        <h2>Class Style Component</h2>
        <p>Number : {this.state.number}</p>
        <p>Date : {this.state.date}</p>
        <input
          type="button"
          value="random"
          onClick={function () {
            this.setState({ number: Math.random() });
          }.bind(this)}
        ></input>
        <input
          type="button"
          value="date"
          onClick={function () {
            this.setState({ date: new Date().toString() });
          }.bind(this)}
        ></input>
      </div>
    );
  }
}

export default App;
