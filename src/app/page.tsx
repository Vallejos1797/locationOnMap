"use client"
import Select from "react-select";
import {useState} from "react";
import Modal from "@/app/components/Modal";
import 'reactjs-popup/dist/index.css';
import Popup from 'reactjs-popup';
import {AiOutlineClose} from "react-icons/ai";

export default function Home() {

    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);

    const customStyles = {
        // Estilos personalizados aquí...
    };

    const customComponents = {}

    const options = [
        {value: "option1", label: "Option 1"},
        {value: "value", label: "Option 2"},
        {value: "test", label: "Option 3"},
        // Agrega más opciones según sea necesario
    ];
    const handleInputChange = (inputValue, {action}) => {

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

                <Popup

                    trigger={<button className="button"> Open Modal </button>}
                    modal
                    nested
                    contentStyle={{ maxWidth: '500px', }}
                >
                    {close => (
                        <div className="modal text-right" >
                            <button onClick={close} style={{ color: 'gray', fontWeight: 'bold' }} className="close-button">

                                <AiOutlineClose
                                    onClick={close}
                                    cursor='pointer'
                                    className='text-black-500'
                                    size={25}
                                />
                            </button>
                            <div className=" mx-auto text-center mb-5 p-2">
                                <h1 className="text-xl text-black font-bold m-5">Address updated</h1>
                                <h2 className="text-base text-black font-bold m-4 ">New address to your account</h2>
                                <h2 className="mt-3   text-base">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut emin ad minim veniam, quis nortrud exercitation ulloamco.
                                </h2>
                                <h2 className="text-black text-base m-4">Nisi ut aliquip ex ea commodo consequat</h2>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            </div>
                            <div className="footer text-center mt-5">
                                <button type="button"
                                        className="py-2.5
                                         w-1/2
                                         px-5 me-2
                                         mb-2
                                         text-sm
                                         font-medium
                                         bg-pink-300
                                         text-white
                                         focus:outline-none
                                         rounded-full
                                         border
                                         border-gray-200
                                         hover:bg-white
                                         hover:border-pink-300
                                         hover:text-pink-300
                                  "
                                >UNDERSTOOD
                                </button>
                            </div>
                        </div>
                    )}
                </Popup>


            </main>
        </div>
    )
}
