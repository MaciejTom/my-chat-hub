import React from 'react'
import {Link, Outlet} from 'react-router-dom'
import {Footer} from './Footer'
import {Header} from './Header'
type Props = {}

export const Layout = (props: Props) => {
  return (
    <>
    <Header/>
    <Outlet/>
    <Footer/>
    </>
  )
}