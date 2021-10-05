import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { getCommits } from '../../services/github'
import Commit from '../commit/commit'

import './commits.scss'

const Commits = ({ user, name }) => {
  const [commitsData, setCommitsData] = useState([])
  const [commitsTotalNumber, setCommitsTotalNumber] = useState([])
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [loadMore, setLoadMore] = useState(false)

  useEffect(() => {
    const handleCommits = async () => {
      try {
        currentPage === 1 ? setLoading(true) : setLoadMore(true)
        const { data, commitsTotal } = await getCommits(user, name, currentPage)
        setCommitsData(((commits) => [...commits, ...data]))
        setCommitsTotalNumber(commitsTotal)
        setError('')
      } catch {
        setError('Não foi possível pesquisar os commits do repositório')
      } finally {
        setLoadMore(false)
        setLoading(false)
      }
    }

    handleCommits()
  }, [user, name, currentPage])

  
  useEffect(() => {
    const intersectionObserver = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting) && commitsData.length < commitsTotalNumber) {
        setCurrentPage((currentPage) => currentPage + 1)
      }
    })
    intersectionObserver.observe(document.querySelector('.observer'))

    return () => intersectionObserver.disconnect()
  }, [commitsData.length, commitsTotalNumber])


  return (
    <ul className="p-0">
      {loading
        ? <div className="text-center">
            <i role="status" className="spinner-border spinner-border-md" />
          </div>
        : <>
            <p className="form-text text-center my-4">{error}</p> 
            <div className="commits-box">
              {commitsData.length > 0 && commitsData.map((commit) => (
                <Commit key={commit.sha} commit={commit} />
              ))}
            </div>
          </>
      }

      {loadMore &&
        <div className="text-center">
          <i role="status" className="spinner-border spinner-border-md" />
        </div>
      }
      <span className="observer" />
    </ul>
  )
}

Commits.propTypes = {
  user: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
}

export default Commits
