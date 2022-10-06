import styles from "../styles/Home.module.css";
import { useQuery } from "@apollo/client";
import GET_MINTED_NFTS from "../subgraphQuery";
import NftBox from "../components/NftBox";
import LoadMoreButton from "../components/LoadMoreButton";
import { useRef } from "react";
import { MIN_TOKEN_ID, MAX_TOKEN_ID } from "../constants";
import { Loading } from "@web3uikit/core";

export default function Home() {
    let lastTokenIdFetched = useRef(MAX_TOKEN_ID + 1);
    let nfts = useRef([]);
    let fetchingMore = false;

    const { loading, error, data, fetchMore } = useQuery(GET_MINTED_NFTS, {
        variables: {
            lastTokenId: lastTokenIdFetched.current,
        },
    });

    const fetchMoreData = (callback) => {
        fetchingMore = true;
        fetchMore({
            variables: {
                lastTokenId: lastTokenIdFetched.current,
            },
            updateQuery: (prev, { fetchMoreResult }) => {
                callback();
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
        fetchingMore = false;
        lastTokenIdFetched.current = data.itemMinteds.slice(-1)[0].tokenId;
        nfts.current.push(...data.itemMinteds);
    }

    return (
        <div className="mx-10 grid grid-cols-4 gap-4 place-items-center">
            {nfts.current.length == 0 ? (
                <div className="col-span-4">
                    <Loading size={40} spinnerColor="#2E7DAF" />
                </div>
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
            <div className="col-span-4 pb-10">
                <div
                    className={
                        loading && lastTokenIdFetched.current < MAX_TOKEN_ID
                            ? "visible"
                            : "invisible"
                    }
                >
                    <Loading size={40} spinnerColor="#2E7DAF" />
                </div>
                <LoadMoreButton
                    loading={loading || fetchingMore}
                    fetchedAllData={lastTokenIdFetched.current == MIN_TOKEN_ID}
                    action={fetchMoreData}
                />
            </div>
        </div>
    );
}
