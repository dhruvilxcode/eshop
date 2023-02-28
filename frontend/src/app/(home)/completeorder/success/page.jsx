"use client";
import { emptyCart } from '@/controllers/cart.controller';
import React, { useEffect } from 'react'

export default function CompleteOrderSuccessPage({searchParams}) {

    useEffect(()=>{
        _clearCart();
    },[]);

    const _clearCart = () => {
        emptyCart();
    };

  return (
    <div className='p-8 flex items-center w-full justify-center flex-col gap-4'>
        <p>Congrats, you purchase completed.</p>
        <h3 className='text-3xl text-center'>
          Payment ID:<br/>
          <span>{searchParams.payment_intent}</span>
        </h3>
    </div>
  )
}
