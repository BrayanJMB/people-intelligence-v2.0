import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import ImgQuestions from "/assets/svg/questions.svg";
import ImgReloj from "/assets/svg/reloj.svg";
import ImgEliminar from "/assets/svg/delete.svg";
import bgCard from "/assets/img/textura.png";
import Question from "/assets/svg/questions.svg";
import edit from "/assets/svg/edit.svg";
import grip from "/assets/svg/grip.svg";
import categoryIcon from "/assets/svg/category.svg";
import ImgConversacion from "/assets/img/conversacion.jpg";
import { IconArrowLeft, IconCategory2, IconCheck, IconCircleCheck, IconCircleCheckFilled, IconHelpHexagon, IconPlus, IconTrash, IconUpload } from "@tabler/icons-react";

export default function CrearConversacion({ titulo, logoEmpresas }) {
  const [currentSection, setCurrentSection] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([false, false, false]);
  const [showModal, setShowModal] = useState(false);
  const scrollContainerRef = useRef(null);

  const handleNext = () => {
    if (currentSection < 3) {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.parentElement.scrollTo({
          top: 0,
        });
      }
      const newCompletedSteps = [...completedSteps];
      newCompletedSteps[currentSection - 1] = true;
      setCompletedSteps(newCompletedSteps);
      setCurrentSection(currentSection + 1);
    } else if (currentSection === 3) {
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

  const [conversationPreview, setConversationPreview] = useState(null);
  const [moderatorPreview, setModeratorPreview] = useState(null);
  // almacenar datos de registro
  const [formData, setFormData] = useState({
    // Datos de introducción
    nombreMapa: "",
    nombreEncuesta: "",
    proposito: "",
    titulo: "",
    moderador: "",
    introduccion: "",
    correo: "",
    asunto: "",
    mensaje: "",
    img_conversacion: null,
    foto_moderador: null,
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
    categoria:"",
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
      categoria:"",
      tipoSeleccion: "select",
      respuestas: [],
      respuestaCorrecta: "",
      descripcion: "",
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
    categoria:"",
    respuestas: [],
    respuestaCorrecta: " ",
    descripcion: "",
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
      categoria:"",
      tipoSeleccion: "select",
      respuestas: [],
      respuestaCorrecta: "",
      descripcion: "",
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

  // imagenes
  const handleConversationImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setConversationPreview(URL.createObjectURL(file));

      setFormData((prevState) => ({
        ...prevState,
        img_conversacion: file,
      }));
    }
  };
  const handleModeratorImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setModeratorPreview(URL.createObjectURL(file));

      setFormData((prevState) => ({
        ...prevState,
        foto_moderador: file,
      }));
    }
  };

  const renderSection = () => {
    switch (currentSection) {
      case 1:
        return (
          <section className="grid grid-cols-2 mt-5">
            <div className="form-1 px-8 col-span-1">
              <h2 className="font-bold text-[20px] my-7">Introducción</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                <div className="flex flex-col md:col-span-4">
                  <label htmlFor="">
                    Titulo de conversación{" "}
                    <span className="text-red-600 font-semibold">*</span>
                  </label>
                  <input
                    className="border-[#C7C8C8] border p-3 my-2 resize-none rounded-md"
                    type="text"
                    name="titulo"
                    id=""
                    value={formData.titulo}
                    onChange={handleSelectChange}
                    placeholder="Escribe el título de la encuesta"
                  />
                </div>

                <div className="flex flex-col md:col-span-4">
                  <label htmlFor="">
                    Nombre del moderador{" "}
                    <span className="text-red-600 font-semibold">*</span>
                  </label>
                  <input
                    className="border-[#C7C8C8] border p-3 my-2 resize-none rounded-md"
                    type="text"
                    name="moderador"
                    id=""
                    value={formData.moderador}
                    onChange={handleSelectChange}
                    placeholder="Escribe el título de la encuesta"
                  />
                </div>

                <div className="flex flex-col md:col-span-2">
                  <label>Personalizar (Opcional)</label>
                  <label
                    htmlFor="img-conversacion"
                    className="p-2 border border-[#C7C8C8] block rounded-[5px] text-center mt-2 cursor-pointer hover:bg-gray-200 transition-all"
                  >
                    <span className="flex items-center justify-center">
                      <IconUpload width={25} height={25}></IconUpload>
                      Subir imagen de conversación
                    </span>
                  </label>
                  <input
                    className="hidden"
                    type="file"
                    accept="image/*"
                    id="img-conversacion"
                    onChange={handleConversationImageChange}
                  />
                </div>

                <div className="flex flex-col md:col-span-2">
                  <label
                    htmlFor="img-moderador"
                    className="p-2 border border-[#C7C8C8] block rounded-[5px] text-center mt-8 cursor-pointer hover:bg-gray-200 transition-all"
                  >
                    <span className="flex items-center justify-center">
                      <IconUpload width={25} height={25}></IconUpload>
                      Subir imagen de avatar moderador
                    </span>
                  </label>
                  <input
                    className="hidden"
                    id="img-moderador"
                    type="file"
                    accept="image/*"
                    onChange={handleModeratorImageChange}
                  />
                </div>

                <div className="flex flex-col md:col-span-4">
                  <label htmlFor="">
                    Introducción {}{" "}
                    <span className="text-red-600 font-semibold">*</span>
                  </label>
                  <textarea
                    className="border-[#C7C8C8] border p-3 my-2 resize-none rounded-md"
                    name="introduccion"
                    value={formData.introduccion}
                    onChange={handleSelectChange}
                    id=""
                    placeholder="Escribe aquí..."
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="col-span-1 flex flex-col justify-center items-center p-8">
              <div className="bg-secundario p-11 rounded-3xl w-full">
                <div className="bg-white p-5 w-full rounded-3xl grid grid-cols-2">
                  <div className="col-span-1 pe-11">
                    <img src={logoEmpresas} alt="" />
                    <h3 className="text-[#606060] font-[14px] mt-6">
                      Titulo de conversación
                    </h3>
                    <p className="mt-1">
                      {formData.titulo
                        ? formData.titulo
                        : "Encuesta de inicio de actividades laborales # 1"}
                    </p>
                    <h3 className="text-[#606060] font-[14px] mt-6">
                      Nombre de moderador
                    </h3>
                    <p className="flex items-center mt-1 gap-2">
                      {(moderatorPreview || ImgConversacion) && (
                        <img
                          src={
                            moderatorPreview
                              ? moderatorPreview
                              : ImgConversacion
                          }
                          alt="Previsualización"
                          style={{ width: "25px" }}
                          className="rounded-full border-[#ccc]"
                        />
                      )}
                      {formData.moderador
                        ? formData.moderador
                        : "Carlos Gomez Perez"}
                    </p>
                    <h3 className="text-[#606060] font-[14px] mt-6">
                      Introducción
                    </h3>
                    <p className="line-clamp-4 text-ellipsis mt-1">
                      {formData.introduccion
                        ? formData.introduccion
                        : "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magana."}
                    </p>
                  </div>
                  <div className="col-span-1">
                    {(conversationPreview || ImgConversacion) && (
                      <img
                        src={
                          conversationPreview
                            ? conversationPreview
                            : ImgConversacion
                        }
                        alt="Previsualización"
                        style={{ width: "100%" }}
                        className="object-cover h-full rounded-2xl"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
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
                                <span className="w-8 h-8 flex items-center justify-center text-white bg-terciario rounded-full font-bold text-xs">
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
                        className="p-2 mt-11 btn-secundario border-2 w-full mx-auto h-max text-center flex justify-center items-center gap-3"
                        onClick={() => setShowAddDemographicModal(true)}
                      >                        
                        <IconPlus stroke={2} />                        
                        <span>Añadir demografico</span>
                      </button>
                    </div>
                    {/* fin */}
                  </div>
                  <div className="col-span-3">
                    {formData.DatosDemograficos.map((dato, key) => (
                      <div key={key} className="mb-5">
                        <div className="flex gap-4 p-5 border-2 rounded-[10px] border-[#B7B7B7]">
                          <p className="w-8 h-8 flex items-center justify-center text-white bg-terciario rounded-full font-bold text-xs">
                            P{key + 1}
                          </p>
                          <div className="flex justify-between w-full gap-4">
                            <div>
                              <h3 className="font-bold">{dato.titulo}</h3>
                              <h4 className="flex gap-1 items-center mt-1 ">
                                <IconHelpHexagon
                                  className="mr color-terciario"
                                  stroke={2}
                                />
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
                                <span className="w-8 h-8 flex items-center justify-center text-white bg-terciario rounded-full font-bold text-xs">
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
                        className="p-2 mt-11 btn-secundario border-2 w-full mx-auto h-max text-center flex justify-center items-center gap-3"
                        onClick={() => setShowAddquestions(true)}
                      >
                        <IconPlus stroke={2}/>
                        {" "}
                        <span>Añadir pregunta</span>
                      </button>
                    </div>
                    {/* fin */}
                  </div>
                  <div className="col-span-3">
                    {formData.Pregunta.map((dato, key) => (
                      <div key={key} className="mb-5">
                        <div className="flex gap-4 p-5 border-2 rounded-[10px] border-[#B7B7B7]">
                          <p className="w-8 h-8 flex items-center justify-center text-white bg-terciario rounded-full font-bold text-xs">
                            P{key + 1}
                          </p>
                          <div className="flex justify-between w-full gap-4">
                            <div>
                              <h3 className="font-bold">{dato.titulo}</h3>
                              <div className="flex gap-6 mt-1 items-center">
                                <h4 className="flex gap-1 items-center">
                                  <IconHelpHexagon
                                    className="color-terciario"
                                    stroke={2}
                                  />
                                  {dato.tipoSeleccion}
                                </h4>
                                {/* <div className="flex gap-1 items-center">
                                  <img src={ImgReloj} alt="" />
                                  {dato.tiempo}
                                </div> */}
                                <div className="flex gap-1 items-center">
                                  <IconCategory2 stroke={2} className="color-terciario" />
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
      default:
        return null;
    }
  };

  return (
    <section
      className="m-8 bg-white h-max my-0 rounded-t-[20px] min-h-[85vh]"
      ref={scrollContainerRef}
    >
      <section className="flex items-center gap-3 p-0 rounded-t-[20px] sticky top-0 z-10 bg-terciario">
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
                  onClick={() => handleLinkClick("Dynamic Live Conversations")}
                >
                  <IconArrowLeft stroke={2} className="w-8 h-8 text-black bg-[#E9EBF0] rounded p-1" />                
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
                    <IconCheck stroke={2} />
                  ) : (
                    index + 1
                  )}
                </div>
                <p className="w-max text-white">
                  {index === 0 ? "Introducción" : ""}
                  {index === 1 ? "Datos demográficos" : ""}
                  {index === 2 ? "Preguntas" : ""}
                </p>
                {index < 2 && (
                  <hr className="border-[#CFD6DC] border-[1px] w-[100px] mx-2" />
                )}
              </div>
            ))}
          </div>
          <div
            className={`form-navigation ${
              currentSection === 1 ? "w-max" : "w-[550px]"
            } flex justify-end gap-3 my-3 px-8`}
          >
            {currentSection === 1 ? (
              <></>
            ) : (
              <button
                onClick={handleBack}
                className={`back-button w-[120px] btn-secundario ${
                  currentSection === 1 ? "disabled" : ""
                }`}
                disabled={currentSection === 1}
              >
                Volver
              </button>
            )}
            <button
              onClick={handleNext}
              className="next-button w-[120px] btn btn-principal"
            >
              {currentSection === 3 ? "Crear" : "Continuar"}
            </button>
          </div>
        </section>
      </section>
      <hr />
      {renderSection()}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
          <IconCircleCheckFilled stroke={2} className="color-secundario w-[55px] h-[55px]" />
            <p className="font-bold text-[22px] mb-6">
              Conversación creada con éxito
            </p>
            <Link to={"/live-conversations"}>
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
                        <IconTrash stroke={2}></IconTrash>                  
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col md:col-span-4">
                <button
                  className="w-max mx-auto h-full text-center mt-auto flex justify-center items-center gap-3 color-terciario"
                  onClick={handleAddOptionDemographic}
                >
                  <IconPlus className="color-terciario"></IconPlus>
                  <span>Añadir opción de respuesta</span>
                </button>
              </div>
            </div>
            <div className="gap-4 flex justify-end pt-5">
              <button
                className="rounded-md px-4 py-2 ml-2 w-[180px] btn-secundario"
                onClick={() => (
                  setShowAddDemographicModal(false), handleCloseModal()
                )}
              >
                Cancelar
              </button>
              <button
                className="px-4 py-2 rounded-md border w-[180px] btn-principal"
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
                  onChange={handleInputChange}
                  className="border-[#C7C8C8] border p-3 my-1 resize-none rounded-md"
                >
                  <option value="seleccion" disabled>
                    Seleccione
                  </option>
                  <option value="Texto libre">Texto libre</option>
                  <option value="Selección">Selección</option>
                  {/* Opciones de categoría aquí */}
                </select>
              </div>
              <div className="flex flex-col md:col-span-4">
                <label htmlFor="descripcion">Añadir descripción</label>
                <textarea
                  id="descripcion"
                  name="descripcion"
                  value={newQuestion.descripcion}
                  onChange={handleInputChange}
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
                       <IconTrash stroke={2}></IconTrash>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col md:col-span-4">
              <button
                className="w-max mx-auto h-full text-center mt-auto flex justify-center items-center gap-3 color-terciario"
                onClick={handleAddOptionQuestion}
              >
                <IconPlus className="color-terciario"></IconPlus>
                <span>Añadir opción de respuesta</span>
              </button>
            </div>
            <div className="gap-4 flex justify-end pt-5">
              <button
                className="rounded-md px-4 py-2 ml-2 w-[180px] btn-secundario"
                onClick={() => (setShowAddquestions(false), handleCloseModal())}
              >
                Cancelar
              </button>
              <button
                className="px-4 py-2 rounded-md border w-[180px] btn-principal"
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
