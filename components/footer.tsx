import {VStack, HStack, Text, useColorModeValue as mode} from '@chakra-ui/react'
import {CustomLink} from '@/components/link'
import siteMetadata from '@/data/siteMetadata.json'
import {SocialIcons} from '@/components/social-icons'
import {NowPlaying} from '@/components/now-playing'

function Footer() {
  return (
    <VStack as="footer" spacing={4} justifyContent="center" marginTop={16} marginBottom={8}>
      <div>
        <NowPlaying />
      </div>
      <HStack spacing={8}>
        <SocialIcons href={siteMetadata.twitter} kind="twitter" />
        <SocialIcons href={siteMetadata.github} kind="github" />
        <SocialIcons href={siteMetadata.keybase} kind="keybase" />
        <SocialIcons href={siteMetadata.linkedin} kind="linkedin" />
        <SocialIcons href={`mailto:${siteMetadata.email}`} kind="mail" />
      </HStack>
      <HStack spacing={{base: 8, md: 32}} alignItems="start">
        <VStack alignItems="start">
          <CustomLink href="/">Home</CustomLink>
          <CustomLink href="/about">About</CustomLink>
          <CustomLink href="/dashboard">Dashboard</CustomLink>
          <CustomLink href="/reading">Reading</CustomLink>
          <CustomLink href="/reading/new">New Reading</CustomLink>
        </VStack>
        <VStack alignItems="start">
          <CustomLink href="/timeline">Timeline</CustomLink>
          <CustomLink href="/blog">Blog</CustomLink>
          <CustomLink href="/tags">Tags</CustomLink>
          <CustomLink href="/bookmarks">Bookmarks</CustomLink>
        </VStack>
        <VStack alignItems="start">
          <CustomLink href="/uses">Uses</CustomLink>
          <CustomLink href="/vscode">VSCode</CustomLink>
          <CustomLink href="/terminal">Terminal</CustomLink>
          <CustomLink href="/git">Git</CustomLink>
          <CustomLink href="/keyboard">Keyboard</CustomLink>
        </VStack>
      </HStack>
      <HStack spacing={2} color={mode('gray.500', 'gray.400')} fontSize="small">
        <CustomLink href="/">{siteMetadata.author}</CustomLink>
        <Text>{` • `}</Text>
        <Text>{`© ${new Date().getFullYear()}`}</Text>
      </HStack>{' '}
      <HStack spacing={2} color={mode('gray.500', 'gray.400')} fontSize="small">
        <CustomLink href="/impressum">Impressum</CustomLink>
        <Text>{` • `}</Text>
        <CustomLink href="/datenschutz">Datenschutz</CustomLink>
        <Text>{` • `}</Text>
        <CustomLink href="/credits">Credits</CustomLink>
      </HStack>
    </VStack>
  )
}

export {Footer}
