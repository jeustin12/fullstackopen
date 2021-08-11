import React from 'react'

const Header = ({ name }) => {
    // console.log(name);
    return (
      <h1>{name}</h1>
    )
  }
  
  const Total = ({ total }) => {
    // console.log(total);
    const sum = total.reduce((total, currentValue) => total + currentValue.exercises, 0)
    return(
      <p>Number of exercises {sum}</p>
    ) 
  }
  
  const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>    
    )
  }
  
  const Content = ({ parts }) => {
    return (
      <div>
        {parts.map(part =>
          <Part key={part.id} part={part} />
        )}
      </div>
    )
  }
  const Course =({course})=>{
    return(
      <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total total={course.parts} />
      </>
    )
  }
 
export default Course;