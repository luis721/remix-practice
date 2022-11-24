import type { Joke } from "@prisma/client";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Link } from "react-router-dom";
import { db } from "~/utils/db.server";

type LoaderData = { randomJoke: Joke };

export const loader: LoaderFunction = async () => {
    const count = await db.joke.count();
    const randomRowNumber = Math.floor(Math.random() * count);
    const [randomJoke] = await db.joke.findMany({
        take: 1,
        skip: randomRowNumber,
    });

    return json({ randomJoke });
};

export default function JokesIndex() {
    const { randomJoke } = useLoaderData<LoaderData>();

    return (
        <div>
            <p>Here's a random joke:</p>
            <p>{randomJoke.content}</p>
            <Link to={randomJoke.id}>"{randomJoke.name}" Permalink</Link>
        </div>
    );
}
