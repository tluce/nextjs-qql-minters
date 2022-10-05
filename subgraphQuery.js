import { gql } from "@apollo/client";

const GET_MINTED_NFTS = gql`
    query mintedNfts($lastTokenId: BigInt) {
        itemMinteds(
            first: 12
            orderBy: tokenId
            orderDirection: desc
            where: { tokenId_lt: $lastTokenId }
        ) {
            id
            minterAddress
            tokenId
        }
    }
`;

export default GET_MINTED_NFTS;
