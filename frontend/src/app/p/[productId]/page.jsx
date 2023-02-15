import React from 'react'
import Head from "next/head"

// // TODO: currently in next/canary as of 14/feb/2023
// export const metadata = {
//   title: 'My Page Title',
//   description: '',
//   openGraph: {
//     title: 'Next.js',
//     description: 'The React Framework for the Web',
//     url: 'https://nextjs.org',
//     siteName: 'Next.js',
//     images: [
//       {
//         url: 'https://nextjs.org/og.png',
//         width: 800,
//         height: 600,
//       },
//       {
//         url: 'https://nextjs.org/og-alt.png',
//         width: 1800,
//         height: 1600,
//         alt: 'My custom alt',
//       },
//     ],
//     locale: 'en-US',
//     type: 'website',
//   },
// };


export default function ProductPage({ params, searchParams }) {
    const productId = params.productId;
  return (
    <div>
      <Head>
        <title></title>
        
        <meta name="description" content="" />
        <meta property='og:title' content='' />
        <meta property='og:description' content='' />
        <meta property='og:image' content='' />
        <meta property='og:url' content='' />
        <meta property='og:type' content='website' />
      </Head>

      ProductPage {productId}
    </div>
  )
}
