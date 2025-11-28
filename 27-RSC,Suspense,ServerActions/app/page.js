import RSCDemo from "@/components/RSCDemo";
import ClientDemo from "@/components/ClientDemo";
import DataFetchingDemo from "@/components/DataFetchingDemo";
import ServerActionsDemo from "@/components/ServerActionsDemo";
import UsePromisesDemo from "@/components/UsePromisesDemo";
import {Suspense} from "react";
import fs from "node:fs/promises";

export default async function Home() {

    const fetchUsersPromise = new Promise((resolve) =>
        setTimeout(async () => {
            const data = await fs.readFile("dummy-db.json", 'utf-8');
            const users = JSON.parse(data);
            resolve(users);
        }, 2000));

    return (
        <main>
            {/*<ClientDemo>*/}
            {/*    <RSCDemo/>*/}
            {/*</ClientDemo>*/}
            {/*<DataFetchingDemo/>*/}
            {/*<ServerActionsDemo/>*/}
            <Suspense fallback={<p>Loading...</p>}>
                <UsePromisesDemo usersPromise={fetchUsersPromise}/>
            </Suspense>
        </main>
    );
}
