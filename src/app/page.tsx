import TodoList from "@/app/components/LocationList";
import AddLocation from "@/app/components/AddLocation";
import {ILocation} from "../../types/location";
// import { getAllLocation } from "@/api";
import Select from "react-select";

export default async function Home() {
    const locations: ILocation[] = [
        {
            id: "1",
            text: "Location 1",
        },
        {
            id: "2",
            text: "Location 2",
        },

    ];
    return (
        <div className="bg-gray-200 min-h-screen">
            <main className="max-w-4xl mx-auto mt-4 p-4">
                <div className="text-center my-5 flex flex-col gap-4">
                    <h1 className="text-2xl text-black font-bold">Where are you located?</h1>
                    <h3 className="text-2xl  text-black font-bold">So we know where to drop the stuff</h3>
                    <h4 className="text-2xl">We won´t share your address</h4>
                    <h5 className="text-2xl">with your ex(or whoere)</h5>
                    <div className="max-w-2xl mx-auto mt-4">
                        <Select
                            value={selectedOption}
                            onChange={handleChange}
                            options={options}
                            isSearchable={true}
                            placeholder="Selecciona una opción..."
                        />
                    </div>
                    <AddLocation/>
                </div>
                <TodoList locations={locations}/>
            </main>
        </div>
    )
}
