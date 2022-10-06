import "../styles/globals.css";
import Header from "../components/Header";
import Head from "next/head";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const apolloClient = new ApolloClient({
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    mintedItems: {
                        merge(existing = [], incoming) {
                            return [...existing, ...incoming];
                        },
                    },
                },
            },
        },
    }),
    uri: process.env.NEXT_PUBLIC_SUBGRAPH_URL,
});

function MyApp({ Component, pageProps }) {
    return (
        <div>
            <Head>
                <title>QQL Minters</title>
                <meta name="description" content="QQL Minters" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <ApolloProvider client={apolloClient}>
                <Header />
                <Component {...pageProps} />
            </ApolloProvider>
        </div>
    );
}

export default MyApp;
