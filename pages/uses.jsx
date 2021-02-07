import {getFileBySlug} from '@/lib/mdx'
import siteMetadata from '@/data/siteMetadata'
import hydrate from 'next-mdx-remote/hydrate'
import {SocialIcons} from '@/components/social-icons'
import {MDXComponents} from '@/components/mdx-components'
import {PageSeo} from '@/components/seo'
import {PageTitle} from '@/components/page-title'

export default function Uses({uses}) {
  const {mdxSource, frontMatter} = uses
  const content = hydrate(mdxSource, {
    components: MDXComponents,
  })

  return (
    <>
      <PageSeo
        title={`${frontMatter.title} - ${siteMetadata.author}`}
        description={`${frontMatter.title} - ${siteMetadata.author}`}
        url={`${siteMetadata.siteUrl}/uses`}
      />
      <div className="divide-y">
        <div className="pt-6 pb-8 space-y-2 md:space-y-5">
          <PageTitle>{frontMatter.title}</PageTitle>
        </div>
        <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
          <div className="pt-8 pb-8 prose dark:prose-dark max-w-none xl:col-span-2">{content}</div>
        </div>
      </div>
    </>
  )
}

export async function getStaticProps({params}) {
  const uses = await getFileBySlug('uses')

  return {props: {uses}}
}