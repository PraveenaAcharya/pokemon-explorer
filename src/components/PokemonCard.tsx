import { Pokemon } from '@/types/pokemon';
import Image from 'next/image';

interface PokemonCardProps {
  pokemon: Pokemon;
}

const typeColors: { [key: string]: string } = {
  normal: 'bg-gray-400',
  fire: 'bg-red-500',
  water: 'bg-blue-500',
  grass: 'bg-green-500',
  electric: 'bg-yellow-400',
  ice: 'bg-blue-200',
  fighting: 'bg-red-700',
  poison: 'bg-purple-500',
  ground: 'bg-yellow-600',
  flying: 'bg-indigo-400',
  psychic: 'bg-pink-500',
  bug: 'bg-lime-500',
  rock: 'bg-yellow-800',
  ghost: 'bg-purple-700',
  dark: 'bg-gray-800',
  dragon: 'bg-indigo-700',
  steel: 'bg-gray-500',
  fairy: 'bg-pink-300',
};

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow">
      <div className="relative w-full h-48 bg-gray-100 rounded-lg mb-4">
        <Image
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          fill
          className="object-contain p-4"
        />
      </div>
      <div className="text-center">
        <p className="text-gray-500 text-sm mb-1">#{pokemon.id.toString().padStart(3, '0')}</p>
        <h2 className="text-xl font-bold capitalize mb-2">{pokemon.name}</h2>
        <div className="flex gap-2 justify-center">
          {pokemon.types.map((type) => (
            <span
              key={type.type.name}
              className={`${
                typeColors[type.type.name] || 'bg-gray-500'
              } text-white px-3 py-1 rounded-full text-sm capitalize`}
            >
              {type.type.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
} 