import React from 'react'

type GitHubURLParts = {
  ns: string
  user: string
  repo: string
  branch: string
  file: string
}

function useGitHubUrl(url: string) {
  const [parts, setParts] = React.useState<GitHubURLParts | null>(null)

  React.useMemo(() => {
    const regex =
      /^https:\/\/[\w.]*(?<ns>github)[\w]*\.com\/(?<user>[\w-]+)\/(?<repo>[\w.-]+)\/(?:(?:blob\/)?(?<branch>[\w]+)\/)(?<file>[\w/.-]+.(?:csv))/
    const res = regex.exec(url)

    if (res?.groups) {
      setParts({
        ns: res.groups.ns,
        user: res.groups.user,
        repo: res.groups.repo,
        branch: res.groups.branch,
        file: res.groups.file,
      })
    }
  }, [url])

  return parts
}

export {useGitHubUrl}
