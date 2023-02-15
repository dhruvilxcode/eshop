import React from 'react'

// TODO: currently in next/canary as of 14/feb/2023
export const metadata = {
  title: 'My Page Title',
  description: '',
  openGraph: {
    title: 'Next.js',
    description: 'The React Framework for the Web',
    url: 'https://nextjs.org',
    siteName: 'Next.js',
    images: [
      {
        url: 'https://nextjs.org/og.png',
        width: 800,
        height: 600,
      },
      {
        url: 'https://nextjs.org/og-alt.png',
        width: 1800,
        height: 1600,
        alt: 'My custom alt',
      },
    ],
    locale: 'en-US',
    type: 'website',
  },
};


export default function ProductPage({ params, searchParams }) {
    const productId = params.productId;
  return (
    <div>ProductPage {productId}</div>
  )
}
