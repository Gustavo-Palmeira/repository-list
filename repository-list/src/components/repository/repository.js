import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import './repository.scss'

const Repository = ({ repository }) => {
  return (
    <Link to={`/repository/${repository.owner.login}/${repository.name}`} className="text-decoration-none">
      <li className="card card-alternative m-4 bg-dark repository">
        <div className="card-body">
          <h3 className="card-title text-white">{repository.name}</h3>
          <p className="card-text text-white">{repository.description}</p>
        </div>
        <div className="card-footer"></div>
      </li>
    </Link>
  )
}

Repository.propTypes = {
  repository: PropTypes.object,
}

export default Repository
