/* eslint-disable @next/next/no-img-element */
import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import data from '../utils/data';
import Link from 'next/link'
import { Store } from '../utils/Store';

export default function ProductItem({product}) {
    // const { state, dispatch } = useContext(Store);
    // const { query } = useRouter();
    // const router = useRouter();
    // const { slug } = query
    // let product = data.products.find(x => x.slug === slug)
    // if(!product){
    //     return <div>Product Not Found</div>
    // }

    // const addToCart = () => {
    //     const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
    //     const quantity = existItem ? existItem.quantity + 1 : 1;

    //     if(product.countInStock < quantity) {
    //         alert('Sorrt, this product is out of stock');
    //         return;
    //     }

    //     dispatch({ type: 'CART_ADD_ITEM' , payload: { ...product, quantity: quantity} });
    //     router.push('/cart')
    // };

  return (
    <div className='card'>
        <Link href={`/product/${product.slug}`}>
            <a>
                <img
                    src={product.image}
                    alt={product.name}
                    className='rounded shadow'
                />
            </a>
        </Link>

        <div className='flex flex-col items-center justify-center p-5'>
            <Link href={`/product/${product.slug}`}>
                <a>
                    <h2 className='text-lg'>{product.name}</h2>
                </a>
            </Link>
            <p className='mb-2'>{product.brand}</p>
            <p>${product.price}</p>
            <button className='primary-button' type='button' >
                Add to cart
            </button>
        </div>
    </div>
  )
}
