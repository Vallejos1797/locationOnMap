import Image from 'next/image';
import { useEffect, useState} from "react";
import usePlacesAutocomplete, {getGeocode} from "use-places-autocomplete";
import {AiFillCloseCircle} from "react-icons/ai";
import {PopupDynamic} from "./popupDynamic";


const ZIP_CODES = [
    10286, 10099, 10278, 10119, 10001, 10124, 10257, 10105, 10017, 10138, 10203, 10199, 10169, 10212, 10117, 10111,
    10163, 10103, 10108, 10157, 10261, 10109, 10121, 10159, 10242, 10004, 10153, 10116, 10173, 10081, 10150, 10265,
    10175, 10060, 10102, 10179, 10154, 10096, 10200, 10114, 10155, 10185, 10079, 10271, 10277, 10129, 10113, 10171,
    10160, 10276, 10292, 10006, 10082, 10269, 10152, 10174, 10256, 10196, 10036, 10055, 10122, 10258, 10007, 10020,
    10168, 10177, 10197, 10118, 10273, 10112, 10010, 10123, 10110, 10107, 10046, 10164, 10008, 10120, 10090, 10259,
    10106, 10149, 10178, 10275, 10019, 10158, 10012, 10156, 10260, 10172, 10094, 10005, 10279, 10048, 10072, 10095,
    10211, 10018, 10165, 10268, 10126, 10161, 10167, 10170, 10104, 10022, 10249, 10176, 10045, 10016, 10003, 10166,
    10184, 10098, 10151, 10015, 10101, 10087, 10047, 10011, 10025, 10280, 10285, 10024, 10282, 10038, 10270, 10133,
    10272, 10065, 10080, 10162, 10213, 10028, 10041, 10131, 10281, 10002, 10044, 10043, 10009, 10029, 10125, 10014,
    10013, 10130, 10274, 10128, 10021, 10023, 10132, 10075, 10069, 11101, 11201, 11206, 11238, 11231, 11109, 11205,
    11222, 11104, 11217, 11211, 11106, 11368, 11372, 11216, 11225, 11374, 11379, 11385, 11370, 11103, 11377, 11369,
    11355, 11373, 11221, 11203, 11232, 11371, 11218, 11378, 11105, 11102, 11226, 11233, 11375, 11237, 11215, 11354,
    11213
];

const messageLocation = {
    belong: {
        title: "Address updated",
        subtitle: "New address to your account",
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut emin ad minim veniam, quis nortrud exercitation ulloamco.",
        footer: "Nisi ut aliquip ex ea commodo consequat."
    },
    noBelong: {
        title: "Out of Delivery Area",
        subtitle: '"Wherever I go, there I am"',
        message: "Sadly, this quote is not true for us,In other words, we are not operating in your area (yet), but things change everyday",
        footer: "Sign up to our newsletter to get notified."
    }
}


interface ISearchResult {
    description: string;
}

export function SearchInput({numberOptions}: { numberOptions: number }) {
    const [items, setItems] = useState<ISearchResult[]>([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [contentModal, setContentModal] = useState<any>({});

    const {
        value,
        setValue,
        suggestions: {data},
    } = usePlacesAutocomplete({debounce: 300, defaultValue: ''});


    useEffect(() => {
        if (value) {
            setItems(
                data.filter(
                    (object: ISearchResult) =>
                        object.description.toLowerCase().includes(value.toLowerCase())
                ).slice(0, numberOptions)
            );
        } else {
            setItems([]);
        }
    }, [data, value]);

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
            const results = await getGeocode({address: object.description});
            if (results) {
                const addressComponents = results[0].address_components;
                const zipCodeComponent = addressComponents.find(
                    (component) => component.types[0].includes("postal_code")
                );
                if (zipCodeComponent) {
                    const zipCode = await ZIP_CODES.find((item: any) => item == zipCodeComponent.long_name)
                    if (zipCode) {
                        setContentModal(messageLocation.belong)
                    } else {
                        setContentModal(messageLocation.noBelong)
                    }
                } else {
                    setContentModal(messageLocation.noBelong)
                }
            }
        } catch (error) {
            // TODO Message error form API
            console.error("Error getting geocode:", error);
        }
        setValue(object.description);
        setSelectedItem(object);
        setModalOpen(true);
        setItems([])
    };

    const closeModal = () => {
        setModalOpen(false);
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
                                        <Image src="/assets/icons/map-pin-gray.png" alt="nada" width={13} height={20}/>
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
