import React from 'react'
import Script from 'next/script'
import {VStack, Divider, useColorModeValue as mode} from '@chakra-ui/react'
import siteMetadata from '@/data/siteMetadata'
import {PageSeo} from '@/components/seo'
import {PageTitle} from '@/components/page-title'
import {RepoSettingsForm} from '@/components/repo-settings-form'
import {GitSettingsForm} from '@/components/git-settings-form'

export default function AddBookmarkSettings() {
  return (
    <VStack alignItems="start" spacing={8}>
      <Script src="https://unpkg.com/gitrows@latest/dist/gitrows.min.js" strategy="beforeInteractive" />
      <PageSeo
        title={`New Reading Settings - ${siteMetadata.author}`}
        url={`${siteMetadata.siteUrl}/reading/settings`}
      />
      <PageTitle as="h1">New Reading Settings</PageTitle>
      <Divider borderColor={mode('gray.700', 'gray.200')} />
      <RepoSettingsForm />
      <GitSettingsForm />
    </VStack>
  )
}
