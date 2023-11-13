"use client"
import Select from "react-select";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Asume que estás utilizando Font Awesome
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import {useState} from "react";
import TodoList from "@/app/components/LocationList";
import Modal from "@/app/components/Modal"; // Asume que estás utilizando Font Awesome

export default function Home() {

    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);

    const customStyles = {
        // Estilos personalizados aquí...
    };

    const customComponents = {

    }

    const options = [
        {value: "option1", label: "Option 1"},
        {value: "value", label: "Option 2"},
        {value: "test", label: "Option 3"},
        // Agrega más opciones según sea necesario
    ];
    const handleInputChange = (inputValue, { action }) => {

        if (action === 'input-change' && inputValue && !selectedOption) {
            setMenuIsOpen(true);



        }
    };
    const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption);
        setModalOpen(true);

    };

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <div className=" min-h-screen">
            <main className="max-w-4xl mx-auto mt-4 p-4">
                <div className="text-center my-5 flex flex-col ">
                    <label className="text-3xl text-black font-bold">Where are you located?</label>
                    <label className="text-xl text-black font-bold mt-10">So we know where to drop off the stuff</label>
                    <label className="mt-3">We won´t share your address</label>
                    <label className="mb-10">with your ex (or whoever).</label>
                    <div>
                        <Select
                            options={options}
                            styles={customStyles}
                            components={customComponents}
                            placeholder="Search Location"
                            onInputChange={handleInputChange}
                            onChange={handleChange}
                            value={selectedOption}
                        />
                    </div>
                    {isModalOpen && (
                        <Modal onClose={closeModal}>
                            {/* Contenido de tu modal */}
                            <p>Opción seleccionada: {selectedOption ? selectedOption.label : 'Ninguna'}</p>
                        </Modal>
                    )}
                </div>



            </main>
        </div>
    )
}
