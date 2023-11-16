import Popup from "reactjs-popup";
import {AiOutlineClose} from "react-icons/ai";

interface IPopupDynamicProps {
    open: boolean;
    onClose: (isOpen: boolean) => void;
    contentModal: {
        title: string;
        subtitle: string;
        message: string;
        footer: string;
    };
}

export function PopupDynamic({open, onClose, contentModal}:IPopupDynamicProps) {

    const closeModal = () => {
        onClose(false);
    };


    return (
        <Popup
            open={open}
            modal
            nested
            closeOnDocumentClick={false}
        >
            <div className="modal text-right p-4">
                <button
                    className="close-button font-bold text-gray">
                    <AiOutlineClose
                        onClick={closeModal}
                        cursor='pointer'
                        className='text-black'
                        size={20}
                    />
                </button>
                <div className=" mx-auto text-center mb-36 p-2">
                    <h1 className="text-xl text-black font-bold m-5">{contentModal.title}</h1>
                    <h2 className="text-base text-black font-bold m-4 ">{contentModal.subtitle}</h2>
                    <h2 className="mt-3  px-8 text-base">
                        {contentModal.message}
                    </h2>
                    <h2 className="text-black text-base m-4 ">
                        {contentModal.footer}

                    </h2>

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
                            data-cy="btn_understood"
                            onClick={closeModal}
                    >UNDERSTOOD
                    </button>
                </div>
            </div>
        </Popup>
    );
}
