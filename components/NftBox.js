import { Card } from "@web3uikit/core";
import Image from "next/image";
import { useEffect, useState } from "react";
import { lookupAddress } from "../utils/ens";
import {
    NFT_IMAGE_URL,
    NFT_COLLECTION_URL,
    ENS_CACHE_DURATION,
    LOCAL_STORAGE_LOOKUP_DATE,
} from "../constants";

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

    useEffect(() => {
        const lastAddrLookupDate = parseInt(
            window.localStorage.getItem(LOCAL_STORAGE_LOOKUP_DATE)
        );
        const ensName = window.localStorage.getItem(minterAddress);

        if (ensName != null && Date.now() - lastAddrLookupDate < ENS_CACHE_DURATION) {
            setMinter(ensName.length > 0 ? ensName : formatAddress(minterAddress));
        } else {
            lookupAddress(minterAddress)
                .then((ensName) => {
                    window.localStorage.setItem(LOCAL_STORAGE_LOOKUP_DATE, Date.now().toString());

                    if (ensName) {
                        window.localStorage.setItem(minterAddress, ensName);
                        setMinter(ensName);
                    } else {
                        window.localStorage.setItem(minterAddress, "");
                        setMinter(formatAddress(minterAddress));
                    }
                })
                .catch((error) => {
                    setMinter(formatAddress(minterAddress));
                    console.error(error);
                });
        }
    }, []);

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
