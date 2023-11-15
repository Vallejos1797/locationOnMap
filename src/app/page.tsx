"use client"
import {useEffect} from "react";
import 'reactjs-popup/dist/index.css';
import {useGoogleMapsScript, Libraries} from "use-google-maps-script";
import {SearchInput} from "@/app/components/searchInput";

const libraries: Libraries = ["places"];


export default function Home() {


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
    }, [isLoaded, loadError]);


    return (
        <div className=" min-h-screen">
            <main className="max-w-4xl mx-auto mt-4 p-4">
                {isLoaded &&
                    <div className="text-center my-5 flex flex-col ">
                        <label className="text-2xl text-black font-bold">Where are you located?</label>
                        <label className="text-base text-black font-bold mt-10">So we know where to drop off the
                            stuff</label>
                        <label className=" text-sm mt-3 text-[#9098a4ff]">We won´t share your address</label>
                        <label className="text-sm mb-10 text-[#9098a4ff]">with your ex (or whoever).</label>
                        <SearchInput />

                    </div>}
            </main>
        </div>
    )
}
