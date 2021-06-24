import React from 'react'
import {useLocalStorage} from '@/hooks/use-local-storage'
import {useGitHubUrl} from '@/hooks/use-github-url'

const useGithubUsername = (initialValue) => useLocalStorage('eckertalex_dev__github_username', initialValue)
const useAuthorName = (initialValue) => useLocalStorage('eckertalex_dev__author_name', initialValue)
const useAuthorEmail = (initialValue) => useLocalStorage('eckertalex_dev__author_email', initialValue)
const useGithubAccessToken = (initialValue) => useLocalStorage('eckertalex_dev__github_access_token', initialValue)
const useFileUrl = (initialValue) => useLocalStorage('eckertalex_dev__file_url', initialValue)

function useGitrows() {
  const [gitrows, setGitrows] = React.useState(null)
  const [token] = useGithubAccessToken()
  const [githubUsername] = useGithubUsername()
  const [authorName] = useAuthorName()
  const [authorEmail] = useAuthorEmail()
  const [fileUrl] = useFileUrl()
  const meta = useGitHubUrl(fileUrl)
  const ns = meta?.ns
  const user = meta?.user
  const repo = meta?.repo
  const branch = meta?.branch

  React.useEffect(() => {
    const columns = ['author', 'date', 'description', 'image', 'lang', 'logo', 'timestamp', 'title', 'twitter', 'url']

    const instance = new window.Gitrows({
      ns,
      owner: user,
      repo,
      branch,
      user: githubUsername,
      token,
      author: {name: authorName, email: authorEmail},
      csv: {delimiter: ','},
      type: 'csv',
      columns,
      strict: true,
    })

    setGitrows(instance)
  }, [authorEmail, authorName, branch, githubUsername, ns, repo, token, user])

  return gitrows
}

function useGitrowsTest() {
  const [fileUrl] = useFileUrl()
  const gitrows = useGitrows()

  return () => gitrows.test(fileUrl)
}

export {useGitrowsTest, useGitrows, useGithubUsername, useAuthorName, useAuthorEmail, useGithubAccessToken, useFileUrl}
