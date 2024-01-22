/* eslint-disable @next/next/no-img-element */
import { CartContext } from '@/context/CartContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useContext, useRef, useState } from 'react';
import EmptyCart from './EmptyCart';

const Cart = () => {
  const cartRef = useRef(null);
  const { cart, setCart } = useContext(CartContext);
  const [openCart, setOpenCart] = useState(true);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setOpenCart(!openCart);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [cartRef, openCart, setCart]);

  return (
    <>
      {openCart && (
        <div ref={cartRef} className='md:h-[350px] md:w-[270px] h-[280px] w-[220px] bg-gray-200 z-10 rounded-md border shadow-xl absolute mx-10 right-10 top-12 p-5 overflow-auto'>
          {cart.length === 0 ? (
            <EmptyCart size={16} />
          ) : (
            <div className="mt-4 space-y-6">
              <ul className="space-y-4">
                {cart.map((item) => (
                  <li key={item.id} className="flex items-center gap-4">
                    <img
                      src={item.product?.attributes?.banner?.data?.attributes?.url}
                      alt={item.product?.attributes?.title}
                      className="h-16 w-16 rounded object-cover"
                      loading="lazy"
                    />

                    <div>
                      <h3 className="text-sm text-gray-900 line-clamp-1">{item.product?.attributes?.title}</h3>

                      <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                        <div>
                          <dt className="inline">Category:</dt>
                          <dd className="inline">{item.product?.attributes?.category}</dd>
                        </div>

                        <div>
                          <dt className="inline">Price:</dt>
                          <dd className="inline">{item.product?.attributes?.price}</dd>
                        </div>
                      </dl>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="space-y-4 text-center mt-5">
            <Link
              href="/cart"
              className="block rounded border border-gray-600 px-5 py-3 text-sm text-gray-100 hover:text-white bg-secondary hover:bg-primary transition hover:ring-1 hover:ring-gray-400"
            >
              View my cart ({cart.length})
            </Link>

            <a
              onClick={() => setOpenCart(!openCart)}
              href="#"
              className="inline-block text-sm text-gray-700 underline underline-offset-4 transition hover:text-gray-600"
            >
              Continue shopping
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;