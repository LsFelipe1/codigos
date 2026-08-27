
export default function Search({ value, onChange }) {
  return (
    <div className="relative w-full">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Pesquisar pedidos..."
        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 pl-11 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue focus:ring-2 focus:ring-blue/10"
      />

      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.8}
        stroke="currentColor"
        className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m21 21-4.35-4.35m1.35-5.65a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
        />
      </svg>
    </div>
  );
}
