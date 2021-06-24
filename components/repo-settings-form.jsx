import React from 'react'
import Link from 'next/link'
import {
  VStack,
  HStack,
  Heading,
  InputGroup,
  Input,
  InputRightElement,
  Button,
  FormControl,
  FormLabel,
  IconButton,
  FormErrorMessage,
  FormHelperText,
  Text,
  Code,
  useBoolean,
} from '@chakra-ui/react'
import {Eye as EyeIcon, EyeOff as EyeOffIcon, UploadCloud as UploadCloudIcon, Plus as PlusIcon} from 'lucide-react'
import {useGitrowsTest} from '@/hooks/use-gitrows'
import {CustomLink} from '@/components/link'
import {useGithubAccessToken, useFileUrl} from '@/hooks/use-gitrows'

function RepoSettingsForm() {
  const [token, setToken] = useGithubAccessToken()
  const [fileUrl, setFileUrl] = useFileUrl()
  const [isShown, setShown] = useBoolean()
  const [connectionStatus, setConnectionStatus] = React.useState('idle')
  const [response, setResponse] = React.useState()
  const testConnection = useGitrowsTest()

  async function handleTestConnection(event) {
    event.preventDefault()
    setResponse()
    setConnectionStatus('pending')
    testConnection()
      .then((response) => {
        if (response.valid) {
          setResponse(response)
          setConnectionStatus('success')
        } else {
          setResponse(response)
          setConnectionStatus('error')
        }
      })
      .catch((error) => {
        setResponse(error)
        setConnectionStatus('error')
      })
  }

  return (
    <VStack align="flex-start" as="form" spacing={6} w="full" onSubmit={handleTestConnection}>
      <HStack w="full" justify="space-between">
        <Heading fontSize="xl">Connect your repository</Heading>
        <Link href="/reading/new" passHref>
          <Button as="a" leftIcon={<PlusIcon />}>
            Add Bookmark
          </Button>
        </Link>
      </HStack>
      <FormControl id="github-token" isInvalid={connectionStatus === 'error'} isRequired>
        <FormLabel>GitHub Token</FormLabel>
        <InputGroup size="md" w="full">
          <Input
            type={isShown ? 'text' : 'password'}
            placeholder="Enter GitHub Token "
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
          <InputRightElement>
            <IconButton
              aria-label={isShown ? 'Hide github token' : 'Show github token'}
              size="sm"
              variant="ghost"
              onClick={setShown.toggle}
              icon={isShown ? <EyeOffIcon /> : <EyeIcon />}
            />
          </InputRightElement>
        </InputGroup>
        <FormHelperText>
          Generate a{' '}
          <CustomLink href="https://github.com/settings/tokens/new?scopes=repo,read:repo_hook&description=Gitrows">
            Personal Access Token
          </CustomLink>{' '}
          and paste it here.
        </FormHelperText>
        <FormHelperText>Your token is stored on this device and is only sent to GitHub.</FormHelperText>
        <FormErrorMessage>Oh snap, token or file url invalid</FormErrorMessage>
      </FormControl>
      <FormControl id="file-url" isInvalid={connectionStatus === 'error'} isRequired>
        <FormLabel>File URL</FormLabel>
        <Input
          value={fileUrl}
          onChange={(e) => setFileUrl(e.target.value)}
          placeholder="https://github.com/user/repo/blob/branch/file.csv"
          size="md"
          w="full"
        />
        <FormHelperText>Full URL to a CSV file in a GitHub repository. Must have the following header:</FormHelperText>
        <FormHelperText>
          <Code>author,date,description,image,lang,logo,timestamp,title,twitter,url</Code>
        </FormHelperText>
        <FormErrorMessage>Oh snap, token or file url invalid</FormErrorMessage>
      </FormControl>
      <Button
        type="submit"
        colorScheme={connectionStatus === 'success' ? 'green' : connectionStatus === 'error' ? 'red' : 'gray'}
        leftIcon={<UploadCloudIcon />}
        isLoading={connectionStatus === 'pending'}
        loadingText="Testing..."
        isFullWidth
      >
        Test Connection
      </Button>
      {connectionStatus === 'success' ? (
        <Text>
          Success! Your bookmark will be saved to{' '}
          <Code>
            @{response.ns}/{response.owner}/{response.repo}/{response.path}
          </Code>
        </Text>
      ) : connectionStatus === 'error' ? (
        <Text>
          Oh snap! Something went wrong{' '}
          <Code>
            {response.code}: {response.message.description}
          </Code>
        </Text>
      ) : null}
    </VStack>
  )
}

export {RepoSettingsForm}
