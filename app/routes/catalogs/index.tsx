import { json } from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader = async (args: LoaderArgs) => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => response.json())

    return json({
        catalogs: response,
    });
}

export default function CatalogsIndexRoute() {
    const {catalogs} = useLoaderData();
    console.log("data: ", catalogs);

    if (!catalogs) return <h1>Loading...</h1>

    return (
        <section>
            <h1>Catalogs</h1>
            <br />
            <div>
                {(catalogs ?? []).map((item: any) => (
                    <div key={item.id}>{item.title}</div>
                ))}
            </div>
        </section>
    );
}