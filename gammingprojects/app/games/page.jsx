"use client";

import { useState, useEffect } from 'react';
import { fetchGames } from '../actions/gameActions';
import Link from 'next/link';

export default function GamesPage() {
  const [games, setGames] = useState([]);
  const [filters, setFilters] = useState({ sName: '', sDates: '1900-01-01 / 9999-12-31', sOrdering: '', sPage: 1 });

  const updateFilters = (event) => setFilters((prev) => ({ ...prev, [event.target.name]: event.target.value }));

  useEffect(() => { fetchGames(filters).then(setGames); }, [filters]);

  return (
    <div className="bg-gradient-to-b from-lightOpacityL to-lightOpacityS min-h-screen py-9 px-4">
      <div className="mb-6 p-5 bg-grayDarkOpacityS rounded-2xl shadow-md">
  <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-center">

    <input
      type="text"
      name="sName"
      placeholder="Search by name"
      value={filters.sName}
      onChange={updateFilters}
      className="h-10 px-3 rounded-lg border border-grayLight bg-grayDarkOpacityS text-sm text-white placeholder-grayLight focus:outline-none focus:ring-1 focus:ring-grayLight"
    />

    <input
      type="text"
      name="sDates"
      placeholder="Filter by dates"
      value={filters.sDates}
      onChange={updateFilters}
      className="h-10 px-3 rounded-lg border border-grayLight bg-grayDarkOpacityS text-sm text-white placeholder-grayLight focus:outline-none focus:ring-1 focus:ring-grayLight"
    />

    <select
      name="sOrdering"
      value={filters.sOrdering}
      onChange={updateFilters}
      className="h-10 px-3 rounded-lg border border-grayLight bg-grayDarkOpacityS text-sm text-white focus:outline-none focus:ring-1 focus:ring-grayLight"
    >
      <option value="">Order by</option>
      <option value="released">Release Date</option>
      <option value="name">Name</option>
    </select>

    <button
      onClick={() =>
        setFilters({
          sName: '',
          sDates: '1900-01-01 / 9999-12-31',
          sOrdering: '',
          sPage: 1,
        })
      }
      className="h-10 px-4 rounded-lg bg-grayDarkOpacityL text-white text-sm font-medium transition hover:bg-grayDark"
    >
      Clear Filters
    </button>

  </div>
</div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mx-2">
        {games.map((game) => (
          <div key={game.id} className="bg-grayDarkOpacityS rounded-3xl overflow-hidden shadow-lg">
            <div className="relative">
              <div className="w-full h-80 bg-cover bg-center rounded-t-3xl" style={{ backgroundImage: `url(${game.background_image})` }}></div>
              <div className="p-6 space-y-4">
                <h2 className="text-3xl font-bold text-white text-center truncate pb-5">{game.name}</h2>
                <Link href={`/games/${game.id}`}>
                  <button className="bg-grayMedium hover:bg-grayDark p-2 rounded text-white font-bold w-full">See Details</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
