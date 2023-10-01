import { MoralisNextApi } from "@moralisweb3/next";

if (!process.env.MORALIS_API_KEY) {
    throw new Error('MORALIS_API_KEY is not defined');
}
if (!process.env.NEXTAUTH_URL) {
    throw new Error('NEXTAUTH_URL is not defined');
}

export default MoralisNextApi({
    apiKey: process.env.MORALIS_API_KEY,
    authentication: {
        domain: "amazing.dapp",
        uri: process.env.NEXTAUTH_URL,
        timeout: 120,
    },
});
