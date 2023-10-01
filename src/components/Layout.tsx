import React, { ReactNode } from 'react'
import Head from 'next/head'
import { Header } from './Header'
type Title = {
  title: string
  children: ReactNode
}
export const Layout: React.FC<Title> = ({ children, title = 'Todo app' }) => {
  return (<div>
    <Head>
      <title>{title}</title>
    </Head>
    <Header></Header>
    <div className="flex min-h-screen flex-col items-center justify-center font-mono text-gray-800">

      <main className="flex w-screen flex-1 flex-col items-center justify-center">
        {children}
      </main>
      <footer className="flex h-12 w-full items-center justify-center border-t">
        {/* <BadgeCheckIcon className="h-6 w-6 text-blue-500" /> */}
      </footer>
    </div>
  </div>
  )
}
