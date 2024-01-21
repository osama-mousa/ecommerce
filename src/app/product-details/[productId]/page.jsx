/* eslint-disable react-hooks/exhaustive-deps */
'use client' 
import BreadCrumb from '@/components/BreadCrumb';
import ProductApis from '@/utils/ProductApis'
import React, { useEffect, useState } from 'react'
import ProductBanner from '../_components/ProductBanner';
import ProductInfo from '../_components/ProductInfo';
import ProductList from '@/components/ProductList';
import { usePathname } from 'next/navigation';

const ProductDetails = ({ params }) => {
    const path =usePathname();
    const [productDetails , setProductDetails] = useState({});
    const [productList , setProductList] = useState([]);
    useEffect(() => {
        getProductById_()
    }, [params?.productId]);

    const getProductById_ = () => {
        ProductApis.getProductById(params.productId).then(res => {
            console.log('product item ', res.data.data);
            setProductDetails(res.data.data)
            getProductListByCategory(res.data.data)
        })
    }

    const getProductListByCategory = (product)=>{
        ProductApis.getProductsByCategory(product?.attributes?.category).then(res=>{
            console.log(res?.data?.data)
            setProductList(res?.data?.data)
        })
    }
    return (
        <div className='px-10 md:px-28 py-8'>
            <BreadCrumb path={path}/>
            <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 gap-5 justify-around'>
                <ProductBanner product={productDetails}/>
                <ProductInfo product={productDetails}/>
            </div>
            <div>
                <h2 className='mt-24 mb-4 text-xl'>Similar Products</h2>
                <ProductList productList={productList}/>
            </div>
        </div>
    )
}

export default ProductDetails