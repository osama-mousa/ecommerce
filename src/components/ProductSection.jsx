'use client'
import React, { useEffect, useState } from 'react'
import ProductList from './ProductList'
import ProductApis from '@/utils/ProductApis';

const ProductSection = () => {
  const [productList, setProductList]= useState([]);

  useEffect(()=>{
    getLatestProducts_();
  },[])
  const getLatestProducts_ =()=>{
    ProductApis.getLatestProducts().then(res=>{
      console.log(res.data.data)
      setProductList(res.data.data)
    })
  }

  return (
    <div className='px-10 md:px-20 py-5'>
        <h2 className='text-xl my-4'>Our Latest Products</h2>
        <ProductList productList={productList}/>
    </div>
  )
}

export default ProductSection