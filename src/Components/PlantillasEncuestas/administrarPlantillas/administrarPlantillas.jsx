import { useState } from "react";
import { IconArrowLeft, IconPencil, IconPlus, IconTrash } from "@tabler/icons-react";
import { Link } from "react-router-dom";

export default function AdministrarPlantillas({ titulo }) {
  const [activeTab, setActiveTab] = useState("categorias");
  const [isCategoriaModalOpen, setCategoriaModalOpen] = useState(false);
  const [isMapaModalOpen, setMapaModalOpen] = useState(false);

  // estadis editar
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingMap, setEditingMap] = useState(null);

  const [categoryData, setCategoryData] = useState({
    name: "",
    description: "",
  });

  const [mapData, setMapData] = useState({
    name: "",
    description: "",
    image: null,
  });

  const handleLinkClick = (title) => {
    titulo(title);
  };

  const dataCategorias = [
    {
      id: "0248",
      Name: "Organización",
      Descipcion: "Aspectos organizacionales del proceso del empleado",
    },
    {
      id: "0249",
      Name: "Procesos",
      Descipcion:
        "Procesos de recursos humanos en el ciclo de vida del colaborador",
    },
  ];

  const dataMapas = [
    { id: "M001", Name: "Mapa 1", Descipcion: "Descripción del mapa 1" },
    { id: "M002", Name: "Mapa 2", Descipcion: "Descripción del mapa 2" },
  ];

  const handleCreateCategory = () => {
    const formDataCategory = new FormData();
    formDataCategory.append("name", categoryData.name);
    formDataCategory.append("description", categoryData.description);
    console.log("Creando categoría:", categoryData);

    // Cerrar el modal y resetear estado
    setCategoriaModalOpen(false);
    setCategoryData({ name: "", description: "" });
  };

  const handleCreateMap = () => {
    const formDataMap = new FormData();
    formDataMap.append("name", mapData.name);
    formDataMap.append("description", mapData.description);
    if (mapData.image) {
      formDataMap.append("image", mapData.image);
    }
    // handle para enviar el fetch de mapas
    for (let [key, value] of formDataMap.entries()) {
      console.log(`${key}: ${value}`);
    }
    // Cerrar el modal y resetear el estado
    setMapaModalOpen(false);
    setMapData({ name: "", description: "", image: null });
  };

  // editar categorias
  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setCategoryData({ name: category.Name, description: category.Descipcion });
    setCategoriaModalOpen(true);
  };

  const handleEditMap = (map) => {
    setEditingMap(map);
    setMapData({ name: map.Name, description: map.Descipcion, image: null });
    setMapaModalOpen(true);
  };

  const handleUpdateCategory = () => {
    console.log("Actualizando categoría:", categoryData);

    // Cerrar el modal y resetear estado
    setCategoriaModalOpen(false);
    setEditingCategory(null);
    setCategoryData({ name: "", description: "" });
  };

  const handleUpdateMap = () => {
    // Realiza la lógica para actualizar el mapa
    console.log("Actualizando mapa:", mapData);
    setMapaModalOpen(false);
    setEditingMap(null);
    setMapData({ name: "", description: "", image: null });
  };

  return (
    <section className="m-8 p-8 bg-white h-max rounded-[20px] overflow-hidden">
      <div>
        <Link
          className="flex items-center gap-2 text-gray-700 hover:text-gray-500 w-max"
          to={"/employeejourney"}
          onClick={() => handleLinkClick("Employee Journey")}
        >
          <IconArrowLeft stroke={2} className="w-6 h-6 text-[#1D70B7]" />
          Volver
        </Link>
      </div>
      <h3 className="font-bold text-[22px] mt-3 mb-3">Administrar encuestas</h3>

      <section>
        <div className="bg-[#E9EBF0] flex justify-around rounded-lg">
          <button
            onClick={() => setActiveTab("categorias")}
            className={`w-[200px] py-3 ${
              activeTab === "categorias"
                ? "rounded-none border-b-4 border-color-terciario"
                : ""
            }`}
          >
            Categorías
          </button>
          <button
            onClick={() => setActiveTab("mapas")}
            className={`w-[200px] py-3 ${
              activeTab === "mapas"
                ? "rounded-none border-b-4 border-color-terciario"
                : ""
            }`}
          >
            Mapas
          </button>
        </div>
      </section>

      <section>
        {activeTab === "categorias" && (
          <div>
            <div className="flex justify-between items-center">
              <h2 className="font-[400] my-8">Listado de categorías</h2>
              <button
                onClick={() => setCategoriaModalOpen(true)}
                className="w-max btn btn-principal"
              >
                <IconPlus />
                <span>Añadir Categoria</span>
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-5 px-4 text-left text-[#606060] font-normal">
                      ID
                    </th>
                    <th className="py-5 px-4 text-left text-[#606060] font-normal">
                      Nombre
                    </th>
                    <th className="py-5 px-4 text-left text-[#606060] font-normal">
                      Descripción
                    </th>
                    <th className="py-5 px-4 text-left text-[#606060] font-normal">
                      Opciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dataCategorias.map((data, key) => (
                    <tr key={key}>
                      <td className="py-5 px-4">{data.id}</td>
                      <td className="py-5 px-4">{data.Name}</td>
                      <td className="py-5 px-4">{data.Descipcion}</td>
                      <td className="py-5 px-4 flex gap-4">
                        <IconPencil onClick={() => handleEditCategory(data)} />
                        <IconTrash />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "mapas" && (
          <div>
            <div className="flex justify-between items-center">
              <h2 className="font-[400] my-8">Listado de mapas</h2>
              <button
                onClick={() => setMapaModalOpen(true)}
                className="w-max btn btn-principal"
              >
                <IconPlus />
                <span>Añadir mapa</span>
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-5 px-4 text-left text-[#606060] font-normal">
                      ID
                    </th>
                    <th className="py-5 px-4 text-left text-[#606060] font-normal">
                      Nombre
                    </th>
                    <th className="py-5 px-4 text-left text-[#606060] font-normal">
                      Descripción
                    </th>
                    <th className="py-5 px-4 text-left text-[#606060] font-normal">
                      Opciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dataMapas.map((mapa, key) => (
                    <tr key={key}>
                      <td className="py-5 px-4">{mapa.id}</td>
                      <td className="py-5 px-4">{mapa.Name}</td>
                      <td className="py-5 px-4">{mapa.Descipcion}</td>
                      <td className="py-5 px-4 flex gap-4">
                        <IconPencil onClick={() => handleEditMap(mapa)} />
                        <IconTrash />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>

      {/* Modal para Categorías */}
      {isCategoriaModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-[650px]">
            <h3 className="text-2xl font-bold mb-4">
              {editingCategory ? "Editar categoría" : "Crear categoría"}
            </h3>
            <label htmlFor="" className="text-[14px]">
              Nombre de categoría
            </label>
            <input
              name="name"
              type="text"
              value={categoryData.name}
              onChange={(e) =>
                setCategoryData((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="Nombre"
              className="w-full p-2 border rounded mb-4"
            />
            <textarea
              name="description"
              value={categoryData.description}
              onChange={(e) =>
                setCategoryData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              placeholder="Descripción"
              className="w-full p-2 border rounded mb-4 resize-none"
            ></textarea>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  setCategoriaModalOpen(false);
                  setEditingCategory(null);
                  setCategoryData({ name: "", description: "" }); // Reinicia el estado
                }}
                className="btn btn-secundario"
              >
                Cancelar
              </button>
              <button
                onClick={
                  editingCategory ? handleUpdateCategory : handleCreateCategory
                }
                className="btn btn-principal"
              >
                {editingCategory ? "Guardar cambios" : "Crear"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para Mapas */}
      {isMapaModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-[650px]">
            <h3 className="text-2xl font-bold mb-4">
              {editingMap ? "Editar mapa" : "Crear mapa"}
            </h3>
            <label htmlFor="" className="text-[14px]">
              Nombre de mapa
            </label>
            <input
              type="text"
              name="name"
              value={mapData.name}
              onChange={(e) =>
                setMapData((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="Nombre"
              className="w-full p-2 border rounded mb-4"
            />
            <label htmlFor="" className="text-[14px]">
              Descripción
            </label>
            <textarea
              name="description"
              value={mapData.description}
              onChange={(e) =>
                setMapData((prev) => ({ ...prev, description: e.target.value }))
              }
              placeholder="Descripción"
              className="w-full p-2 border rounded mb-4 resize-none"
            ></textarea>
            <label htmlFor="" className="text-[14px]">
              Imagen del mapa
            </label>
            <input
              name="image"
              type="file"
              accept="image/*"
              onChange={(e) =>
                setMapData((prev) => ({ ...prev, image: e.target.files[0] }))
              }
              className="w-full p-2 border rounded mb-4"
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  setMapaModalOpen(false);
                  setEditingMap(null);
                  setMapData({ name: "", description: "", image: null }); // Reinicia mapData
                }}
                className="btn btn-secundario"
              >
                Cancelar
              </button>
              <button
                onClick={editingMap ? handleUpdateMap : handleCreateMap}
                className="btn btn-principal"
              >
                {editingMap ? "Guardar cambios" : "Crear"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
