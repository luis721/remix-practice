import type { Joke } from "@prisma/client";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { db } from "~/utils/db.server";

type LoaderData = { joke: Joke };

export const loader: LoaderFunction = async ({ params }) => {
    const joke = await db.joke.findUnique({
        where: {
            id: params.jokeId,
        },
    });
    if (!joke) {
        throw new Error("Joke not found.");
    }
    const data: LoaderData = { joke };
    return json(data);
};

export default function JokeId() {
    const { joke } = useLoaderData<LoaderData>();
    return (
        <div>
            <h3>{joke.name}</h3>
            <p>{joke.content}</p>
        </div>
    );
}
