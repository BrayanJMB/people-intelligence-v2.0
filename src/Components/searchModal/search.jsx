import { IconSearch } from "@tabler/icons-react";
import { useState, useEffect } from "react";

const SearchModal = ({ open, onClose, dataSearch }) => {
  const [selectedTab, setSelectedTab] = useState("todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("todos");

  // Filtrar los datos por nombre y categoría
  const filteredData = dataSearch.filter(
    (item) =>
      item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) && // Filtra por nombre
      (selectedCategory === "todos" ||
        item.categoria.toLowerCase().trim() ===
          selectedCategory.toLowerCase().trim()) // Filtra por categoría
  );

  // Contar los elementos por categoría y búsqueda de nombre
  const countCategory = (category) => {
    return dataSearch.filter(
      (item) =>
        (category === "todos" ||
          item.categoria.toLowerCase().trim() ===
            category.toLowerCase().trim()) &&
        item.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    ).length;
  };

  // Cambiar la categoría cuando se hace clic en las pestañas
  const handleTabClick = (category) => {
    setSelectedTab(category);
    setSelectedCategory(category); // Aquí se actualiza la categoría
  };

  useEffect(() => {
    // Resetear searchTerm si se cambia la categoría
    setSearchTerm("");
  }, [selectedCategory]);

  const handleClose = (e) => {
    // Si el clic fue fuera del modal, se cierra
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    open && (
      <div
        className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50"
        onClick={handleClose} // Cerrar cuando se haga clic fuera
      >
        <div className="bg-white rounded-xl shadow-lg w-max pb-11 relative">
          {/* Input de búsqueda */}
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar por nombre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 p-3 border border-[#E4E6E5] rounded-t-xl mb-4 outline-none"
            />
            <IconSearch
              className="absolute top-[14px] left-[15px]"
              color="rgba(35,33,33,0.4)"
            />
          </div>
          <div className="px-8">
            {/* Tabs */}
            <div className="flex justify-between border-b border-[#E4E6E5] mb-4">
              <button
                className={`px-4 py-2 ${
                  selectedTab === "todos"
                    ? "font-semibold border-b-2 rounded-none border-[#232121]"
                    : "text-gray-500"
                }`}
                onClick={() => handleTabClick("todos")}
              >
                Todos ({countCategory("todos")})
              </button>
              <button
                className={`px-4 py-2 ${
                  selectedTab === "activo"
                    ? "font-semibold border-b-2 rounded-none border-[#232121]"
                    : "text-gray-500"
                }`}
                onClick={() => handleTabClick("Dashboard")}
              >
                Dashboard ({countCategory("Dashboard")})
              </button>
              <button
                className={`px-4 py-2 ${
                  selectedTab === "inactivo"
                    ? "font-semibold border-b-2 rounded-none border-[#232121]"
                    : "text-gray-500"
                }`}
                onClick={() => handleTabClick("Encuestas")}
              >
                Encuestas ({countCategory("Encuestas")})
              </button>
              <button
                className={`px-4 py-2 ${
                  selectedTab === "conversaciones"
                    ? "font-semibold border-b-2 rounded-none border-[#232121]"
                    : "text-gray-500"
                }`}
                onClick={() => handleTabClick("conversaciones")}
              >
                Conversaciones ({countCategory("Conversaciones")})
              </button>
            </div>

            {/* Lista filtrada */}
            <div className="max-h-60 overflow-auto h-[450px]">
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <div key={index} className="flex items-center space-x-4 mb-6">
                    <img
                      src={item.img}
                      alt={item.nombre}
                      className="w-14 h-9 rounded object-cover"
                    />
                    <div>
                      <p className="text-sm font-semibold">{item.nombre}</p>
                      <p className="text-xs text-gray-500">
                        {item.estado} - {item.categoria}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No se encontraron resultados</p>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default SearchModal;
