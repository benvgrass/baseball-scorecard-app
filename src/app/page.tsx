import Page from "@/app/game/page";
import Link from "next/link";

export default function Home() {
    return (
        <>
            <Link className="bg-blue-500 p-4 text-white text-lg rounded-xl" href="/game">New Game</Link>

        </>
    );
}
