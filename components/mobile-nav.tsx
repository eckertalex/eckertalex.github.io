import {useState} from 'react'
import {CustomLink} from '@/components/link'
import {headerNavLinks} from '@/data/navLinks'

export function MobileNav() {
  const [navShow, setNavShow] = useState(false),
    onToggleNav = () => {
      setNavShow((status) => {
        if (status) {
          document.body.style.overflow = 'auto'
        } else {
          // Prevent scrolling
          document.body.style.overflow = 'hidden'
        }
        return !status
      })
    }

  return (
    <div className="sm:hidden">
      <button aria-label="Toggle Menu" className="w-8 h-8 ml-1 mr-1 rounded" onClick={onToggleNav} type="button">
        <svg
          className="text-gray-900 dark:text-gray-100"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          {navShow ? (
            <path
              clipRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              fillRule="evenodd"
            />
          ) : (
            <path
              clipRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              fillRule="evenodd"
            />
          )}
        </svg>
      </button>
      <div
        className={`fixed w-full h-full top-24 right-0 bg-gray-200 dark:bg-gray-800 opacity-95 z-10 transform ease-in-out duration-300 ${
          navShow ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button
          aria-label="toggle modal"
          className="fixed w-full h-full cursor-auto focus:outline-none"
          onClick={onToggleNav}
          type="button"
        />
        <nav className="fixed h-full mt-8">
          {headerNavLinks.map((link) => (
            <div className="px-12 py-4" key={link.title}>
              <CustomLink
                className="text-2xl font-bold tracking-widest text-gray-900 dark:text-gray-100"
                href={link.href}
                onClick={onToggleNav}
              >
                {link.title}
              </CustomLink>
            </div>
          ))}
        </nav>
      </div>
    </div>
  )
}
