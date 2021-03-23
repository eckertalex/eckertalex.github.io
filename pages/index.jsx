import tinytime from 'tinytime'
import {getAllFilesFrontMatter, getFileBySlug} from '@/lib/mdx'
import siteMetadata from '@/data/siteMetadata'
import {Tag} from '@/components/tag'
import {CustomLink} from '@/components/link'
import {PageSeo} from '@/components/seo'
import {PageTitle} from '@/components/page-title'
import {MDXComponents} from '@/components/mdx-components'
import hydrate from 'next-mdx-remote/hydrate'

const MAX_DISPLAY = 3,
  postDateTemplate = tinytime('{MMMM} {DD}, {YYYY}')

export default function Home({posts, projects, hero}) {
  const {mdxSource: projectsMdxSource, frontMatter: projectsFrontMatter} = projects,
    projectsContent = hydrate(projectsMdxSource, {
      components: MDXComponents,
    }),
    {mdxSource: heroMdxSource, frontMatter: heroFrontMatter} = hero,
    heroContent = hydrate(heroMdxSource, {
      components: MDXComponents,
    })

  return (
    <>
      <PageSeo
        description={siteMetadata.description}
        title={`${siteMetadata.author} - ${siteMetadata.description}`}
        url={siteMetadata.siteUrl}
      />

      <div className="pt-6 pb-8 space-y-2 md:space-y-5">
        <PageTitle>{heroFrontMatter.title}</PageTitle>
      </div>
      <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
        <div className="pt-8 pb-8 prose dark:prose-dark max-w-none xl:col-span-2">{heroContent}</div>
      </div>

      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="pt-6 pb-8 space-y-2 md:space-y-5">
          <PageTitle>Latest Posts</PageTitle>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">{siteMetadata.description}</p>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((frontMatter) => {
            const {slug, date, title, summary, tags} = frontMatter
            return (
              <li className="py-12" key={slug}>
                <article className="space-y-2 xl:grid xl:grid-cols-4 xl:space-y-0 xl:items-baseline">
                  <dl>
                    <dt className="sr-only">Published on</dt>
                    <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                      <time dateTime={date}>{postDateTemplate.render(new Date(date))}</time>
                    </dd>
                  </dl>
                  <div className="space-y-5 xl:col-span-3">
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-2xl font-bold leading-8 tracking-tight">
                          <CustomLink className="text-gray-900 dark:text-gray-100" href={`/blog/${slug}`}>
                            {title}
                          </CustomLink>
                        </h2>
                        <div className="space-x-3">
                          {tags.map((tag) => (
                            <Tag key={tag} text={tag} />
                          ))}
                        </div>
                      </div>
                      <div className="prose text-gray-500 max-w-none dark:text-gray-400">{summary}</div>
                    </div>
                    <div className="text-base font-medium leading-6">
                      <CustomLink
                        aria-label={`Read "${title}"`}
                        className="text-pink-500 hover:text-pink-600 dark:hover:text-pink-400"
                        href={`/blog/${slug}`}
                      >
                        Read more &rarr;
                      </CustomLink>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <CustomLink
            aria-label="all posts"
            className="text-pink-500 hover:text-pink-600 dark:hover:text-pink-400"
            href="/blog"
          >
            All Posts &rarr;
          </CustomLink>
        </div>
      )}
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="pt-6 pb-8 space-y-2 md:space-y-5">
          <PageTitle>{projectsFrontMatter.title}</PageTitle>
        </div>
        <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
          <div className="pt-8 pb-8 prose dark:prose-dark max-w-none xl:col-span-2">{projectsContent}</div>
        </div>
      </div>
    </>
  )
}

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog'),
    projects = await getFileBySlug('projects'),
    hero = await getFileBySlug('hero')

  return {props: {posts, projects, hero}}
}
