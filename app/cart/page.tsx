import React from 'react'
import CartPageContent from './CartPageContent'
import { Suspense } from 'react'

export default function CartPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CartPageContent />
    </Suspense>
  )
}
