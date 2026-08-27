
import Search from "../search";

export default function RequestFilters({
  search,
  setSearch,
  district,
  setDistrict,
  tag,
  setTag,
  status,
  setStatus,
  priority,
  setPriority,
}) {
  return (
    <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

      {/* Pesquisa */}
      <div className="mb-4">
        <Search
          value={search}
          onChange={setSearch}
        />
      </div>

      {/* Filtros */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">

        {/* Bairro */}
        <select
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-blue focus:ring-2 focus:ring-blue/10"
        >
          <option value="">Todos os bairros</option>
          <option value="Centro">Centro</option>
          <option value="São Sebastião">São Sebastião</option>
          <option value="Santo Amaro">Santo Amaro</option>
          <option value="Cruzeiro">Cruzeiro</option>
        </select>

        {/* Categoria */}
        <select
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-blue focus:ring-2 focus:ring-blue/10"
        >
          <option value="">Todas as categorias</option>
          <option value="Iluminação">Iluminação</option>
          <option value="Infraestrutura">Infraestrutura</option>
          <option value="Saúde">Saúde</option>
          <option value="Urbanismo">Urbanismo</option>
          <option value="Mobilidade">Mobilidade</option>
          <option value="Saneamento">Saneamento</option>
        </select>

        {/* Status */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-blue focus:ring-2 focus:ring-blue/10"
        >
          <option value="">Todos os status</option>
          <option value="Recebido">Recebido</option>
          <option value="Em análise">Em análise</option>
          <option value="Encaminhado">Encaminhado</option>
          <option value="Em andamento">Em andamento</option>
          <option value="Concluído">Concluído</option>
          <option value="Cancelado">Cancelado</option>
        </select>

        {/* Prioridade */}
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-blue focus:ring-2 focus:ring-blue/10"
        >
          <option value="">Todas as prioridades</option>
          <option value="Baixa">Baixa</option>
          <option value="Média">Média</option>
          <option value="Alta">Alta</option>
        </select>

      </div>
    </div>
  );
}
