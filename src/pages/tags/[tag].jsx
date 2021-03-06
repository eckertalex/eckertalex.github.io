import fs from 'fs'
import path from 'path'
import {kebabCase} from 'lib/utils'
import {getAllBlogPostsFrontMatter} from 'lib/mdx'
import {getAllTags} from 'lib/tags'
import metadata from 'metadata'
import {SearchablePostList} from 'features/blog/searchable-post-list'
import {PageSeo} from 'features/seo/seo'
import {generateRss} from 'lib/generate-rss'

const root = process.cwd()

export default function Tag({posts, tag}) {
  // Capitalize first letter and convert space to dash
  const title = tag[0].toUpperCase() + tag.split(' ').join('-').slice(1)
  return (
    <>
      <PageSeo title={`${tag} - ${metadata.author}`} url={`${metadata.siteUrl}/tags/${tag}`} />
      <SearchablePostList posts={posts} title={title} />
    </>
  )
}

export async function getStaticPaths() {
  const tags = await getAllTags()

  return {
    paths: Object.keys(tags).map((tag) => ({
      params: {
        tag,
      },
    })),
    fallback: false,
  }
}

// https://github.com/vercel/next.js/issues/12053
export async function getStaticProps({params}) {
  const allPosts = await getAllBlogPostsFrontMatter()

  const filteredPosts = allPosts.filter(
    (post) => post.draft !== true && post.tags.map((t) => kebabCase(t)).includes(params.tag)
  )
  // Rss
  const rss = generateRss(filteredPosts, `tags/${params.tag}/index.xml`)
  const rssPath = path.join(root, 'public/tags', params.tag)
  fs.mkdirSync(rssPath, {recursive: true})
  fs.writeFileSync(path.join(rssPath, 'index.xml'), rss)

  return {props: {posts: filteredPosts, tag: params.tag}}
}
