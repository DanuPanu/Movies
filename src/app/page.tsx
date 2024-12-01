import Link from "next/link";

export default function Home() {
  return (
    <>
    <main className="bg-slate-800 pb-3 h-screen">
      <h1 className="text-3xl font-bold my-4 text-center text-white">Tervetuloa selaamaan elokuvia!</h1>
      <p className="text-xl text-center text-white">Selaa tämän hetken kuumimpia elokuvia tai omia suosikkejasi</p>
      <div className="flex justify-center gap-5 mt-5">
        <Link href={"/movies"} className="bg-slate-600 text-white p-2 rounded text-2xl shadow-lg">Now playing</Link>
        <Link href={"/favourites"} className="bg-slate-600 text-white p-2 rounded text-2xl shadow-lg">Favourites</Link>
      </div>
      <p className="text-center mt-5 px-5 text-white">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis enim mollitia tempora necessitatibus, officia quidem repellendus soluta, amet aliquam ab aliquid unde impedit atque! Quis doloremque corporis sequi quod a ab beatae, error dolorem at tempora placeat quam dolores autem cumque est natus iusto labore ipsam quibusdam suscipit! Natus, nemo?</p>
    </main>
    </>
  );
}
