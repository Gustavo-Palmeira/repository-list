import React, { useState, useEffect } from 'react'

import Repositories from '../../components/repositories/repositories'
import { getRepositories } from '../../services/github'
import Search from '../../components/search/search'

import './home.scss'

const Home = () => {
  const [publicRepos, setPublicRepos] = useState(0)
  const [repositories, setRepositories] = useState([])
  const [username, setUsername] = useState('facebook')
  const [loading, setLoading] = useState(false)
  const [loadMore, setLoadMore] = useState(false)
  const [error, setError] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const changeUser = (user) => {
    setRepositories([])
    setPublicRepos(0)
    setCurrentPage(1)
    setUsername(user)
  }

  const handleRepositories = async () => {
    try {
      currentPage === 1 ? setLoading(true) : setLoadMore(true)
      const { data, publicRepos } = await getRepositories(username, 'repos', currentPage)
      setPublicRepos(publicRepos)
      setRepositories((repositories) => [...repositories, ...data])
      data.length < 1 ? setError('Esse usuário não possui repositórios públicos') : setError('') 
    } catch (error) {
      setError('Não foi possível realizar a pesquisa')
      setRepositories([])
      setPublicRepos(0)
    } finally {
      setLoading(false)
      setLoadMore(false)
    }
  }

  const handleChangePage = () => {
    if (repositories.length < publicRepos && username !== '') {
      setCurrentPage((currentPage) => currentPage + 1)
    }
  }

  useEffect(() => {
    if (username !== '' && currentPage !== 1) handleRepositories()
  }, [currentPage])

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        handleChangePage()
      }
    })
    intersectionObserver.observe(document.querySelector('.observer'))

    return () => intersectionObserver.disconnect()
  }, [repositories.length, publicRepos])

  return (
    <div className="container home">
      <h2 className="text-center">Digite o nome do usuário e pesquise seus repositórios públicos</h2>
      <Search
        username={username}
        changeUser={changeUser}
        error={error}
        submitButton={handleRepositories}
      />
      {loading
        ? <div className="text-center loading-box">
            <i role="status" className="spinner-border spinner-border-md" />
          </div>
        : <Repositories
            repositories={repositories}
          />
      }
      {loadMore &&
        <div className="text-center loading-box">
          <i role="status" className="spinner-border spinner-border-md" />
        </div>
      }
      <span className="observer" />
    </div>
  )
}

export default Home
