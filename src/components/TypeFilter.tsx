interface TypeFilterProps {
  selectedType: string;
  onTypeChange: (type: string) => void;
}

const pokemonTypes = [
  'all',
  'normal',
  'fire',
  'water',
  'grass',
  'electric',
  'ice',
  'fighting',
  'poison',
  'ground',
  'flying',
  'psychic',
  'bug',
  'rock',
  'ghost',
  'dark',
  'dragon',
  'steel',
  'fairy',
];

export default function TypeFilter({ selectedType, onTypeChange }: TypeFilterProps) {
  return (
    <select
      value={selectedType}
      onChange={(e) => onTypeChange(e.target.value)}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent capitalize"
    >
      {pokemonTypes.map((type) => (
        <option key={type} value={type}>
          {type}
        </option>
      ))}
    </select>
  );
} 