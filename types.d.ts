import { Session } from 'next-auth';

declare module 'next-auth' {
    interface Session {
        user: {
            "id": string,
            "domain": string,
            "chainId": number,
            "address": string,
            "uri": string,
            "version": string,
            "nonce": string,
            "profileId": string,
            "payload": string | null,
        };
    }
}
