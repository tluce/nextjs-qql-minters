import { Card } from "@web3uikit/core";
import Image from "next/image";
import { useState } from "react";
import { lookupAddress } from "../utils/ens";
import { NFT_IMAGE_URL, NFT_COLLECTION_URL } from "../constants";

const getImageUrl = (tokenId) => {
    const tokenStringLength = 6;
    let tokenString = tokenId.toString().padStart(tokenStringLength, "0");

    return `${NFT_IMAGE_URL}${tokenString}`;
};

const formatAddress = (address) => {
    const begining = address.substring(0, 6);
    const end = address.substring(address.length - 4);
    return `${begining}...${end}`;
};

const openLink = (tokenId) => {
    window.open(`${NFT_COLLECTION_URL}${tokenId}`, "_blank");
};

export default function NftBox({ minterAddress, tokenId }) {
    const [minter, setMinter] = useState("...");

    lookupAddress(minterAddress)
        .then((ensName) => {
            if (ensName) {
                setMinter(ensName);
            } else {
                setMinter(formatAddress(minterAddress));
            }
        })
        .catch((error) => {
            setMinter(formatAddress(minterAddress));
            console.error(error);
        });

    return (
        <Card
            title={`#${tokenId}`}
            description={`Minter: ${minter}`}
            onClick={() => openLink(tokenId)}
        >
            <Image unoptimized={true} src={getImageUrl(tokenId)} width="240" height="300" />
        </Card>
    );
}
