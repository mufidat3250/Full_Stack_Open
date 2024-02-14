import "./App.css";
import {useState} from 'react'

function App() {
  const [counter, setCounter] = useState(0)
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [all, setAll] = useState(['L'])
  const [total, setTotal] = useState(0)
  
  
const hello = (who) => {
  const handler = () => {
    console.log('Hello', who)
  }

  return handler
}
  
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  }

  console.log('i am nnot available')

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />

      <Button title={'button'} handleClick={hello('React')}/>
      <Button title={'button2'} handleClick={hello('JS')}/>
      <Button title={'button3'} handleClick={hello('function')}/>


    </div>
  );
}

export default App;

const Header = ({ course }) => <h1>{course}</h1>;
const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(({ name, exercises }, index) => (
        <Part exercise={exercises} part={name} key={index}  />
      ))}
    </div>
  );
};

const Total = ({ parts }) => {
  let sum = 0;
  parts.forEach(({ _, exercises }) => (sum += exercises));
  return (
    <div>
      <p>Nummber of exercises {sum}</p>
    </div>
  );
};

const Part = ({ exercise, part }) => {
  return (
    <p>
      {part} {exercise}
    </p>
  );
};

const Button = ({title, handleClick}) => {
  return (
    <button onClick={handleClick}>{title}</button>
  )
}