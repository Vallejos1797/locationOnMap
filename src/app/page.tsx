"use client"
import dynamic from 'next/dynamic';
import Image from 'next/image';

import { useState} from "react";
import 'reactjs-popup/dist/index.css';
import Popup from 'reactjs-popup';
import {AiOutlineClose} from "react-icons/ai";

const DynamicSelect = dynamic(() => import('react-select'), {ssr: false});

export default function Home() {

    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    const customStyles = {
        control: (styles) => ({
            ...styles,
            border: 'none',
            boxShadow: 'none',
            borderBottom:  'none',
            borderRadius: '0',
            position: 'relative',

        }),
        input: (styles) => ({
            ...styles,
            height: '40px',
            border: 'none',
        }),
        dropdownIndicator: (styles) => ({
            ...styles,
            display: 'none', // Oculta la flecha
        }),
        indicatorSeparator: (styles) => ({
            ...styles,
            display: 'none', // Oculta la línea separadora
        }),
    };

    const CustomOption = ({ innerProps, label }) => (
        <div {...innerProps} style={{ display: 'flex', alignItems: 'center' }}>
            <Image
                src="/assets/icons/map-pin-gray.png"
                alt="nada"
                width={20}
                height={20}
            />
            {label}
        </div>
    );

    const options = [
        {value: "option1", label: "Option 1"},
        {value: "value", label: "value"},
        {value: "value", label: "value"},
        {value: "value", label: "value"},
        {value: "test", label: "test"},
    ];
    const handleInputChange = (inputValue: any, {action}: any) => {
        setSearchValue(inputValue)
        if (action === 'input-change' && inputValue && !selectedOption) {
            setMenuIsOpen(true);
        }
    };
    const handleChange = (selectedOption: any) => {
        setSelectedOption(selectedOption);
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
        return false;
    };


    return (
        <div className=" min-h-screen">
            <main className="max-w-4xl mx-auto mt-4 p-4">
                <div className="text-center my-5 flex flex-col ">
                    <label className="text-3xl text-black font-bold">Where are you located?</label>
                    <label className="text-xl text-black font-bold mt-10">So we know where to drop off the stuff</label>
                    <label className="mt-3">We won´t share your address</label>
                    <label className="mb-10">with your ex (or whoever).</label>
                    <div className="custom-select-container relative mt-10 flex items-center justify-center w-60 mx-auto">
                        <div className="bg-white h-full flex">
                            <Image
                                src="/assets/icons/map-pin.png"
                                alt="nada"
                                width={20}
                                height={25}
                                className="mobile-position mr-2"
                            />
                        </div>

                        <DynamicSelect
                            options={options}
                            styles={customStyles}
                            components={{ Option: CustomOption }}
                            placeholder="Search Location"
                            onInputChange={handleInputChange}
                            onChange={handleChange}
                            value={selectedOption}
                            menuIsOpen={searchValue.length > 0}
                            isSearchable
                            className="w-full" // Asegura que el input se expanda completamente en su contenedor
                        />
                    </div>


                </div>

                <Popup
                    open={isModalOpen}

                    modal
                    nested
                    contentStyle={{maxWidth: '500px',}}
                    closeOnDocumentClick={true}
                >

                        <div className="modal text-right">
                            <button
                                    style={{color: 'gray', fontWeight: 'bold'}}
                                    className="close-button">
                                <AiOutlineClose
                                    onClick={closeModal}
                                    cursor='pointer'
                                    className='text-black-500'
                                    size={25}
                                />
                            </button>
                            <div className=" mx-auto text-center mb-5 p-2">
                                <h1 className="text-xl text-black font-bold m-5">Address updated</h1>
                                <h2 className="text-base text-black font-bold m-4 ">New address to your account</h2>
                                <h2 className="mt-3   text-base">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua. Ut emin ad minim veniam, quis nortrud
                                    exercitation ulloamco.
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
                                        onClick={closeModal}
                                >UNDERSTOOD
                                </button>
                            </div>
                        </div>

                </Popup>


            </main>
        </div>
    )
}
