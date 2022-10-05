import styles from "../styles/Home.module.css";
import { useQuery } from "@apollo/client";
import GET_MINTED_NFTS from "../subgraphQuery";
import NftBox from "../components/NftBox";
import { useRef } from "react";
import { MAX_TOKENS } from "../constants";

export default function Home() {
    let lastTokenIdFetched = useRef(MAX_TOKENS + 1);
    let nfts = useRef([]);

    const { loading, error, data, fetchMore } = useQuery(GET_MINTED_NFTS, {
        variables: {
            lastTokenId: lastTokenIdFetched.current,
        },
    });

    const fetchMoreData = () => {
        fetchMore({
            variables: {
                lastTokenId: lastTokenIdFetched.current,
            },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) {
                    return prev;
                } else {
                    return {
                        itemMinteds: fetchMoreResult.itemMinteds,
                    };
                }
            },
        });
    };

    if (error) {
        return <div className={styles.container}> {`Error: ${error.message}`}</div>;
    }
    if (data) {
        lastTokenIdFetched.current = data.itemMinteds.slice(-1)[0].tokenId;
        nfts.current.push(...data.itemMinteds);
    }

    return (
        <div className="mx-10 grid grid-cols-4 gap-4 justify-items-start">
            {nfts.current.length == 0 ? (
                <div>Loading...</div>
            ) : (
                nfts.current.map((nft) => {
                    const { minterAddress, tokenId } = nft;
                    return (
                        <div key={`${minterAddress}-${tokenId}`}>
                            <NftBox minterAddress={minterAddress} tokenId={tokenId} />
                        </div>
                    );
                })
            )}
            <button onClick={fetchMoreData}>Load More</button>
        </div>
    );
}
