import { FC, PropsWithChildren } from 'react'

import './Layout.scss'

export const Layout: FC<PropsWithChildren> = props => {
  return (
    <>
      {/* Added this just as an imaginary header */}
      <header></header>
      <main className='Layout'>
        {props.children}
      </main>
      {/* Added this just as an imaginary footer */}
      <footer></footer>
    </>
  )
}
