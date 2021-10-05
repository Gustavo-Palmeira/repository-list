import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { getRepository } from '../../services/github'
import Commits from '../../components/commits/commits'

import './repositoryDetails.scss'

const RepositoryDetails = () => {
  const { name, user } = useParams()
  const [loading, setLoading] = useState(false)
  const [repositoryData, setRepositoryData] = useState()

  useEffect(() => {
    const handleRepository = async () => {
      try {
        setLoading(true)
        const { data } = await getRepository(user, name)
        setRepositoryData(data)
      } catch (error) {
        setLoading(false)
      } finally {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        setLoading(false)
      }
    }

    handleRepository()
  }, [name, user])

  return (
    <div className="container repositoryDetails">
      {loading
        ? <div className="text-center loading-box">
            <i role="status" className="spinner-border spinner-border-md" />
          </div>
        : <div>
          <div className="row title-box">
            <h2>{repositoryData?.name}</h2>
            <span>
              <i className="fas fa-star mr-1" />
              {repositoryData?.stargazers_count}
            </span>
          </div>
          <Commits user={user} name={name} />
        </div>
      }
    </div>
  )
}

export default RepositoryDetails
