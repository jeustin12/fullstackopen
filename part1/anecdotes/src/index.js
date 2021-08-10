import React, { useState } from 'react';
import ReactDOM from 'react-dom';
const Button = ({handleClick,text}) => {
  return ( 
    <button onClick={handleClick}>{text}</button>
   );
}

const Statistics = (props) => {
  
 return(
   <>
    <table>
    <tr>
    <th>Good</th>
    <td></td>
    <td>{props.good}</td>
    </tr>  
    <tr>
    <th>Neutral</th>
    <td></td>
    <td>{props.neutral}</td>
    </tr>  
    <tr>
    <th>Bad</th>
    <td></td>
    <td>{props.bad}</td>
    </tr> 
    <tr>
    <th>All</th>
    <td></td>
    <td>{props.all}</td>
    </tr>
    <tr>
    <th>Average</th>
    <td></td>
    <td>{props.average}</td>
    </tr>
    <tr>
    <th>Positive</th>
    <td></td>
    <td>{props.positive}%</td>
    </tr>
    </table>
  </>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(6)
  const [neutral, setNeutral] = useState(2)
  const [bad, setBad] = useState(1)
  const [all,setAll]= useState( good + bad + neutral)
  const addGood = ()=>{
    setGood(good + 1)
  }
  const addNeutral = ()=>{
    setNeutral(neutral + 1)
  }
  const addBad = ()=>{
    setBad(bad + 1)
  }
  return (
    <div>
    <h1>Give feedback</h1>
    <Button handleClick={addGood} text='Good'></Button>
    <Button handleClick={addNeutral} text='Neutral'></Button>
    <Button handleClick={addBad} text='Bad'></Button>
    {good + neutral + bad === 0 ?
    <h1>No feedback given</h1> :
    <div>
    <Statistics 
    good={good} bad={bad} neutral={neutral} 
    all={good + neutral + bad}
    average = {(good + neutral + bad)  / 3 }
    positive={(good / (good+neutral+bad) ) * 100}
    />
  </div>
  }
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
