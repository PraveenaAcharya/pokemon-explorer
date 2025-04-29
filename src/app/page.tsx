'use client';

import { useEffect, useState } from 'react';
import { Pokemon, PokemonListResponse } from '@/types/pokemon';
import PokemonCard from '@/components/PokemonCard';
import SearchBar from '@/components/SearchBar';
import TypeFilter from '@/components/TypeFilter';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function Home() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch initial list of Pokemon
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
        const data: PokemonListResponse = await response.json();
        
        // Fetch detailed information for each Pokemon
        const pokemonDetails = await Promise.all(
          data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            return res.json();
          })
        );
        
        setPokemon(pokemonDetails);
      } catch (err) {
        setError('Failed to fetch Pokemon. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  const filteredPokemon = pokemon.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || p.types.some(t => t.type.name === selectedType);
    return matchesSearch && matchesType;
  });

  return (
    <main className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Pokémon Explorer</h1>
          <div className="max-w-xl mx-auto space-y-4">
            <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
            <TypeFilter selectedType={selectedType} onTypeChange={setSelectedType} />
          </div>
        </header>

        {error && (
          <div className="text-center text-red-600 mb-8">
            <p>{error}</p>
          </div>
        )}

        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredPokemon.length > 0 ? (
              filteredPokemon.map((p) => (
                <PokemonCard key={p.id} pokemon={p} />
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500">
                No Pokémon found matching your criteria.
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
