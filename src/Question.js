import React from 'react'

function Option({
  option,
  isCorrect,
  isSelected,
  id,
  questionId,
  Select,
  isComplete,
}) {
  return (
    <div
      className={`option ${isSelected ? 'option-selected' : ''} ${
        isComplete && isCorrect ? 'option-correct' : ''
      } ${isComplete && isSelected && !isCorrect ? 'option-incorrect' : ''} ${
        !isCorrect && isComplete ? 'option-game-end' : ''
      }`}
      onClick={() => Select(questionId, id)}
    >
      {option}
    </div>
  )
}

export default function Question({
  question,
  options,
  Select,
  id,
  isComplete,
}) {
  const optionElements = options.map((option) => {
    return (
      <Option
        option={option.option}
        isCorrect={option.isCorrect}
        isSelected={option.isSelected}
        id={option.id}
        questionId={id}
        Select={Select}
        key={option.id}
        isComplete={isComplete}
      />
    )
  })
  return (
    <div className="question">
      <p className="question-heading">{question}</p>
      <div className="options">{optionElements}</div>
      <hr className="horizontal-line" />
    </div>
  )
}
