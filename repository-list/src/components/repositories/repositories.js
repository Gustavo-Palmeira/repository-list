import React from 'react'
import PropTypes from 'prop-types'

import Repository from '../repository/repository'

import './repositories.scss'

const Repositories = ({ repositories }) => {
  return (
    <ul className="p-0">
      {repositories.length > 0 && repositories.map((repository) => (
        <Repository key={repository.id} repository={repository} />
      ))}
    </ul>
  )
}

Repositories.propTypes = {
  repositories: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default Repositories
