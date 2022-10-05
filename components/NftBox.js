import { Card } from "@web3uikit/core";
import Image from "next/image";
import { useState } from "react";
import { lookupAddress } from "../utils/ens";

const getImageUrl = (tokenId) => {
    return `https://img.qql.art/canon/${tokenId}.png`;
};

const formatAddress = (address) => {
    const begining = address.substring(0, 6);
    const end = address.substring(address.length - 4);
    return `${begining}...${end}`;
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
        <Card title={`#${tokenId}`} description={`Minter: ${minter}`}>
            <Image unoptimized={true} src={getImageUrl(tokenId)} width="240" height="300" />
        </Card>
    );
}
