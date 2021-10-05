import React from 'react'
import './search.scss'

const Search = ({ username, submitButton, changeUser, error }) => {
  const handleKeyPress = (event) => {
    if (event.key === 'Enter'){
      event.preventDefault()
      submitButton()
    }
  }

  return (
    <div className="search">
      <form className="row" id="search-form" onKeyPress={handleKeyPress}>
        <div className="form-group">
          <label htmlFor="search"></label>
          <input
            className="input"
            type="text"
            id="search"
            placeholder="Pesquise um repositório"
            value={username}
            onChange={(event) => changeUser(event.target.value)}
          />
        </div>
        <button
          className="button button-primary ml-2"
          id="submiteButton"
          type="button"
          onClick={submitButton}
        >
          Pesquisar
        </button>
      </form>
      <p className="form-text text-center">{error}</p>
    </div>
  )
}

export default Search
