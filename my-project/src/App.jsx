import './index.scss';
import { useState } from 'react';

const questions = [
  {
    title: 'React - это ... ?',
    variants: ['библиотека', 'фреймворк', 'приложение'],
    correct: 0,
  },
  {
    title: 'Компонент - это ... ',
    variants: ['приложение', 'часть приложения или страницы', 'то, что я не знаю что такое'],
    correct: 1,
  },
  {
    title: 'Что такое JSX?',
    variants: [
      'Это простой HTML',
      'Это функция',
      'Это тот же HTML, но с возможностью выполнять JS-код',
    ],
    correct: 2,
  },
];

function Result({correct, step}) {
  return (
    <div className="result">
      <img src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png" />
      <h2>Вы отгадали {correct} ответа из {step}</h2>
      <a href="/">
        <button onClick={<Game />} >Попробовать снова</button>
      </a>
    </div>
  );
}

function Game({question, onClickVariant, step}) {
  const progressLine = Math.round((step / questions.length) * 100)

  return(
    <>
      <div className="progress">
        <div style={{ width: `${progressLine}%` }} className="progress__inner"></div>
      </div>
      <h1>{question.title}</h1>
      <ul>
        {
          question.variants.map((text, index) => <li onClick={() => onClickVariant(index)} key={text}>{text}</li>)
        }
      </ul>
    </>
  );
}

function App() {
  const [step, setStep] = useState(0)
  const [correct, setCorrect] = useState(0)
  const question = questions[step]

  const onClickVariant = (index) => {
    console.log(step, index)

    setStep(step + 1)

    if(index === question.correct){
      setCorrect(correct + 1)
    }
  }

  return (
    <div className="App">
      {step < 3  
        ? (<Game question={question} onClickVariant={onClickVariant} step={step} />) 
        : <Result correct={correct} step={step} /> 
      }
    </div>
  );
}

export default App;




















/*
1. Создаем step через useState(0), он будет служить переходом из одной страницы на другую
2. Для отображения данных из массива questions создаем переменную const question = questions[page] - (первый объект массива)
3. Прокидываем пропс в компонент Game и там его же получаем, делаем вывод данных {question.title}, 
<ul>
  {
    question.variants.map((text) => <li key={text}>{text}</li>)
  }
</ul> 
4. Создаем функцию onClickVariant(index), для проверки выводим step, index, 
5. Прокидываем пропсы onClickVariant в <Game /> и внутри прописываем код: .map((text, index) => <li onClick={() => onClickVariant(index)} key={text}>{text}</li)
6. Для отображения последующих страниц, в функции onClickVariant прописываем setStep(step + 1)
7. Для верхей линии progress в компоненте Game получаем пропсы step и создаем переменную progressLine
В которой происходит вычисление: Math.round((step / questions.length) * 100) и добавляем этот результат в верстку:
  <div className="progress">
    <div style={{ width: `${progressLine}%` }} className="progress__inner"></div>
  </div>
8. Вывод компонента Result: 
*/