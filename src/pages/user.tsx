import { GetServerSidePropsContext } from "next";
import { getSession, signOut } from "next-auth/react";
import React from "react";

type UserProps = {
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
};

// gets a prop from getServerSideProps
const User: React.FC<UserProps> = ({ user }) => {
    return (
        <div>
            <h4>User session:</h4>
            <pre>{JSON.stringify(user, null, 2)}</pre>
            <pre>{JSON.stringify(user)}</pre>
            <button onClick={() => signOut({ redirect: false, callbackUrl: "/signin" })}>Sign out</button>
        </div>
    );
}


export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getSession(context);

    // redirect if not authenticated
    if (!session) {
        return {
            redirect: {
                destination: "/signin",
                permanent: false,
            },
        };
    }

    return {
        props: { user: session.user },
    };
}

export default User;
