import Head from 'next/head';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { Store } from '../utils/Store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSession } from 'next-auth/react';

export default function Layout({ title, children }) {

  const { status, data: session } = useSession();


  const { state } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemCount] =  useState(0)
  useEffect(() => {
    setCartItemCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0))
  }, [cart.cartItems])
  return (
    <>
      <Head>
        <title>{title ? title + ' - Ecomerce' : 'Ecomerce'}</title>
        <meta name="description" content="Ecommerce Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ToastContainer position='bottom-center' limit={1} />

      <div className="flex min-h-screen flex-col justify-between">
        <header>
          <nav className="flex h-12 items-center px-4 justify-between shadow-xl bg-black text-white">
            <Link href="/">
              <a className="text-lg font-bold">NextJs Ecomerce</a>
            </Link>
            <div>
              <Link href="/cart">
                <a className="p-2">Cart
                {cartItemsCount > 0 && (
                  <span className='ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white'>
                    {cartItemsCount}
                  </span>
                )}
                </a>
              </Link>

                {status === 'loading' ? (
                  'Loading'
                  ) : session?.user ? ( 
                    session.user.name 
                  ) : (
                  <Link href="/login">
                  <a className="p-2">Login</a>
                </Link>
                )}

            </div>
          </nav>
        </header>
        <main className="container m-auto mt-4 px-2">{children}</main>
        <footer className="flex h-10 justify-center items-center bg-black text-white">
          <p>Copyright © 2023 Sam Lalli</p>
        </footer>
      </div>
    </>
  );
}
