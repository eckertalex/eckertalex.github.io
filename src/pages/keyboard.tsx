import {VStack, Divider, useColorModeValue as mode} from '@chakra-ui/react'
import {getFileBySlug, MDXPage} from 'lib/mdx'
import metadata from 'metadata'
import {MDXRemote} from 'next-mdx-remote'
import {MDXComponents} from 'features/mdx/mdx-components'
import {PageSeo} from 'features/seo/seo'
import {PageTitle} from 'layout/page-title'

export default function Keyboard({keyboard}: {keyboard: MDXPage}) {
  const {mdxSource, frontMatter} = keyboard

  return (
    <VStack alignItems="start" spacing={8}>
      <PageSeo title={`${frontMatter.title} - ${metadata.author}`} url={`${metadata.siteUrl}/keyboard`} />
      <PageTitle as="h1">{frontMatter.title}</PageTitle>
      <Divider borderColor={mode('gray.700', 'gray.200')} />
      <VStack alignItems="start" spacing={2}>
        <MDXRemote {...mdxSource} components={MDXComponents} />
      </VStack>
    </VStack>
  )
}

export async function getStaticProps() {
  const keyboard = await getFileBySlug('keyboard')

  return {props: {keyboard}}
}
