import siteMetadata from '@/data/siteMetadata.json'
import {headerNavLinks} from '@/data/navLinks'
import {CustomLink} from '@/components/link'
import {SectionContainer} from '@/components/section-container'
import {Footer} from '@/components/footer'
import {MobileNav} from '@/components/mobile-nav'
import {ThemeSwitch} from '@/components/theme-switch'
import {Subscribe} from '@/components/subscribe'

type LayoutWrapperProps = {
  children: React.ReactNode
}

export function LayoutWrapper(props: LayoutWrapperProps) {
  const {children} = props

  return (
    <SectionContainer>
      <div className="flex flex-col justify-between h-screen">
        <header className="flex items-center justify-between py-10">
          <div>
            <CustomLink aria-label="eckertalex.dev" className="hover:no-underline" href="/">
              <div className="flex items-center justify-between font-mono text-2xl font-semibold text-pink-500">
                <div className="block md:hidden">AE</div>
                <div className="hidden md:block">{siteMetadata.author}</div>
              </div>
            </CustomLink>
          </div>
          <div className="flex items-center text-base leading-5">
            <div className="hidden sm:block">
              {headerNavLinks.map((link) => (
                <CustomLink
                  className="p-1 font-medium text-gray-700 sm:p-4 dark:text-gray-400"
                  href={link.href}
                  key={link.title}
                >
                  {link.title}
                </CustomLink>
              ))}
            </div>
            <ThemeSwitch />
            <MobileNav />
          </div>
        </header>
        <main className="mb-auto">{children}</main>
        <Subscribe />
        <Footer />
      </div>
    </SectionContainer>
  )
}
