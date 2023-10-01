import { GetServerSidePropsContext, NextPage } from "next";
import { getSession, signOut } from "next-auth/react";
import React from "react";
import Moralis from 'moralis';
import { EvmChain } from "moralis/common-evm-utils";
import { Session } from "next-auth";

type UserProps = {
    message: string;
    nftList: any[];
};

// gets a prop from getServerSideProps
const User: NextPage<UserProps> = ({ message, nftList }) => {
    return (
        <div>
            <div>{message}</div>
            <div>{JSON.stringify(nftList, null, 2)}</div>
        </div>
    );

}


export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const session: Session | null = await getSession(context);

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

    const user = session.user;

    const address = user.address
    const nftList = await Moralis.EvmApi.nft.getWalletNFTs({
        chain: EvmChain.SEPOLIA,
        address: address,
        // replace "0x..." with your NFT token address
        tokenAddresses: ["0x7c3C3B4aBDb9e7a70fdEc91b35822ea7879AA203",],
    });

    if (nftList.raw.result.length === 0) {
        return {
            redirect: {
                destination: '/signin?failed=true',
                permanent: false,
            },
        };
    }

    return {
        props: {
            message:
                // if user has at least one NFT he will get protected content
                nftList.raw.result.length > 0 ? 'Nice! You have our NFT' : "Sorry, you don't have our NFT",
            nftList: nftList.raw.result,
        },
    };
}

export default User;
