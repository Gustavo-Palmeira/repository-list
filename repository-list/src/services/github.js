import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.github.com',
  timeout: 29000,
})

axios.defaults.headers.common = {
  'Content-Type': 'application/json',
}

export const getRepositories = async (username, resource, page) => {
  const userData = await api.get(`/users/${username}`)
  const publicRepos = userData.data.public_repos

  const { data } = await api.get(`/users/${username}/${resource}?page=${page}`)

  return { data, publicRepos }
}

export const getRepository = async (username, repository) => {
  return api.get(`/repos/${username}/${repository}`)
}

export const getCommits = async (username, repository, page) => {
  const commitsTotalData = await api.get(`/repos/${username}/${repository}/stats/contributors`)
  const commitsTotal = commitsTotalData.data.reduce((prev, info) => prev + info.total, 0)

  const { data } = await api.get(`/repos/${username}/${repository}/commits?page=${page}`)

  return { commitsTotal, data }
}
