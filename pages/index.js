import styles from "../styles/Home.module.css";
import { useQuery } from "@apollo/client";
import GET_MINTED_NFTS from "../subgraphQuery";

export default function Home() {
    const { loading, error, data } = useQuery(GET_MINTED_NFTS);
    if (error) {
        return <div className={styles.container}> {`Error: ${error.message}`}</div>;
    }

    return (
        <div className={styles.container}>
            {loading || !data ? (
                <div>Loading...</div>
            ) : (
                data.itemMinteds.map((nft) => {
                    const { minterAddress, tokenId } = nft;
                    return (
                        <div>
                            Minter: {minterAddress}. Token ID: {tokenId}
                        </div>
                    );
                })
            )}
        </div>
    );
}
