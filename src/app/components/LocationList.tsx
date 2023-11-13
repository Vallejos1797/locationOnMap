import React from "react";
import Location from "./Location";
import {ILocation} from "../../../types/location";

interface TodoListProps {
    locations: ILocation[];
}

const TodoList: React.FC<TodoListProps> = ({locations}) => {
    console.log('llega-->', locations)
    return (
        <div className='overflow-x-auto'>
            <table className='table w-full'>
                {/* head */}
                <thead>
                <tr>
                    <th>Locations</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {locations && locations.length > 0 ? (
                    locations.map((location) => (
                        <Location key={location.id} location={location}/>
                    ))
                ) : (
                    <tr>
                        <td colSpan={2}>No locations found</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default TodoList;
