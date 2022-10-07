## Next.js QQL Minters

This project shows the Ethereum address or ENS name of the people who minted [QQL](https://archipelago.art/collections/qql), a generative NFT collection by [Tyler Hobbs](https://twitter.com/tylerxhobbs) and [Dandelion Wist Mané](https://twitter.com/dandelion_wist).

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

<img width="1295" alt="screenshot" src="https://user-images.githubusercontent.com/34001240/194543322-287d4273-f6b5-47bc-bf4e-5270bca93790.png">


## Requirements

To monitor the minting events, you need the URL of a Subgraph indexer that can fulfill the query defined in `subgraphQuery.js`.
A development Subgraph URL is provided when running this project: [https://github.com/tluce/graph-qql-minters](https://github.com/tluce/graph-qql-minters).

Set your Subgraph URL and an Ethereum RPC node in a `.env.local` file.
```sh
NEXT_PUBLIC_SUBGRAPH_URL=<Subgraph URL>
NEXT_PUBLIC_MAINNET_RPC_URL=https://ethereum-mainnet-rpc.allthatnode.com
```

## Getting Started

First, run the development server:

```sh
npm run dev
```
or
```sh
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
