import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./createPlantilla.css"; // Ensure this CSS file contains the necessary styles
import ImgQuestions from "../../../assets/svg/questions.svg";
import ImgReloj from "../../../assets/svg/reloj.svg";
import ImgEliminar from "../../../assets/svg/delete.svg";
import bgCard from "../../../assets/img/textura.png";
import Question from "../../../assets/svg/questions.svg";
import edit from "../../../assets/svg/edit.svg";
import grip from "../../../assets/svg/grip.svg";
import categoryIcon from "../../../assets/svg/category.svg";

export default function CreatePlantilla({ titulo }) {
  const [currentSection, setCurrentSection] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([
    false,
    false,
    false,
    false,
  ]);
  const [showModal, setShowModal] = useState(false);
  const scrollContainerRef = useRef(null);

  const handleNext = () => {
    if (currentSection < 4) {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.parentElement.scrollTo({
          top: 0,
        });
      }
      const newCompletedSteps = [...completedSteps];
      newCompletedSteps[currentSection - 1] = true;
      setCompletedSteps(newCompletedSteps);
      setCurrentSection(currentSection + 1);
    } else if (currentSection === 4) {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.parentElement.scrollTo({
          top: 0,
        });
      }
      const newCompletedSteps = [...completedSteps];
      newCompletedSteps[currentSection - 1] = true;
      setCompletedSteps(newCompletedSteps);
      setShowModal(true);
    }
  };

  const handleBack = () => {
    if (currentSection > 1) {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.parentElement.scrollTo({
          top: 0,
        });
      }
      setCurrentSection(currentSection - 1);
      const newCompletedSteps = [...completedSteps];
      newCompletedSteps[currentSection - 2] = false;
      setCompletedSteps(newCompletedSteps);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    handleLinkClick("Plantillas de Encuestas");
  };

  // modal
  const [showAddDemographicModal, setShowAddDemographicModal] = useState(false);
  const [showAddquestions, setShowAddquestions] = useState(false);

  // almacenar datos de registro
  const [formData, setFormData] = useState({
    // Datos de introducción
    nombreMapa: "",
    nombreEncuesta: "",
    proposito: "",
    correo: "",
    asunto: "",
    mensaje: "",
    // Datos de la encuesta
    DatosDemograficos: [
      {
        titulo: "Género",
        tipoSeleccion: "select",
        tiempo: "",
        respuestas: ["Masculino", "Femenino", "Otro"],
        respuestaCorrecta: "masculino",
        categoria: "a",
      },
      {
        titulo: "Tipo de documento",
        tipoSeleccion: "select",
        respuestas: ["DNI", "Pasaporte", "Cédula", "Otro"],
        respuestaCorrecta: "cedula",
        categoria: "a",
      },
      {
        titulo: "País, departamento y ciudad",
        tipoSeleccion: "text",
        respuestas: [],
        respuestaCorrecta: "pais",
        categoria: "a",
      },
      {
        titulo: "Tipo de contrato",
        tipoSeleccion: "select",
        respuestas: ["Tiempo completo", "Medio tiempo", "Por proyecto", "Otro"],
        respuestaCorrecta: "tiempo",
        categoria: "a",
      },
      {
        titulo: "Estado civil",
        tipoSeleccion: "select",
        respuestas: ["Soltero", "Casado", "Divorciado", "Viudo"],
        respuestaCorrecta: "soltero",
        categoria: "a",
      },
      {
        titulo: "Nivel de inglés",
        tipoSeleccion: "select",
        respuestas: ["Principiante", "Intermedio", "Avanzado", "Nativo"],
        respuestaCorrecta: "intermedio",
        categoria: "a",
      },
    ],
    Pregunta: [
      {
        titulo: "Género",
        tipoSeleccion: "select",
        respuestas: ["Masculino", "Femenino", "Otro"],
        respuestaCorrecta: "masculino",
        categoria: "Organización",
        tiempo: "1 minuto",
      },
      {
        titulo: "Tipo de documento",
        tipoSeleccion: "select",
        respuestas: ["DNI", "Pasaporte", "Cédula", "Otro"],
        respuestaCorrecta: "cedula",
        categoria: "Organización",
        tiempo: "1 minuto",
      },
      {
        titulo: "País, departamento y ciudad",
        tipoSeleccion: "text",
        respuestas: [],
        respuestaCorrecta: "pais",
        categoria: "Organización",
        tiempo: "1 minuto",
      },
      {
        titulo: "Tipo de contrato",
        tipoSeleccion: "select",
        respuestas: ["Tiempo completo", "Medio tiempo", "Por proyecto", "Otro"],
        respuestaCorrecta: "tiempo",
        categoria: "Organización",
        tiempo: "1 minuto",
      },
      {
        titulo: "Estado civil",
        tipoSeleccion: "select",
        respuestas: ["Soltero", "Casado", "Divorciado", "Viudo"],
        respuestaCorrecta: "soltero",
        categoria: "Organización",
        tiempo: "1 minuto",
      },
      {
        titulo: "Nivel de inglés",
        tipoSeleccion: "select",
        respuestas: ["Principiante", "Intermedio", "Avanzado", "Nativo"],
        respuestaCorrecta: "intermedio",
        categoria: "Organización",
        tiempo: "1 minuto",
      },
    ],
    EncuestaAnonima: false,
    AccesoRestringido: false,
  });

  // Función para manejar cambios en elementos
  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // nuevas preguntas demograficas

  const [newDemographic, setNewDemographic] = useState({
    titulo: "",
    tipoSeleccion: "select",
    respuestas: [],
    respuestaCorrecta: " ",
    descripcion: "",
  });

  const handleAddDemographic = () => {
    setFormData((prevState) => ({
      ...prevState,
      DatosDemograficos: [
        ...prevState.DatosDemograficos,
        { ...newDemographic },
      ],
    }));
    resetNewDemographics();
    setShowAddDemographicModal(false);
  };
  // resetear cuestionario
  const resetNewDemographics = () => {
    setNewDemographic({
      titulo: "",
      tipoSeleccion: "select",
      respuestas: [],
      respuestaCorrecta: "",
    });
  };
  const handleInputChangeDemographics = (e) => {
    const { name, value } = e.target;
    setNewDemographic((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleOptionChangeDemographic = (index, value) => {
    const updatedRespuestas = [...newDemographic.respuestas];
    updatedRespuestas[index] = value;
    setNewDemographic((prevState) => ({
      ...prevState,
      respuestas: updatedRespuestas,
    }));
  };
  const handleAddOptionDemographic = () => {
    setNewDemographic((prevState) => ({
      ...prevState,
      respuestas: [...prevState.respuestas, ""],
    }));
  };
  const handleCorrectResponseClick = (value) => {
    setNewDemographic((prevState) => ({
      ...prevState,
      respuestaCorrecta: value,
    }));
  };

  // drag and drop
  const handleRemoveOption = (index) => {
    const updatedRespuestas = newDemographic.respuestas.filter(
      (_, i) => i !== index
    );
    setNewDemographic((prevState) => ({
      ...prevState,
      respuestas: updatedRespuestas,
    }));
    if (newDemographic.respuestaCorrecta === newDemographic.respuestas[index]) {
      setNewDemographic((prevState) => ({
        ...prevState,
        respuestaCorrecta: "",
      }));
    }
  };
  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("text/plain", index);
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    const draggedIndex = e.dataTransfer.getData("text/plain");
    const updatedPreguntas = [...formData.DatosDemograficos];
    const [movedItem] = updatedPreguntas.splice(draggedIndex, 1);
    updatedPreguntas.splice(index, 0, movedItem);
    setFormData((prevState) => ({
      ...prevState,
      DatosDemograficos: updatedPreguntas,
    }));
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
  };

  // funciones para crear y almacenar preguntas
  console.log(formData);

  // preguntas

  const [newQuestion, setNewQuestion] = useState({
    titulo: "",
    tipoSeleccion: "select",
    respuestas: [],
    respuestaCorrecta: " ",
  });

  const handleAddQuestion = () => {
    setFormData((prevState) => ({
      ...prevState,
      Pregunta: [...prevState.Pregunta, { ...newQuestion }],
    }));
    resetNewQuestion();
    setShowAddquestions(false);
  };
  // resetear cuestionario
  const resetNewQuestion = () => {
    setNewQuestion({
      titulo: "",
      tipoSeleccion: "select",
      respuestas: [],
      respuestaCorrecta: "",
    });
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewQuestion((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleOptionChangeQuestion = (index, value) => {
    const updatedRespuestas = [...newQuestion.respuestas];
    updatedRespuestas[index] = value;
    setNewQuestion((prevState) => ({
      ...prevState,
      respuestas: updatedRespuestas,
    }));
  };
  const handleAddOptionQuestion = () => {
    setNewQuestion((prevState) => ({
      ...prevState,
      respuestas: [...prevState.respuestas, ""],
    }));
  };

  const handleCorrectResponseClickQuestion = (value) => {
    setNewQuestion((prevState) => ({
      ...prevState,
      respuestaCorrecta: value,
    }));
  };

  const handleRemoveOptionQuestion = (index) => {
    const updatedRespuestas = newQuestion.respuestas.filter(
      (_, i) => i !== index
    );
    setNewQuestion((prevState) => ({
      ...prevState,
      respuestas: updatedRespuestas,
    }));
    if (newQuestion.respuestaCorrecta === newQuestion.respuestas[index]) {
      setNewQuestion((prevState) => ({
        ...prevState,
        respuestaCorrecta: "",
      }));
    }
  };

  // drag and drop
  const handleDragStartQuestion = (e, index) => {
    e.dataTransfer.setData("text/plain", index);
  };

  const handleDropQuestion = (e, index) => {
    e.preventDefault();
    const draggedIndex = e.dataTransfer.getData("text/plain");
    const updatedPreguntas = [...formData.Pregunta];
    const [movedItem] = updatedPreguntas.splice(draggedIndex, 1);
    updatedPreguntas.splice(index, 0, movedItem);
    setFormData((prevState) => ({
      ...prevState,
      Pregunta: updatedPreguntas,
    }));
  };
  const handleDragOverQuestion = (e) => {
    e.preventDefault();
  };
  const handleDragLeaveQuestion = (e) => {
    e.preventDefault();
  };

  // editar datos almacenados demograficos
  const [isEditing, setIsEditing] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const openEditDemographicModal = (index) => {
    const demographicToEdit = formData.DatosDemograficos[index];
    setNewDemographic(demographicToEdit); // Cargamos los datos del demográfico seleccionado
    setSelectedIndex(index); // Guardamos el índice del demográfico que estamos editando
    setIsEditing(true); // Cambiamos a modo edición
    setShowAddDemographicModal(true); // Mostramos el modal
  };

  const handleSaveDemographic = () => {
    if (isEditing) {
      // Actualizar el dato demográfico existente
      const updatedDemographics = [...formData.DatosDemograficos];
      updatedDemographics[selectedIndex] = newDemographic;

      setFormData((prevState) => ({
        ...prevState,
        DatosDemograficos: updatedDemographics,
      }));
    } else {
      // Crear un nuevo dato demográfico
      setFormData((prevState) => ({
        ...prevState,
        DatosDemograficos: [...prevState.DatosDemograficos, newDemographic],
      }));
    }

    resetNewDemographics();
    setShowAddDemographicModal(false);
    setIsEditing(false);
  };

  const handleCloseModal = () => {
    resetNewDemographics();
    resetNewQuestion();
    setShowAddDemographicModal(false);
    setIsEditing(false);
  };

  // eliminar
  const handleDeleteDemographic = (index) => {
    setFormData((prevState) => {
      const updatedDemographics = prevState.DatosDemograficos.filter(
        (item, i) => i !== index
      );
      return { ...prevState, DatosDemograficos: updatedDemographics };
    });
  };

  // editar preguntas
  const [isEditingPregunta, setIsEditingPregunta] = useState(false);
  const [selectedIndexPregunta, setSelectedIndexPregunta] = useState(null);

  const openEditPreguntas = (index) => {
    const preguntaToEdit = formData.Pregunta[index];
    setNewQuestion(preguntaToEdit);
    setSelectedIndexPregunta(index);
    setIsEditingPregunta(true);
    setShowAddquestions(true);
  };

  const handleSavePreguntas = () => {
    if (isEditingPregunta) {
      const updatedPreguntas = [...formData.Pregunta];
      updatedPreguntas[selectedIndexPregunta] = newQuestion;

      setFormData((prevState) => ({
        ...prevState,
        Pregunta: updatedPreguntas,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        Pregunta: [...prevState.Pregunta, newQuestion],
      }));
    }

    resetNewQuestion();
    setShowAddquestions(false);
    setIsEditingPregunta(false);
  };
  // eliminar
  const handleDeletePreguntas = (index) => {
    setFormData((prevState) => {
      const updatedPreguntas = prevState.Pregunta.filter(
        (item, i) => i !== index
      );
      return { ...prevState, Pregunta: updatedPreguntas };
    });
  };

  // Manejador de clic para actualizar el título
  const handleLinkClick = (title) => {
    titulo(title); // Actualiza el título con el nombre del enlace clickeado
  };

  const renderSection = () => {
    switch (currentSection) {
      case 1:
        return (
          <div className="form-1 px-8">
            <h2 className="font-bold text-[20px] my-7">Introducción</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              <div className="flex flex-col md:col-span-1">
                <label htmlFor="mapName">Nombre del mapa</label>
                <select
                  name="nombreMapa" // Debe coincidir con la propiedad en formData
                  id="nombre-mapa"
                  value={formData.nombreMapa} // Valor controlado por el estado
                  onChange={handleSelectChange} // Manejador de cambios
                  className="border-[#C7C8C8] border p-3 my-2 resize-none rounded-md"
                >
                  <option value="seleccione" disabled>
                    Seleccione
                  </option>
                  <option value="map1">Mapa 1</option>
                  <option value="map2">Mapa 2</option>
                  <option value="map3">Mapa 3</option>
                </select>
              </div>

              <div className="flex flex-col md:col-span-3">
                <label htmlFor="">Nombre de la encuesta</label>
                <input
                  className="border-[#C7C8C8] border p-3 my-2 resize-none rounded-md"
                  type="text"
                  name="nombreEncuesta"
                  id=""
                  value={formData.nombreEncuesta}
                  onChange={handleSelectChange}
                  placeholder="Escribe el título de la encuesta"
                />
              </div>

              <div className="flex flex-col md:col-span-4">
                <label htmlFor="">Propósito de la encuesta</label>
                <textarea
                  className="border-[#C7C8C8] border p-3 my-2 resize-none rounded-md"
                  name="proposito"
                  id=""
                  placeholder="Escribe aquí..."
                  value={formData.proposito}
                  onChange={handleSelectChange}
                ></textarea>
              </div>

              <div className="flex flex-col md:col-span-2">
                <label htmlFor="">Correo electrónico</label>
                <input
                  className="border-[#C7C8C8] border p-3 my-2 resize-none rounded-md"
                  type="text"
                  name="correo"
                  value={formData.correo}
                  onChange={handleSelectChange}
                  placeholder="Escribe correo electrónico"
                />
              </div>

              <div className="flex flex-col md:col-span-2">
                <label htmlFor="">Asunto de correo</label>
                <input
                  className="border-[#C7C8C8] border p-3 my-2 resize-none rounded-md"
                  type="text"
                  name="asunto"
                  value={formData.asunto}
                  onChange={handleSelectChange}
                  placeholder="Escribe asunto de correo"
                />
              </div>

              <div className="flex flex-col md:col-span-4">
                <label htmlFor="">Mensaje de correo electrónico</label>
                <textarea
                  className="border-[#C7C8C8] border p-3 my-2 resize-none rounded-md"
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleSelectChange}
                  id=""
                  placeholder="Escribe aquí..."
                ></textarea>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <section
            className="p-8 rounded-t-[20px]"
            style={{
              background: `url(${bgCard}) no-repeat center`,
              backgroundSize: "cover",
            }}
          >
            <div className="form-2 bg-white rounded-2xl">
              <div className="bg-[#E9EBF0] flex justify-around rounded-t-2xl"></div>
              <section className="flex flex-col p-5">
                <div className="grid grid-cols-4 gap-8 my-6">
                  <div className="col-span-1">
                    {/* inicio dato demografico */}
                    <div className="cursor-pointer sticky top-32 bg-[#E9EBF0] overflow-auto p-8 rounded-xl pb-14 h-[70vh]">
                      <ul className="">
                        {formData.DatosDemograficos.map((pregunta, index) => (
                          <li
                            key={index}
                            draggable
                            onDragStart={(e) => handleDragStart(e, index)}
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, index)}
                            onDragLeave={handleDragLeave}
                            className="p-2 border-2 mb-3 bg-white hover:border-[#1D70B7] border-[#B7B7B7] rounded-[10px]"
                          >
                            <div className="flex justify-between">
                              <h3 className="flex gap-2 items-center">
                                <span className="w-8 h-8 flex items-center justify-center text-white bg-[#1D70B7] rounded-full font-bold text-xs">
                                  D{index + 1}
                                </span>
                                {pregunta.titulo}
                              </h3>
                              <img src={grip} alt="" />
                            </div>
                          </li>
                        ))}
                      </ul>
                      <button
                        className="p-2 mt-11 border-[#1D70B7] border-2 w-full mx-auto h-max text-center flex justify-center items-center gap-3 text-[#1D70B7]"
                        onClick={() => setShowAddDemographicModal(true)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          className="icon icon-tabler icons-tabler-outline icon-tabler-plus"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M12 5l0 14" />
                          <path d="M5 12l14 0" />
                        </svg>{" "}
                        <span>Añadir demografico</span>
                      </button>
                    </div>
                    {/* fin */}
                  </div>
                  <div className="col-span-3">
                    {formData.DatosDemograficos.map((dato, key) => (
                      <div key={key} className="mb-5">
                        <div className="flex gap-4 p-5 border-2 rounded-[10px] border-[#B7B7B7]">
                          <p className="w-8 h-8 flex items-center justify-center text-white bg-[#1D70B7] rounded-full font-bold text-xs">
                            P{key + 1}
                          </p>
                          <div className="flex justify-between w-full gap-4">
                            <div>
                              <h3 className="font-bold">{dato.titulo}</h3>
                              <h4 className="flex gap-1 items-center mt-1 ">
                                <img src={Question} alt="" />
                                {dato.tipoSeleccion}
                              </h4>
                            </div>
                            {/* iconos eliminar y editar */}
                            <div className="flex gap-2">
                              <img
                                className="w-6"
                                src={edit}
                                alt=""
                                onClick={() => openEditDemographicModal(key)}
                              />
                              <img
                                className="w-6"
                                src={ImgEliminar}
                                alt=""
                                onClick={() => handleDeleteDemographic(key)}
                              />
                            </div>
                          </div>
                        </div>

                        <h3 className="font-bold text-lg mt-5">
                          {dato.titulo}
                        </h3>
                        <div className="flex gap-5 pt-5 pb-12 mb-12 border-b-2 border-[#CECECE]">
                          {dato.respuestas.map((respuesta, key) => (
                            <div
                              key={key}
                              className={`p-8 rounded-md border border-[#C7C8C8]`}
                            >
                              {key + 1 + ". " + respuesta}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          </section>
        );
      case 3:
        return (
          <section
            className="p-8 rounded-t-[20px]"
            style={{
              background: `url(${bgCard}) no-repeat center`,
              backgroundSize: "cover",
            }}
          >
            <div className="form-2 bg-white rounded-2xl">
              <div className="bg-[#E9EBF0] flex justify-around rounded-t-2xl"></div>
              <section className="flex flex-col p-5">
                <div className="grid grid-cols-4 gap-8 my-6">
                  <div className="col-span-1">
                    {/* inicio dato demografico */}
                    <div className="cursor-pointer sticky top-32 bg-[#E9EBF0] overflow-auto p-8 rounded-xl pb-24 h-[70vh]">
                      <ul className="">
                        {formData.Pregunta.map((pregunta, index) => (
                          <li
                            key={index}
                            draggable
                            onDragStart={(e) =>
                              handleDragStartQuestion(e, index)
                            }
                            onDragOver={handleDragOverQuestion}
                            onDrop={(e) => handleDropQuestion(e, index)}
                            onDragLeave={handleDragLeaveQuestion}
                            className="p-2 border-2 mb-3 bg-white hover:border-[#1D70B7] border-[#B7B7B7] rounded-[10px]"
                          >
                            <div className="flex justify-between">
                              <h3 className="flex gap-2 items-center">
                                <span className="w-8 h-8 flex items-center justify-center text-white bg-[#1D70B7] rounded-full font-bold text-xs">
                                  D{index + 1}
                                </span>
                                {pregunta.titulo}
                              </h3>
                              <img src={grip} alt="" />
                            </div>
                          </li>
                        ))}
                      </ul>
                      <button
                        className="p-2 mt-11 border-[#1D70B7] border-2 w-full mx-auto h-max text-center flex justify-center items-center gap-3 text-[#1D70B7]"
                        onClick={() => setShowAddquestions(true)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          className="icon icon-tabler icons-tabler-outline icon-tabler-plus"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M12 5l0 14" />
                          <path d="M5 12l14 0" />
                        </svg>{" "}
                        <span>Añadir pregunta</span>
                      </button>
                    </div>
                    {/* fin */}
                  </div>
                  <div className="col-span-3">
                    {formData.Pregunta.map((dato, key) => (
                      <div key={key} className="mb-5">
                        <div className="flex gap-4 p-5 border-2 rounded-[10px] border-[#B7B7B7]">
                          <p className="w-8 h-8 flex items-center justify-center text-white bg-[#1D70B7] rounded-full font-bold text-xs">
                            P{key + 1}
                          </p>
                          <div className="flex justify-between w-full gap-4">
                            <div>
                              <h3 className="font-bold">{dato.titulo}</h3>
                              <div className="flex gap-6 mt-1 items-center">
                                <h4 className="flex gap-1 items-center">
                                  <img src={Question} alt="" />
                                  {dato.tipoSeleccion}
                                </h4>
                                {/* <div className="flex gap-1 items-center">
                                  <img src={ImgReloj} alt="" />
                                  {dato.tiempo}
                                </div> */}
                                <div className="flex gap-1 items-center">
                                  <img src={categoryIcon} alt="" />
                                  {dato.categoria}
                                </div>
                              </div>
                            </div>
                            {/* iconos eliminar y editar */}
                            <div className="flex gap-2">
                              <img
                                className="w-6"
                                src={edit}
                                alt=""
                                onClick={() => openEditPreguntas(key)}
                              />
                              <img
                                className="w-6"
                                src={ImgEliminar}
                                alt=""
                                onClick={() => handleDeletePreguntas(key)}
                              />
                            </div>
                          </div>
                        </div>

                        <h3 className="font-bold text-lg mt-5">
                          {dato.titulo}
                        </h3>
                        <div className="flex gap-5 pt-5 pb-12 mb-12 border-b-2 border-[#CECECE]">
                          {dato.respuestas.map((respuesta, key) => (
                            <div
                              key={key}
                              className={`p-8 rounded-md border border-[#C7C8C8]`}
                            >
                              {key + 1 + ". " + respuesta}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          </section>
        );
      case 4:
        return (
          <div className="form-3 mt-2 p-8">
            <div className="my-11">
              <h2 className="font-bold">
                ¿Quieres que esta encuesta permanezca anónima?
              </h2>
              <p className="mt-4">
                Las encuestas anónimas permiten a los usuarios ser abiertos y
                honestos sin temor a represalias o vergüenza.
              </p>
              <div className="mt-4">
                {/* Checkbox para encuesta anónima */}
                <label className="flex justify-between items-center space-x-2 my-2 bg-white rounded-lg border-none cursor-pointer w-max">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-[#1D70B7]"
                    checked={formData.EncuestaAnonima}
                    onChange={() =>
                      setFormData((prevState) => ({
                        ...prevState,
                        EncuestaAnonima: !prevState.EncuestaAnonima, // Alterna el valor de Encuesta Anónima
                      }))
                    }
                  />
                  <span>Si. Mantener esta encuesta anónima</span>
                </label>

                {/* Checkbox para no anónima */}
                <label className="flex justify-between items-center space-x-2 my-2 bg-white rounded-lg border-none cursor-pointer w-max">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-[#1D70B7]"
                    checked={!formData.EncuestaAnonima}
                    onChange={() =>
                      setFormData((prevState) => ({
                        ...prevState,
                        EncuestaAnonima: !prevState.EncuestaAnonima, // Alterna el valor de Encuesta Anónima
                      }))
                    }
                  />
                  <span>No. Recopilar información del usuario</span>
                </label>
              </div>
            </div>

            <div className="my-11">
              <h2 className="font-bold">Encuestas de Acceso Restringido</h2>
              <p className="mt-4">
                Solo las personas con su correo electrónico o número de
                identificación registrados en la plataforma podrán responder.
              </p>
              <div className="mt-4">
                {/* Checkbox para acceso restringido */}
                <label className="flex justify-between items-center space-x-2 my-2 bg-white rounded-lg border-none cursor-pointer w-max">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-[#1D70B7]"
                    checked={formData.AccesoRestringido}
                    onChange={() =>
                      setFormData((prevState) => ({
                        ...prevState,
                        AccesoRestringido: !prevState.AccesoRestringido, // Alterna el valor de Acceso Restringido
                      }))
                    }
                  />
                  <span>Si. Hacer encuesta restringida</span>
                </label>

                {/* Checkbox para acceso no restringido */}
                <label className="flex justify-between items-center space-x-2 my-2 bg-white border-none cursor-pointer w-max">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-[#1D70B7] !rounded-full"
                    checked={!formData.AccesoRestringido}
                    onChange={() =>
                      setFormData((prevState) => ({
                        ...prevState,
                        AccesoRestringido: !prevState.AccesoRestringido, // Alterna el valor de Acceso Restringido
                      }))
                    }
                  />
                  <span>No. Cualquier usuario puede responder</span>
                </label>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section
      className="m-8 bg-white h-max my-0 rounded-t-[20px] min-h-[85vh]"
      ref={scrollContainerRef}
    >
      <section className="flex items-center justify-between gap-3 p-0 bg-[#3F4A66] rounded-t-[20px] sticky top-0 z-10">
        <section
          className={`form-actions w-full mx-auto ${
            currentSection === 1 ? "justify-between" : "justify-end"
          }`}
        >
          <div className="form-navigation w-max flex justify-start items-center gap-3 my-3 px-8">
            {currentSection === 1 && (
              <div>
                <Link
                  className="flex items-center gap-3 text-gray-700 hover:text-gray-500 w-max"
                  to={"/live-conversations"}
                  onClick={() => handleLinkClick("Employee Journey")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-8 h-8 text-black bg-[#E9EBF0] rounded p-1"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M5 12l14 0" />
                    <path d="M5 12l6 6" />
                    <path d="M5 12l6 -6" />
                  </svg>
                </Link>
              </div>
            )}
          </div>
          <div className="flex">
            {completedSteps.map((completed, index) => (
              <div className="flex items-center justify-end" key={index}>
                <div
                  className={`step mx-2 w-[30px] h-[30px] rounded-full flex items-center justify-center ${
                    completed ? "completed bg-gray-400" : "bg-[#ffffff80]"
                  } ${currentSection === index + 1 ? "active" : ""}`}
                >
                  {completed && currentSection !== index + 1 ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="check-icon text-white"
                    >
                      <path d="M5 12l5 5L20 7" />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </div>
                <p className="w-max text-white">
                  {index === 0 ? "Introducción" : ""}
                  {index === 1 ? "Datos demográficos" : ""}
                  {index === 2 ? "Preguntas" : ""}
                  {index === 3 ? "Privacidad" : ""}
                </p>
                {index < 3 && (
                  <hr className="border-[#CFD6DC] border-[1px] w-[100px] mx-2" />
                )}
              </div>
            ))}
          </div>
          <div
            className={`form-navigation ${
              currentSection === 1 ? "w-max" : "w-[450px]"
            } flex justify-end gap-3 my-3 px-8`}
          >
            {currentSection === 1 ? (
              <Link
                className={`back-button w-[120px] text-white text-center rounded-lg ${
                  currentSection === 1 ? "" : ""
                }`}
                to={"/employeejourney/plantillaencuestas"}
                onClick={() => handleLinkClick("Plantillas de Encuestas")}
              >
                Cancelar
              </Link>
            ) : (
              <button
                onClick={handleBack}
                className={`back-button text-white w-[120px] ${
                  currentSection === 1 ? "disabled" : ""
                }`}
                disabled={currentSection === 1}
              >
                Volver
              </button>
            )}
            <button onClick={handleNext} className="next-button w-[120px]">
              {currentSection === 4 ? "Crear" : "Continuar"}
            </button>
          </div>
        </section>
      </section>
      <hr />
      {renderSection()}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="w-[50px] h-[50px] p-1 bg-green-600 text-white rounded-full mx-auto icon icon-tabler icons-tabler-outline icon-tabler-check"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M5 12l5 5l10 -10" />
            </svg>
            <p className="font-bold text-[22px] mb-6">
              Encuesta creada con éxito
            </p>
            <Link to={"/employeejourney/plantillaencuestas"}>
              <button
                onClick={closeModal}
                className="modal-close w-[200px] p-2 mt-0"
              >
                Cerrar
              </button>
            </Link>
          </div>
        </div>
      )}

      {/* modal demografico */}
      {showAddDemographicModal && (
        <div className="fixed inset-0 flex items-start justify-center bg-gray-900 bg-opacity-50 pt-16 z-50">
          <div className="bg-white p-6 rounded-lg w-3/5 h-[80vh] overflow-auto">
            <h2 className="text-xl font-bold my-8">Añadir Demográfico</h2>
            <div className="grid grid-cols-4 gap-4 mb-4">
              <div className="flex flex-col md:col-span-4 mt-4">
                <label htmlFor="titulo">Añadir pregunta</label>
                <input
                  type="text"
                  id="titulo"
                  name="titulo"
                  placeholder="Escribe la pregunta"
                  value={newDemographic.titulo}
                  onChange={handleInputChangeDemographics}
                  className="border-[#C7C8C8] border p-3 my-1 resize-none rounded-md"
                />
              </div>
              <div className="flex flex-col md:col-span-4">
                <label htmlFor="descripcion">Añadir descripción</label>
                <textarea
                  id="descripcion"
                  name="descripcion"
                  placeholder="Escribe una descripción"
                  className="border-[#C7C8C8] border p-3 my-1 resize-none rounded-md"
                  value={newDemographic.descripcion}
                  onChange={handleInputChangeDemographics}
                  // Maneja la descripción si es necesario
                ></textarea>
              </div>
              <div className="grid grid-cols-4 gap-4 mb-4 mt-2 col-span-4 relative">
                {newDemographic.respuestas.map((respuesta, index) => (
                  <div
                    key={index}
                    className="col-span-2 mb-2 flex items-center relative"
                  >
                    <span className="absolute left-3 bg-[#E5E7EF] text-[#1D70B7] p-1 w-[35px] h-[35px] text-center rounded-md">
                      {index + 1}
                    </span>
                    <input
                      type="text"
                      value={respuesta}
                      placeholder={`Escribir opción ${index + 1}`}
                      onChange={(e) =>
                        handleOptionChangeDemographic(index, e.target.value)
                      }
                      className="border-[#C7C8C8] border p-3 my-1 resize-none rounded-md w-full px-16"
                    />
                    <div className="absolute right-4">
                      <button
                        type="button"
                        onClick={() => handleRemoveOption(index)}
                        className="text-[#606060]  w-[25px] h-[25px]"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="25"
                          height="25"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="icon icon-tabler icon-tabler-trash"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M4 7l16 0" />
                          <path d="M10 11l0 6" />
                          <path d="M14 11l0 6" />
                          <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                          <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col md:col-span-4">
                <button
                  className="w-max mx-auto h-full text-center mt-auto flex justify-center items-center gap-3 text-[#1D70B7]"
                  onClick={handleAddOptionDemographic}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="icon icon-tabler icon-tabler-plus"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 5l0 14" />
                    <path d="M5 12l14 0" />
                  </svg>
                  <span>Añadir opción de respuesta</span>
                </button>
              </div>
            </div>
            <div className="gap-4 flex justify-end pt-5">
              <button
                className="bg-gray-500 border border-[#8C8C8C] rounded-md px-4 py-2 ml-2 w-[180px] bg-transparent text-[#606060] "
                onClick={() => (
                  setShowAddDemographicModal(false), handleCloseModal()
                )}
              >
                Cancelar
              </button>
              <button
                className="bg-[#1D70B7] text-white px-4 py-2 rounded-md border border-[#1D70B7] w-[180px]"
                onClick={handleSaveDemographic}
              >
                {isEditing ? "Guardar cambios" : "Crear"}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* modal preguntas */}
      {showAddquestions && (
        <div className="fixed inset-0 flex items-start justify-center bg-gray-900 bg-opacity-50 pt-16 z-50">
          <div className="bg-white p-6 rounded-lg w-3/5 h-[80vh] overflow-auto">
            <h2 className="text-xl font-bold my-4">Añadir pregunta</h2>
            <div className="grid grid-cols-4 gap-4 mb-4">
              <div className="flex flex-col md:col-span-4 mt-4">
                <label htmlFor="titulo">Escribir Pregunta</label>
                <input
                  type="text"
                  id="titulo"
                  name="titulo"
                  value={newQuestion.titulo}
                  onChange={handleInputChange}
                  className="border-[#C7C8C8] border p-3 my-1 resize-none rounded-md"
                />
              </div>
              <div className="flex flex-col md:col-span-2 mt-2">
                <label htmlFor="tipoSeleccion">Tipo de pregunta</label>
                <select
                  id="tipoSeleccion"
                  name="tipoSeleccion"
                  value={newQuestion.tipoSeleccion}
                  onChange={handleInputChange}
                  className="border-[#C7C8C8] border p-3 my-1 resize-none rounded-md"
                >
                  <option value="select">Seleccionar</option>
                  <option value="text">Texto libre</option>
                </select>
              </div>
              <div className="flex flex-col md:col-span-2 mt-2">
                <label htmlFor="categoria">Categoría</label>
                <select
                  id="categoria"
                  name="categoria"
                  value={newQuestion.categoria}
                  className="border-[#C7C8C8] border p-3 my-1 resize-none rounded-md"
                >
                  <option value="seleccion" disabled>
                    Seleccione
                  </option>
                  <option value="text">Texto libre</option>
                  {/* Opciones de categoría aquí */}
                </select>
              </div>
              <div className="flex flex-col md:col-span-4">
                <label htmlFor="descripcion">Añadir descripción</label>
                <textarea
                  id="descripcion"
                  name="descripcion"
                  placeholder="Escribe una descripción"
                  className="border-[#C7C8C8] border p-3 my-1 resize-none rounded-md"
                  // Maneja la descripción si es necesario
                ></textarea>
              </div>
              <div className="grid grid-cols-4 gap-4 mt-4 mb-4 col-span-4 relative">
                {newQuestion.respuestas.map((respuesta, index) => (
                  <div
                    key={index}
                    className="mb-2 col-span-2 flex items-center relative"
                  >
                    <span className="absolute left-3 bg-[#E5E7EF] text-[#1D70B7] p-1 w-[35px] h-[35px] text-center rounded-md">
                      {index + 1}
                    </span>
                    <input
                      type="text"
                      value={respuesta}
                      placeholder={`Escribir opción ${index + 1}`}
                      onChange={(e) =>
                        handleOptionChangeQuestion(index, e.target.value)
                      }
                      className="border-[#C7C8C8] border p-3 my-1 resize-none rounded-md w-full px-16"
                    />
                    <div className="absolute right-4">
                      <button
                        type="button"
                        onClick={() => handleRemoveOptionQuestion(index)}
                        className="text-[#606060]  w-[25px] h-[25px]"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="25"
                          height="25"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="icon icon-tabler icon-tabler-trash"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M4 7l16 0" />
                          <path d="M10 11l0 6" />
                          <path d="M14 11l0 6" />
                          <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                          <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col md:col-span-4">
              <button
                className="w-max mx-auto h-full text-center mt-auto flex justify-center items-center gap-3 text-[#1D70B7]"
                onClick={handleAddOptionQuestion}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="icon icon-tabler icon-tabler-plus"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 5l0 14" />
                  <path d="M5 12l14 0" />
                </svg>
                <span>Añadir opción de respuesta</span>
              </button>
            </div>
            <div className="gap-4 flex justify-end pt-5">
              <button
                className="bg-gray-500 border border-[#8C8C8C] rounded-md px-4 py-2 ml-2 w-[180px] bg-transparent text-[#606060] "
                onClick={() => (setShowAddquestions(false), handleCloseModal())}
              >
                Cancelar
              </button>
              <button
                className="bg-[#1D70B7] text-white px-4 py-2 rounded-md border border-[#1D70B7] w-[180px]"
                onClick={handleSavePreguntas}
              >
                {isEditingPregunta ? "Guardar cambios" : "Crear"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
