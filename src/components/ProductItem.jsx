import React from 'react'
import Image from 'next/image'
import { BiCategory } from "react-icons/bi";
import Link from 'next/link';


const ProductItem = ({ product }) => {
    return (
        <Link href={`/product-details/${product?.id}`} className='p-1 border-secondary rounded-lg hover:border hover:shadow-md hover:cursor-pointer'>
            <Image
                src={product?.attributes?.banner?.data?.attributes?.url}
                alt='banner-card'
                width={400}
                height={350}
                className='rounded-t-lg h-[120px] lg:h-[170px] md:h-[150] opject-cover'
            />
            <div className='flex justify-between p-3 items-center bg-gray-100 rounded-b-lg'>
                <div className=''>
                    <h2 className='text-[12px] font-medium line-clamp-1'>
                        {product?.attributes?.title}
                    </h2>
                    <h2 className='text-[10px] text-gray-400 flex gap-1 items-center'>
                        <BiCategory className='w-4 h-4' />
                        {product?.attributes?.category}
                    </h2>
                </div>
                <h2>{product?.attributes?.price}</h2>
            </div>
        </Link>
    )
}

export default ProductItem