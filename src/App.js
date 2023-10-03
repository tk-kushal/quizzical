import React from 'react'
import './App.css'
import Start from './Start.js'
import Question from './Question.js'
import { nanoid } from 'nanoid'

function App() {
  const [running, setRunning] = React.useState(false)
  const [complete, setComplete] = React.useState(false)
  const [questionsData, setQuestionsData] = React.useState([])
  const [questions, setQuestions] = React.useState([])
  const [score, setScore] = React.useState(0)
  const [game, setGame] = React.useState(0)
  const [apiKey, setApiKey] = React.useState('')

  function decodeEntity(inputStr) {
    var textarea = document.createElement('textarea')
    textarea.innerHTML = inputStr
    return textarea.value
  }
  React.useEffect(() => {
    if (apiKey !== '') {
      fetch(apiKey)
        .then((response) => response.json())
        .then((data) => {
          setQuestionsData(data.results)
        })
    }
  }, [game])

  function start(key) {
    setApiKey(key)
    setGame((game) => (game += 1))
    setRunning(true)
  }

  function Select(questionId, optionId) {
    if (!complete) {
      let tempQuestions = []
      let sel = ''
      tempQuestions = questions.map((question) => {
        if (question.id === questionId) {
          let options = question.options.map((option) => {
            if (option.id === optionId) {
              return { ...option, isSelected: !option.isSelected }
            } else if (option.id === question.Selected) {
              return { ...option, isSelected: false }
            } else return option
          })
          if (question.Selected === optionId) {
            sel = ''
          } else sel = optionId
          return { ...question, options: options, Selected: sel }
        } else return question
      })
      setQuestions(tempQuestions)
    }
  }

  const qes = questionsData.map((Question) => {
    let quest = {}
    let Options = []
    let c = 0
    let random = Math.ceil(Math.random() * 3)

    for (let i = 0; i < 4; i++) {
      if (random === i) {
        Options.push({
          option: decodeEntity(Question.correct_answer),
          isCorrect: true,
          isSelected: false,
          id: [i],
        })
      } else {
        Options.push({
          option: decodeEntity(Question.incorrect_answers[c]),
          isCorrect: false,
          isSelected: false,
          id: [i],
        })
        c++
      }
    }

    quest = {
      question: decodeEntity(Question.question),
      options: Options,
      correct: random,
      id: nanoid(),
      Selected: '',
    }
    return quest
  })

  React.useEffect(() => {
    setQuestions(qes)
  }, [questionsData])

  const questionsElements = questions.map((question) => {
    return (
      <Question
        question={question.question}
        options={question.options}
        id={question.id}
        Select={Select}
        key={question.id}
        isComplete={complete}
      />
    )
  })

  function calculateScore() {
    setScore(() => {
      let score = 0
      for (let i = 0; i < questions.length; i++) {
        if (questions[i].Selected == questions[i].correct) {
          score++
        }
      }
      return score
    })
  }

  return (
    <div className="App">
      {running ? (
        <div className="game">
          <div className="questions">{questionsElements}</div>
          {complete ? (
            <div className="complete">
              <div className="score">You Scored {score}/5 correct answers</div>
              <button
                className="game-button"
                onClick={() => {
                  setComplete(false)
                  setQuestions([])
                  setGame((game) => ++game)
                }}
              >
                Play again
              </button>
            </div>
          ) : questions.length > 0 ? (
            <button
              className="game-button"
              onClick={() => {
                setComplete(true)
                calculateScore()
              }}
            >
              Check answers
            </button>
          ) : (
            <div className="loader"></div>
          )}
        </div>
      ) : (
        <Start start={start} />
      )}
    </div>
  )
}

export default App
