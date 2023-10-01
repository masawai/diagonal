import { useAuthRequestChallengeEvm } from "@moralisweb3/next";
import { GetServerSidePropsContext, NextPage } from "next";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { useAccount, useConnect, useDisconnect, useSignMessage } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";

type SignInProps = {
    failed: boolean;
};

const SignIn: NextPage<SignInProps> = ({ failed }) => {
    const { connectAsync } = useConnect();
    const { disconnectAsync } = useDisconnect();
    const { isConnected } = useAccount();
    const { signMessageAsync } = useSignMessage();
    const { requestChallengeAsync } = useAuthRequestChallengeEvm();
    const { push } = useRouter();


    const handleAuth = async () => {
        if (isConnected) {
            await disconnectAsync();
        }

        const { account, chain } = await connectAsync({
            connector: new MetaMaskConnector(),
        });

        const challengeResult = await requestChallengeAsync({
            address: account,
            chainId: chain.id,
        });
        if (!challengeResult) {
            throw new Error("Failed to get challenge from Moralis");
        }
        const { message } = challengeResult;


        const signature = await signMessageAsync({ message });

        // redirect user after success authentication to '/user' page
        const signInResult = await signIn("moralis-auth", {
            message,
            signature,
            redirect: false,
            callbackUrl: "/user",
        });
        if (!signInResult) {
            throw new Error("Failed to sign in");
        }
        const { url } = signInResult

        if (!url) {
            throw new Error("URL is null");
        }
        /**
         * instead of using signIn(..., redirect: "/user")
         * we get the url from callback and push it to the router to avoid page refreshing
         */
        push(url);
    };

    return (
        <div>
            <div style={{ color: 'red' }}>
                {failed ? "you don't have our NFT" : ""}
            </div>
            <h3>Web3 Authentication</h3>
            <button onClick={handleAuth} className="px-2 py-1 text-blue-500 border border-blue-500 font-semibold rounded hover:bg-blue-100">Authenticate via Metamask</button>
        </div>
    );
}

export default SignIn;

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const { query } = context;
    const failed = query.failed === 'true';
    return {
        props: {
            failed,
        },
    };
}
