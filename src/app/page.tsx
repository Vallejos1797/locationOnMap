"use client"
import Select from "react-select";

export default async function Home() {
    const options = [
        {value: "option1", label: "Option 1"},
        {value: "option2", label: "Option 2"},
        {value: "option3", label: "Option 3"},
        // Agrega más opciones según sea necesario
    ];
    return (
        <div className=" min-h-screen">
            <main className="max-w-4xl mx-auto mt-4 p-4">
                <div className="text-center my-5 flex flex-col ">
                    <label className="text-3xl text-black font-bold">Where are you located?</label>
                    <label className="text-xl text-black font-bold mt-10">So we know where to drop off the stuff</label>
                    <label className="mt-3">We won't share your address</label>
                    <label className="mb-10">with your ex (or whoever).</label>
                    <div>
                        <Select options={options}/>
                    </div>
                    {/*<AddLocation/>*/}
                </div>
                {/*<TodoList locations={locations}/>*/}
            </main>
        </div>
    )
}
