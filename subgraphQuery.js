import { gql } from "@apollo/client";

const GET_MINTED_NFTS = gql`
    {
        itemMinteds(first: 20, orderBy: tokenId, orderDirection: desc) {
            id
            minterAddress
            tokenId
        }
    }
`;

export default GET_MINTED_NFTS;
