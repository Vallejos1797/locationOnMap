"use client"
import Image from 'next/image';

import {useEffect, useState} from "react";
import 'reactjs-popup/dist/index.css';
import Popup from 'reactjs-popup';
import {AiOutlineClose, AiFillCloseCircle} from "react-icons/ai";


export default function Home() {
    let datos = [
        {value: 1, label: '875 Bordausx', label2: '875 Bordausx'},
        {value: 2, label: 'Quito 2023', label2: 'Quito 2023'},
        {value: 3, label: 'Ibarra 2023', label2: 'Ibarra 2023'},
        {value: 4, label: 'Otavalito 2023', label2: 'Otavalito 2023'},
        {value: 5, label: 'ATUN 2023', label2: 'ATUN 2023'},
        {value: 6, label: 'Alla 2023', label2: 'Alla 2023'},
    ];
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const mobileThreshold = 768;
            setIsMobile(window.innerWidth < mobileThreshold);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const [items, setItems] = useState(datos);
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    const focusInput = () => {
        if (searchValue) {
            setMenuIsOpen(true);
        }
    }

    const handleInput = (event: any) => {
        const inputValue = event.target.value;
        setSearchValue(inputValue)
        if (inputValue) {
            setItems(datos.filter((objeto: any) => objeto.label.toLowerCase().includes(inputValue.toLowerCase())).slice(0, 3));
            setMenuIsOpen(true);
        } else {
            setMenuIsOpen(false);
        }
    };
    const openModal = (object: any) => {
        setSearchValue(object.label);
        setModalOpen(true);
        setMenuIsOpen(false);
    };

    const closeModal = () => {
        setModalOpen(false);
    };
    const clearInput = () => {
        setSearchValue('');
        setMenuIsOpen(false);
    };


    return (
        <div className=" min-h-screen">
            <main className="max-w-4xl mx-auto mt-4 p-4">
                <div className="text-center my-5 flex flex-col ">
                    <label className="text-2xl text-black font-bold">Where are you located?</label>
                    <label className="text-base text-black font-bold mt-10">So we know where to drop off the
                        stuff</label>
                    <label className=" text-sm mt-3 text-[#9098a4ff]">We won´t share your address</label>
                    <label className="text-sm mb-10 text-[#9098a4ff]">with your ex (or whoever).</label>
                    <div className=" shadow-black shadow  opacity-75">
                        <div className="relative">
                            <div className="flex items-center ">
                                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center ">
                                        <Image src="/assets/icons/map-pin.png" alt="nada" width={13} height={20}
                                        />
                                    </span>
                                <input
                                    type="text"
                                    placeholder=""
                                    className="pl-10 p-4 text-base font-bold  w-full custom-input"
                                    onInput={handleInput}
                                    value={searchValue}
                                    onFocus={focusInput}
                                />
                                {searchValue && (
                                    <span
                                        className="absolute text-base  inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                                        onClick={clearInput}
                                    >
                                        <AiFillCloseCircle
                                            onClick={closeModal} cursor='pointer'
                                            className='text-black-500' size={20}/>
                                    </span>
                                )}

                            </div>

                        </div>
                        {menuIsOpen && (
                            <ul className=" text-lg font-bold w-full bg-white">
                                {items.map((objeto: any) => (
                                    <li key={objeto.value} className="border-t border-gray-300"
                                        onClick={() => openModal(objeto)}>
                                        <div className="flex items-center p-3 ">
                                            <div className="mr-5">
                                                <Image src="/assets/icons/map-pin-gray.png" alt="nada" width={13}
                                                       height={20}/>
                                            </div>
                                            <div>
                                                <h1 className="text-base font-bold mb-2">{objeto.label}</h1>
                                                <h1 className="ml-0 text-sm font-bold text-[#9098a4ff] mb-2">{objeto.label2}</h1>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                </div>

                <Popup
                    open={isModalOpen}
                    modal
                    nested
                    contentStyle={{
                        maxWidth: 'lg:max-w-screen-sm sm:max-w-screen-md', width: isMobile ? '80%' : '30%',
                    }}

                    closeOnDocumentClick={true}
                >

                    <div className="modal text-right p-4">
                        <button
                            style={{color: 'gray', fontWeight: 'bold'}}
                            className="close-button">
                            <AiOutlineClose
                                onClick={closeModal}
                                cursor='pointer'
                                className='text-black'
                                size={20}
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
                                    className="
                                     py-2.5
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
