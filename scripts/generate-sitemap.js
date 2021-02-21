const fs = require('fs')
const globby = require('globby')
const prettier = require('prettier')
const siteMetadata = require('../data/siteMetadata')

;(async () => {
  const prettierConfig = await prettier.resolveConfig('./.prettierrc.js'),
    pages = await globby([
      'pages/*.tsx',
      'pages/*.jsx',
      'pages/*.js',
      'data/**/*.mdx',
      'data/**/*.md',
      'public/tags/**/*.xml',
      '!pages/_*.tsx',
      '!pages/_*.jsx',
      '!pages/_*.js',
      '!pages/api',
    ]),
    sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${pages
              .map((page) => {
                const path = page
                    .replace('pages', '')
                    .replace('data', '')
                    .replace('public', '')
                    .replace('.tsx', '')
                    .replace('.jsx', '')
                    .replace('.js', '')
                    .replace('.mdx', '')
                    .replace('.md', '')
                    .replace('/index.xml', ''),
                  route = path === '/index' ? '' : path
                return `
                        <url>
                            <loc>${`${siteMetadata.siteUrl}${route}`}</loc>
                        </url>
                    `
              })
              .join('')}
        </urlset>
    `,
    formatted = prettier.format(sitemap, {
      ...prettierConfig,
      parser: 'html',
    })

  // eslint-disable-next-line no-sync
  fs.writeFileSync('public/sitemap.xml', formatted)
})()
