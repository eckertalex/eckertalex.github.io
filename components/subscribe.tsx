import React from 'react'
import Image from 'next/image'
// import {LoadingButton} from '@/components/loading-button'

export function Subscribe() {
  return (
    <div className="border border-pink-400 bg-white dark:bg-gray-700 rounded shadow-lg px-8 py-4">
      <Image
        className="rounded"
        alt="Frontend Brew"
        src="/static/img/frontend-brew/android-chrome-512x512.png"
        width={48}
        height={48}
      />
      <h1 className="text-xl font-semibold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-2xl sm:leading-10 md:text-3xl md:leading-14">
        Subscribe to Frontend Brew!{' '}
        <span role="img" aria-label="Coffee">
          ☕
        </span>
      </h1>
      <p className="text-base md:text-lg text-gray-900 dark:text-gray-100 mt-3 ">
        Frontend Brew is all about frontend web development with TypeScript and React.
      </p>
      <div className="flex items-center my-10">
        <input
          aria-label="Email for newsletter"
          placeholder="tim@apple.com"
          type="email"
          autoComplete="email"
          required
          className="border-l border-t border-b border-gray-200 rounded-l-md w-full text-base md:text-lg px-3 py-2 focus:ring-pink-500"
        />
        <button className="bg-pink-500 hover:bg-pink-600 hover:border-pink-600 text-white font-bold px-3 py-2 text-base md:text-lg rounded-r-md border-t border-r border-b border-pink-500">
          Subscribe
        </button>
      </div>
    </div>
  )
}
