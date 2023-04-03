import React from 'react'
import {Link, Outlet} from 'react-router-dom'
import {Footer} from './Footer'
import {Header} from './Header'
type Props = {}

export const Layout = (props: Props) => {
  return (
    <div className='h-screen flex flex-col sm:max-height:none'>
    <Header/>
    <div className="flex-1 container px-4 mx-auto flex items-center justify-center">
    <Outlet/>
    </div>
    <Footer/>
    </div>
  )
}