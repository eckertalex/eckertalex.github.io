import React from 'react'
import {useRouter} from 'next/router'
import Script from 'next/script'
import Link from 'next/link'
import {VStack, Divider, IconButton, useColorModeValue as mode} from '@chakra-ui/react'
import siteMetadata from '@/data/siteMetadata'
import {PageSeo} from '@/components/seo'
import {PageTitle} from '@/components/page-title'
import {useGithubUsername, useAuthorName, useAuthorEmail, useGithubAccessToken, useFileUrl} from '@/hooks/use-gitrows'
import {Settings as SettingsIcon} from 'lucide-react'

export default function AddBookmark() {
  const [token] = useGithubAccessToken()
  const [githubUsername] = useGithubUsername()
  const [authorName] = useAuthorName()
  const [authorEmail] = useAuthorEmail()
  const [fileUrl] = useFileUrl()

  const router = useRouter()

  React.useEffect(() => {
    if (token && githubUsername && authorName && authorEmail && fileUrl) {
      return
    }

    router.push('/reading/settings')
  }, [token, router, githubUsername, authorName, authorEmail, fileUrl])

  return (
    <VStack alignItems="start" spacing={8}>
      <Script src="https://unpkg.com/gitrows@latest/dist/gitrows.min.js" strategy="beforeInteractive" />
      <PageSeo title={`New Reading - ${siteMetadata.author}`} url={`${siteMetadata.siteUrl}/reading/new`} />
      <PageTitle as="h1">New Reading</PageTitle>
      <Divider borderColor={mode('gray.700', 'gray.200')} />
      <Link href="/reading/settings" passHref>
        <IconButton alignSelf="flex-end" aria-label="Settings" icon={<SettingsIcon />} />
      </Link>
    </VStack>
  )
}
