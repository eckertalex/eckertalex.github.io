import React from 'react'
import {VStack, Heading, Input, FormControl, FormLabel, FormHelperText} from '@chakra-ui/react'
import {useGithubUsername, useAuthorName, useAuthorEmail} from '@/hooks/use-gitrows'

function GitSettingsForm() {
  const [githubUsername, setGithubUsername] = useGithubUsername()
  const [authorName, setAuthorName] = useAuthorName()
  const [authorEmail, setAuthorEmail] = useAuthorEmail()
  return (
    <VStack align="flex-start" w="full" spacing={6}>
      <Heading fontSize="xl">Git Settings</Heading>
      <FormControl id="github-username" isRequired>
        <FormLabel>GitHub Username</FormLabel>
        <Input value={githubUsername} onChange={(e) => setGithubUsername(e.target.value)} size="md" w="full" />
        <FormHelperText>The GitHub username associated with the token</FormHelperText>
      </FormControl>
      <FormControl id="author-name" isRequired>
        <FormLabel>Commit Author Name</FormLabel>
        <Input value={authorName} onChange={(e) => setAuthorName(e.target.value)} size="md" w="full" />
        <FormHelperText>This name will be shown as the author of file update commits</FormHelperText>
      </FormControl>
      <FormControl id="author-email" isRequired>
        <FormLabel>Commit Author Email</FormLabel>
        <Input value={authorEmail} onChange={(e) => setAuthorEmail(e.target.value)} size="md" w="full" />
      </FormControl>
    </VStack>
  )
}

export {GitSettingsForm}
