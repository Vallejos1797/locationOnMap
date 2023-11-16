import Image from 'next/image';
import {useEffect, useState} from "react";
import usePlacesAutocomplete, {getGeocode, getZipCode} from "use-places-autocomplete";
import {AiFillCloseCircle} from "react-icons/ai";
import {PopupDynamic} from "./popupDynamic";
import {toast} from "react-toastify";
import {messageLocation, ZIP_CODES} from "../config/constants";




interface ISearchResult {
    description: string;
}

interface IOptions {
    numberOptions: number;
}

export function SearchInput({numberOptions}: IOptions) {
    const [items, setItems] = useState<ISearchResult[]>([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [contentModal, setContentModal] = useState<any>({});

    const {
        value,
        setValue,
        suggestions: {data, status},
    } = usePlacesAutocomplete({debounce: 300, defaultValue: ''});
    useEffect(() => {
        handleSearchResults(status, value, data, numberOptions);
    }, [data, value]);

    const handleSearchResults = (status, value, data, numberOptions) => {
        if (status === 'OK') {
            handleOkStatus(value, data, numberOptions);
        } else if (status === 'ZERO_RESULTS') {
            handleZeroResults();
        } else if (status === 'ERROR' || status === 'UNKNOWN_ERROR') {
            handleErrorMessage();
        }
    };

    const handleOkStatus = (value, data, numberOptions) => {
        if (value) {
            const locations = filterLocationsByValue(value, data).slice(0, numberOptions);
            setItems(locations);
        } else {
            setItems([]);
        }
    };

    const filterLocationsByValue = (value, data) => {
        return data.filter(
            (location) => location.description.toLowerCase().includes(value.toLowerCase())
        );
    };

    const handleZeroResults = () => {
        setItems([]);
        toast.warning('Input new value, no results found recommended', {autoClose: 2000});
    };

    const handleErrorMessage = () => {
        toast.error(
            <div>
                CHECK CONNECTION <br/>
                Error fetching data
            </div>,
            {autoClose: 2000}
        );
    };

    const handleInput = (event) => {
        const {target: {value}} = event
        setValue(value);
        setSelectedItem('')
    };

    const focusInput = () => {
        if (value) {
            setSelectedItem('')
        }
    }

    const clearInput = () => {
        setValue('');
        setItems([])
    };


    const openModal = async (object: any) => {
        try {
            const location = await getGeocode({address: object.description});
            if (location) {
                const zipcode = +await getZipCode(location[0], true);
                if (zipcode && ZIP_CODES.includes(zipcode)) {
                    setContentModal(messageLocation.belong)
                } else {
                    setContentModal(messageLocation.noBelong)
                }
                setValue(object.description);
                setSelectedItem(object);
                setModalOpen(true);
                setItems([])
            }
        } catch (error) {
            toast.error(<div>
                CHECK CONNECTION <br/>
                Error fetching data
            </div>, {autoClose: 2000});
            console.error("Error getting geocode:", error);
        }
    };

    return (
        <>
            <div className="shadow-black shadow opacity-75">
                <div className="relative">
                    <div className="flex items-center bg-white">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                            <Image src="/assets/icons/map-pin.png" alt="img-point" width={13} height={20}/>
                        </div>
                        <input
                            type="text"
                            placeholder=""
                            className="pl-10 p-4 text-base font-bold w-full custom-input truncate"
                            onInput={handleInput}
                            value={value}
                            onFocus={focusInput}
                            data-cy="inp_location"
                        />
                        {value && (

                            <AiFillCloseCircle onClick={clearInput} cursor="pointer"
                                               className=" mr-3 flex items-center cursor-pointer text-black-500"
                                               size={20}/>

                        )}
                    </div>
                </div>
                {items.length > 0 && !selectedItem && (
                    <ul className="text-lg font-bold w-full bg-white">
                        {items.map((item: any) => (
                            <li
                                key={item.description}
                                className="border-t border-gray-300"
                                onClick={() => openModal(item)}
                                data-cy={item.description}
                            >
                                <div className="flex items-center p-3">
                                    <div className="mr-5">
                                        <Image src="/assets/icons/map-pin-gray.png" alt="image point" width={13}
                                               height={20}/>
                                    </div>
                                    <div>
                                        <h1 className="text-left text-base font-bold mb-2">{item.structured_formatting.main_text}</h1>
                                        <h1 className="ml-0 text-left text-sm font-bold text-gray-400 mb-2">{item.structured_formatting.secondary_text}</h1>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <PopupDynamic open={isModalOpen} contentModal={contentModal}
                          onClose={setModalOpen}/>
        </>
    );
}
