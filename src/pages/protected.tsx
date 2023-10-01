import { getSession } from "next-auth/react";
import React from "react";
import Moralis from 'moralis';
import { EvmChain } from '@moralisweb3/common-evm-utils';
import { GetServerSidePropsContext, NextPage } from "next";

type ProtectedProps = {
    message: string;
    nftList: any[];
};

const Protected: NextPage<ProtectedProps> = ({ message, nftList }) => {
    return (
        <div>
            <h3>Protected content</h3>
            <div>{message}</div>
            <div>{JSON.stringify(nftList, null, 2)}</div>
        </div>
    );
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const session = await getSession(context);

    if (!session) {
        return {
            redirect: {
                destination: '/signin',
                permanent: false,
            },
        };
    }

    if (!Moralis.Core.isStarted) {
        await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });
    }

    const user = session.user as { address: string;[key: string]: any };

    const address = user.address
    const nftList = await Moralis.EvmApi.nft.getWalletNFTs({
        chain: EvmChain.SEPOLIA,
        address: address,
        // replace "0x..." with your NFT token address
        tokenAddresses: ["0x7c3C3B4aBDb9e7a70fdEc91b35822ea7879AA203",],
    });
    console.log("**************")
    console.log(nftList.raw.result)
    console.log(nftList.raw.result.length)
    console.log("**************")

    return {
        props: {
            message:
                // if user has at least one NFT he will get protected content
                nftList.raw.result.length > 0 ? 'Nice! You have our NFT' : "Sorry, you don't have our NFT",
            nftList: nftList.raw.result,
        },
    };
}

export default Protected;
