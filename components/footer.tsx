import {CustomLink} from '@/components/link'
import siteMetadata from '@/data/siteMetadata.json'
import {SocialIcons} from '@/components/social-icons'
import {NowPlaying} from '@/components/now-playing'

export function Footer() {
  return (
    <footer className="flex flex-col items-center mt-16">
      <div className="flex space-x-4">
        <NowPlaying />
      </div>
      <div className="w-full max-w-2xl grid grid-cols-1 gap-4 pb-16 sm:grid-cols-4">
        <div className="flex flex-col space-y-4">
          <CustomLink className="font-medium text-gray-700 dark:text-gray-400" href="/">
            Home
          </CustomLink>
          <CustomLink className="font-medium text-gray-700 dark:text-gray-400" href="/about">
            About
          </CustomLink>
          <CustomLink className="font-medium text-gray-700 dark:text-gray-400" href="/newsletter">
            Newsletter
          </CustomLink>
        </div>
        <div className="flex flex-col space-y-4">
          <CustomLink className="font-medium text-gray-700 dark:text-gray-400" href="/dashboard">
            Dashboard
          </CustomLink>
          <CustomLink className="font-medium text-gray-700 dark:text-gray-400" href="/blog">
            Blog
          </CustomLink>
          <CustomLink className="font-medium text-gray-700 dark:text-gray-400" href="/tags">
            Tags
          </CustomLink>
        </div>
        <div className="flex flex-col space-y-4">
          <CustomLink className="font-medium text-gray-700 dark:text-gray-400" href="/uses">
            Uses
          </CustomLink>
          <CustomLink className="font-medium text-gray-700 dark:text-gray-400" href="/links">
            Links
          </CustomLink>
          <CustomLink className="font-medium text-gray-700 dark:text-gray-400" href="/articles">
            Articles
          </CustomLink>
        </div>
        <div className="flex flex-col space-y-4">
          <CustomLink className="font-medium text-gray-700 dark:text-gray-400" href="/vscode">
            VSCode
          </CustomLink>
          <CustomLink className="font-medium text-gray-700 dark:text-gray-400" href="/git">
            Git
          </CustomLink>
          <CustomLink className="font-medium text-gray-700 dark:text-gray-400" href="/terminal">
            Terminal
          </CustomLink>
          <CustomLink className="font-medium text-gray-700 dark:text-gray-400" href="/keyboard">
            Keyboard
          </CustomLink>
        </div>
      </div>
      <div className="flex mb-3 space-x-4">
        <SocialIcons href={`mailto:${siteMetadata.email}`} kind="mail" size={6} />
        <SocialIcons href={siteMetadata.github} kind="github" size={6} />
        <SocialIcons href={siteMetadata.linkedin} kind="linkedin" size={6} />
        <SocialIcons href={siteMetadata.twitter} kind="twitter" size={6} />
      </div>
      <div className="flex mb-2 space-x-2 text-sm text-gray-500 dark:text-gray-400">
        <CustomLink href="/">{siteMetadata.author}</CustomLink>
        <div>{` • `}</div>
        <div>{`© ${new Date().getFullYear()}`}</div>
      </div>
      <div className="flex mb-2 space-x-2 text-sm text-gray-500 dark:text-gray-400">
        <CustomLink href="/impressum">Impressum</CustomLink>
        <div>{` • `}</div>
        <CustomLink href="/datenschutz">Datenschutz</CustomLink>
      </div>
    </footer>
  )
}
