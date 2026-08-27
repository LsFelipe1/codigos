import { Link } from "react-router-dom";

export default function FeaturedNewsCard({ featured }) {
  if (!featured) return null;

  return (
    <Link
      to={`/noticias/${featured.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border-[3px] border-[#16211C] bg-white shadow-[4px_4px_0px_0px_rgba(22,33,28,1)] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_rgba(22,33,28,1)]"
    >
      <div className="relative h-64 sm:h-80 w-full overflow-hidden border-b-[3px] border-[#16211C] bg-[#E8EFFA]">
        {featured.image ? (
          <img
            src={featured.image}
            alt={featured.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center font-black text-2xl text-[#1B4FA0]">
            Rinaldo Luiz • Notícias
          </div>
        )}
      </div>

      <div className="flex flex-col p-6 sm:p-8">
        <div className="flex items-center justify-between">
          <span className="rounded-full border-2 border-[#16211C] bg-[#FFC531] px-3 py-1 font-mono text-[11px] font-black uppercase text-[#16211C]">
            {featured.tag}
          </span>

          <span className="font-mono text-xs font-bold text-[#4E5C55]">
            {featured.date}
          </span>
        </div>

        <h2 className="mt-4 text-2xl font-black leading-tight text-[#16211C] sm:text-3xl">
          {featured.title}
        </h2>

        <p className="mt-3 text-sm leading-relaxed text-[#4E5C55] line-clamp-3">
          {featured.description}
        </p>

        <div className="mt-6 flex items-center gap-2 text-xs font-black uppercase text-[#1B4FA0]">
          <span>Ler notícia completa</span>
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </div>
      </div>
    </Link>
  );
}