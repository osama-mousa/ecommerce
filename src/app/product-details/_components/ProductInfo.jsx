'use client'
import React, { useContext } from 'react'
import { LuShoppingCart, LuBadgeCheck, LuAlertOctagon } from "react-icons/lu";
import SkeletonProductInfo from './SkeletonProductInfo';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import CartApis from '@/utils/CartApis';
import { CartContext } from '@/context/CartContext';


const ProductInfo = ({ product }) => {
  const { user } = useUser();
  const router = useRouter();
  const { cart, setCart } = useContext(CartContext);

  const handleAddToCart = () => {
    if (!user) {
      router.push('/sign-in')
    } else {
      // Logic to add to cart
      const data = {
        data: {
          userName: user.fullName,
          email: user.primaryEmailAddress.emailAddress,
          products: [product?.id]
        }
      }
      CartApis.addTocart(data).then(res => {
        console.log('cart created successfully', res?.data?.data)
        setCart(oldCart => [
          ...oldCart,
          {
            id: res?.data?.data?.id,
            product
          }
        ])
      }).catch(error => {
        console.log('error', error)
      })
    }
  }

  return (
    <div>
      {product?.id ?
        <div>
          <h2 className='text-[20px]'>{product?.attributes?.title}</h2>
          <h2 className='text-[15px] text-gray-400'>{product?.attributes?.category}</h2>
          <h2 className='text-[11px] mt-2'>{product?.attributes?.description[0]?.children[0]?.text}</h2>
          <h2 className='text-[11px] text-gray-500 flex gap-2 mt-2 items-center'>
            {product?.attributes?.instantDelivery ?
              <LuBadgeCheck className='w-5 h-5 text-green-500' /> :
              <LuAlertOctagon className='w-5 h-5 text-yellow-500' />}
            Eligible For Istant Delivery
          </h2>
          <h2 className='text-[32px] text-primary mt-3'>${product?.attributes?.price}</h2>

          <button onClick={() => handleAddToCart()} className='items-center flex gap-2 bg-secondary hover:bg-primary text-white rounded-lg p-3'>
            <LuShoppingCart />
            Add To Cart
          </button>
        </div>
        :
        <SkeletonProductInfo />

      }
    </div>
  )
}

export default ProductInfo