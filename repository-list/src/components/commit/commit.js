import React from 'react'
import PropTypes from 'prop-types'

import './commit.scss'

const Commit = ({ commit }) => {
  return (
    <li className="card card-alternative m-4 commit">
      <a href={commit.html_url} className="text-decoration-none" target="_blank" rel="noreferrer">
        <div className="card-body">
          <div className="d-flex align-items-center">
            {commit.author && commit.author.avatar_url && <div className="avatar mr-3">
              <img src={commit.author.avatar_url} alt="Avatar de usuário" />
            </div>}
            <h3 className="card-title">{commit.commit.author.name || 'Usuário'}</h3>
          </div>
          <p className="card-text">{commit.commit.message || ''}</p>
        </div>
        <div className="card-footer"></div>
      </a>
    </li>
  )
}

Commit.propTypes = {
  commit: PropTypes.object.isRequired,
}

export default Commit
