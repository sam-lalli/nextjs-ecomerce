import Head from 'next/head';
import Link from 'next/link';
import React, { useContext, useEffect, useState, Fragment } from 'react';
import { Store } from '../utils/Store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signOut, useSession } from 'next-auth/react';
import { Menu, Transition } from '@headlessui/react';
import Cookies from 'js-cookie';

export default function Layout({ title, children }) {

  const { status, data: session } = useSession();

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemCount] =  useState(0)

  const links = [
    { href: '/profile', label: 'Profile' },
    { href: '/order-history', label: 'Order History' },
    { href: '#', label: 'Logout' },
  ]

  useEffect(() => {
    setCartItemCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0))
  }, [cart.cartItems])


  const logoutHandler = () => {

    Cookies.remove('cart');
    dispatch({ type: 'CART_RESET' });
    signOut({ callbackUrl: '/login' });
  }
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
                    <Menu as="div" className="relative inline-block text-left">
                      <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 p-2 text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                      {session.user.name}
                      </Menu.Button>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {links.map((link) => (
                            link.label === 'Logout' ?
                              <div className="px-1 py-1 ">
                              <Menu.Item key={link.href} as={Fragment}>
                                {({ active }) => (
                                  <a
                                    href={link.href}
                                    className={`${
                                      active ? 'bg-red-600 text-white' : 'text-gray-900'
                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                    onClick={logoutHandler}
                                  >
                                    {link.label}
                                  </a>
                                )}
                              </Menu.Item>
                              </div>
                              :
                              <div className="px-1 py-1 ">
                              <Menu.Item key={link.href} as={Fragment}>
                                {({ active }) => (
                                  <a
                                    href={link.href}
                                    className={`${
                                      active ? 'bg-amber-400 text-white' : 'text-gray-900'
                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                  >
                                    {link.label}
                                  </a>
                                )}
                              </Menu.Item>
                              </div>
                          ))}
                        </Menu.Items>
                    </Transition>
                  </Menu>
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
