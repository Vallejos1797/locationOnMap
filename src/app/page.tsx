"use client"
import Image from 'next/image';
import usePlacesAutocomplete, {
     getGeocode
} from "use-places-autocomplete";
import {ChangeEvent, useEffect, useState} from "react";
import 'reactjs-popup/dist/index.css';
import Popup from 'reactjs-popup';
import {AiOutlineClose, AiFillCloseCircle} from "react-icons/ai";
import {useGoogleMapsScript, Libraries} from "use-google-maps-script";

const libraries: Libraries = ["places"];


export default function Home() {

    const locations = [10286,
        10099,
        10278,
        10119,
        10001,
        10124,
        10257,
        10105,
        10017,
        10138,
        10203,
        10199,
        10169,
        10212,
        10117,
        10111,
        10163,
        10103,
        10108,
        10157,
        10261,
        10109,
        10121,
        10159,
        10242,
        10004,
        10153,
        10116,
        10173,
        10081,
        10150,
        10265,
        10175,
        10060,
        10102,
        10179,
        10154,
        10096,
        10200,
        10114,
        10155,
        10185,
        10079,
        10271,
        10277,
        10129,
        10113,
        10171,
        10160,
        10276,
        10292,
        10006,
        10082,
        10269,
        10152,
        10174,
        10256,
        10196,
        10036,
        10055,
        10122,
        10258,
        10007,
        10020,
        10168,
        10177,
        10197,
        10118,
        10273,
        10112,
        10010,
        10123,
        10110,
        10107,
        10046,
        10164,
        10008,
        10120,
        10090,
        10259,
        10106,
        10149,
        10178,
        10275,
        10019,
        10158,
        10012,
        10156,
        10260,
        10172,
        10094,
        10005,
        10279,
        10048,
        10072,
        10095,
        10211,
        10018,
        10165,
        10268,
        10126,
        10161,
        10167,
        10170,
        10104,
        10022,
        10249,
        10176,
        10045,
        10016,
        10003,
        10166,
        10184,
        10098,
        10151,
        10015,
        10101,
        10087,
        10047,
        10011,
        10025,
        10280,
        10285,
        10024,
        10282,
        10038,
        10270,
        10133,
        10272,
        10065,
        10080,
        10162,
        10213,
        10028,
        10041,
        10131,
        10281,
        10002,
        10044,
        10043,
        10009,
        10029,
        10125,
        10014,
        10013,
        10130,
        10274,
        10128,
        10021,
        10023,
        10132,
        10075,
        10069,
        11101,
        11201,
        11206,
        11238,
        11231,
        11109,
        11205,
        11222,
        11104,
        11217,
        11211,
        11106,
        11368,
        11372,
        11216,
        11225,
        11374,
        11379,
        11385,
        11370,
        11103,
        11377,
        11369,
        11355,
        11373,
        11221,
        11203,
        11232,
        11371,
        11218,
        11378,
        11105,
        11102,
        11226,
        11233,
        11375,
        11237,
        11215,
        11354,
        11213]
    let datos = [];


    const {isLoaded, loadError} = useGoogleMapsScript({
        googleMapsApiKey: "AIzaSyDLqqFiYYa6zLwNxLRobK0gj2lR8AmZYmg",
        libraries,
    });
    useEffect(() => {
        // This effect runs after the component is mounted
        if (isLoaded) {
            console.log('consume');
        } else if (loadError) {
            console.log('error consuming the API');
        }
    }, [isLoaded, loadError]); // Add dependencies to the useEffect dependency array


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

    const {
        ready,
        value,
        setValue,
        suggestions: {status, data},
        clearSuggestions,
    } = usePlacesAutocomplete({debounce: 300, defaultValue: ''});


    const handleInput = (event: ChangeEvent<HTMLInputElement>) => {

        const inputValue = event.target.value;
        setSearchValue(inputValue)
        setValue(inputValue);
        console.log('data', data)
        datos = data
        if (inputValue) {
            setItems(datos.filter((objeto: any) => objeto.description.toLowerCase().includes(inputValue.toLowerCase())).slice(0, 3));
            setMenuIsOpen(true);
        } else {
            setMenuIsOpen(false);
        }
    };
    const openModal = async (object: any) => {
        try {
            const results = await getGeocode({address: object.description});
            console.log('traes', results)
            if (results) {
                const addressComponents = results[0].address_components;
                const zipCodeComponent = addressComponents.find(
                    (component) => component.types[0].includes("postal_code")
                );
                if (zipCodeComponent){
                    const test = locations.find((item) =>item == zipCodeComponent.long_name)
                    console.log('code zip', zipCodeComponent.long_name)
                   if (test){
                       console.log('hay code ')
                   }else{
                       console.log('no hay')
                   }
                }

            }
        } catch (error) {
            console.error("Error getting geocode:", error);
        }

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
                                    <li key={objeto.description} className="border-t border-gray-300"
                                        onClick={() => openModal(objeto)}>
                                        <div className="flex items-center p-3 ">
                                            <div className="mr-5">
                                                <Image src="/assets/icons/map-pin-gray.png" alt="nada" width={13}
                                                       height={20}/>
                                            </div>
                                            <div>
                                                <h1 className="text-base font-bold mb-2">{objeto.description}</h1>
                                                <h1 className="ml-0 text-sm font-bold text-[#9098a4ff] mb-2">{objeto.description}</h1>
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
