import Image from 'next/image'
import React from 'react'
import { Product } from '../lib/products'

export default function ProductGallery({ product }: { product: Product }) {
  return (
        <div>
          <div
            className="
            relative
            h-[500px]
            overflow-hidden
            rounded-xl
            bg-card
          "
          >
            <Image
              src={product.images[0]}
              alt={product.title}
              fill
              className="
                object-cover
              "
            />
          </div>

          <div
            className="
            mt-5
            grid
            grid-cols-5
            gap-3
          "
          >
            {product.images.map((image, index) => (
              <div
                key={index}
                className="
                  relative
                  h-20
                  overflow-hidden
                  rounded-lg
                  border
                "
              >
                <Image
                  src={image}
                  alt={product.title}
                  fill
                  className="
                    object-cover
                  "
                />
              </div>
            ))}
          </div>
        </div>
  )
}
