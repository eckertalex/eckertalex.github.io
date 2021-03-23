import React from 'react'
import Image from 'next/image'
import {LoadingButton} from '@/components/loading-button'
import type {LoadingButtonProps} from '@/components/loading-button'

function SuccessMessage({children}: {children: React.ReactNode}) {
  return (
    <p className="flex items-center text-sm font-bold text-green-700 dark:text-green-400">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="mr-2 h-4 w-4">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      </svg>
      {children}
    </p>
  )
}

function ErrorMessage({children}: {children: React.ReactNode}) {
  return (
    <p className="flex items-center text-sm font-bold text-red-800 dark:text-red-400">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="mr-2 h-4 w-4">
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
          clipRule="evenodd"
        />
      </svg>
      {children}
    </p>
  )
}

function EmailIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
    </svg>
  )
}

function LoadingIcon() {
  return (
    <svg
      className="h-5 w-5"
      data-spin
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M20 4v5h-.582m0 0a8.001 8.001 0 00-15.356 2m15.356-2H15M4 20v-5h.581m0 0a8.003 8.003 0 0015.357-2M4.581 15H9"
      />
    </svg>
  )
}

function ErrorIcon() {
  return (
    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  )
}

export function Subscribe() {
  const [status, setStatus] = React.useState<LoadingButtonProps['state']>('idle')
  const [formError, setFormError] = React.useState<string>()
  const [formSuccess, setFormSuccess] = React.useState<string>()
  const emailInputRef = React.useRef<HTMLInputElement>(null)

  const colors = {
    idle: {
      bg: 'bg-pink-500 border-pink-500',
      hover: 'hover:bg-pink-600 hover:border-pink-600',
      ring: 'focus:ring-pink-600',
    },
    loading: {
      bg: 'bg-pink-500 border-pink-500',
      hover: 'hover:bg-pink-600 hover:border-pink-600',
      ring: 'focus:ring-pink-600',
    },
    error: {
      bg: 'bg-red-600 border-red-600',
      hover: 'hover:bg-red-700 hover:border-red-700',
      ring: 'focus:ring-red-700',
    },
    success: {
      bg: 'bg-green-600 border-green-600',
      hover: 'hover:bg-green-700 hover:border-green-700',
      ring: 'focus:ring-green-700',
    },
  }

  async function handleSubscribe(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')

    const res = await fetch('/api/subscribe', {
      body: JSON.stringify({
        email: emailInputRef.current?.value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })

    const {error} = await res.json()
    if (error) {
      setStatus('error')
      setFormError(error)
      return
    }

    if (emailInputRef.current) {
      emailInputRef.current.value = ''
    }

    setStatus('success')
    setFormSuccess("Hooray! You're now on the list.")
  }

  return (
    <div className="max-w-screen-sm border border-pink-400 bg-white dark:bg-gray-700 rounded shadow-lg px-8 py-4">
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
      <form onSubmit={handleSubscribe}>
        <input
          idaira-label="Email for newsletter"
          ref={emailInputRef}
          placeholder="jane@doe.com"
          type="email"
          autoComplete="email"
          required
          className="mt-4 mb-6 border-l border-t border-b border-gray-200 dark:border-gray-900 rounded-l-md w-full text-base md:text-lg px-3 py-2 focus:ring-pink-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        />
        {status === 'error' ? (
          <ErrorMessage>{formError}</ErrorMessage>
        ) : status === 'success' ? (
          <SuccessMessage>{formSuccess}</SuccessMessage>
        ) : null}
        <div className="flex items-center justify-end">
          <LoadingButton
            type="submit"
            state={status}
            text="Subscribe"
            textLoading="Subscribing..."
            ariaText="Subscribe to newsletter"
            ariaLoadingAlert="Newsletter subscription is loading"
            ariaSuccessAlert="Successfully subscribed to newsletter"
            ariaErrorAlert="Error subscribing to newsletter"
            icon={<EmailIcon />}
            iconError={<ErrorIcon />}
            iconLoading={<LoadingIcon />}
            iconSuccess={<CheckIcon />}
            className={`p-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white ${colors[status].bg} ${colors[status].hover} focus:outline-none focus:ring-2 focus:ring-offset-2 ${colors[status].ring}`}
          />
        </div>
      </form>
    </div>
  )
}
