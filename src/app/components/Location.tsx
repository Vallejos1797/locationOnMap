"use client";

import { FormEventHandler, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
// import { deleteTodo, editTodo } from "@/api";
import {ILocation} from "../../../types/location";

interface LocationProps {
    location: ILocation;
}

const Location: React.FC<LocationProps> = ({ location }) => {
    const router = useRouter();
    const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
    const [openModalDeleted, setOpenModalDeleted] = useState<boolean>(false);
    const [taskToEdit, setLocationToEdit] = useState<string>(location.text);

    const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        // await editTodo({
        //     id: location.id,
        //     text: taskToEdit,
        // });
        setOpenModalEdit(false);
        router.refresh();
    };

    const handleDeleteLocation = async (id: string) => {
        // await deleteTodo(id);
        setOpenModalDeleted(false);
        router.refresh();
    };

    return (
        <tr key={location.id}>
            <td className='w-full'>{location.text}</td>
            <td className='flex gap-5'>
                <FiEdit
                    onClick={() => setOpenModalEdit(true)}
                    cursor='pointer'
                    className='text-blue-500'
                    size={25}
                />
                <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
                    <form onSubmit={handleSubmitEditTodo}>
                        <h3 className='font-bold text-lg'>Edit location</h3>
                        <div className='modal-action'>
                            <input
                                value={taskToEdit}
                                onChange={(e) => setLocationToEdit(e.target.value)}
                                type='text'
                                placeholder='Type here'
                                className='input input-bordered w-full'
                            />
                            <button type='submit' className='btn'>
                                Submit
                            </button>
                        </div>
                    </form>
                </Modal>
                <FiTrash2
                    onClick={() => setOpenModalDeleted(true)}
                    cursor='pointer'
                    className='text-red-500'
                    size={25}
                />
                <Modal modalOpen={openModalDeleted} setModalOpen={setOpenModalDeleted}>
                    <h3 className='text-lg'>
                        Are you sure, you want to delete this location?
                    </h3>
                    <div className='modal-action'>
                        <button onClick={() => handleDeleteLocation(location.id)} className='btn'>
                            Yes
                        </button>
                    </div>
                </Modal>
            </td>
        </tr>
    );
};

export default Location;
