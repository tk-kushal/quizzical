import React from 'react'

export default function Start({ start }) {
  const [customizations, setCustomizations] = React.useState({
    catagory: '',
    difficulty: '',
  })

  function handleChange(event) {
    setCustomizations((oldCs) => {
      return {
        ...oldCs,
        [event.target.name]: event.target.value,
      }
    })
  }

  function GenerateApiKey() {
    let url = 'https://opentdb.com/api.php?amount=5&type=multiple'
    if (customizations.catagory !== '') {
      url = url + '&category=' + customizations.catagory
    }
    if (customizations.difficulty !== '') {
      url = url + '&difficulty=' + customizations.difficulty
    }
    return url
  }

  return (
    <div className="start">
      <h1 className="start-heading">Quizzical</h1>
      <p className="start-description">A simple Quiz game!</p>
      <div className="customization">
        <div className="select">
          <label
            htmlFor="catagory"
            className="start-description customization-picker"
          ></label>
          <select
            name="catagory"
            className="form-select"
            value={customizations.catagory}
            onChange={handleChange}
          >
            <option value="">Any Category</option>
            <option value="9">General Knowledge</option>
            <option value="10">Entertainment: Books</option>
            <option value="11">Entertainment: Film</option>
            <option value="12">Entertainment: Music</option>
            <option value="13">Entertainment: Musicals &amp; Theatres</option>
            <option value="14">Entertainment: Television</option>
            <option value="15">Entertainment: Video Games</option>
            <option value="16">Entertainment: Board Games</option>
            <option value="17">Science &amp; Nature</option>
            <option value="18">Science: Computers</option>
            <option value="19">Science: Mathematics</option>
            <option value="20">Mythology</option>
            <option value="21">Sports</option>
            <option value="22">Geography</option>
            <option value="23">History</option>
            <option value="24">Politics</option>
            <option value="25">Art</option>
            <option value="26">Celebrities</option>
            <option value="27">Animals</option>
            <option value="28">Vehicles</option>
            <option value="29">Entertainment: Comics</option>
            <option value="30">Science: Gadgets</option>
            <option value="31">
              Entertainment: Japanese Anime &amp; Manga
            </option>
            <option value="32">Entertainment: Cartoon &amp; Animations</option>{' '}
          </select>
        </div>
        <div className="select">
          <label
            htmlFor="difficulty"
            className="start-description customization-picker"
          ></label>
          <select
            name="difficulty"
            id="difficulty"
            onChange={handleChange}
            value={customizations.Catagory}
            className="form-select"
          >
            <option value="">Any Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
      </div>
      <button
        className="start-button"
        onClick={() => {
          start(GenerateApiKey())
        }}
      >
        Start quiz
      </button>
    </div>
  )
}
