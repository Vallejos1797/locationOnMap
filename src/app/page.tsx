"use client"
import {useEffect} from "react";
import 'reactjs-popup/dist/index.css';
import {useGoogleMapsScript, Libraries} from "use-google-maps-script";
import {SearchInput} from "./components/searchInput";
import dotenv from 'dotenv';
dotenv.config();

const libraries: Libraries = ["places"];


export default function Home() {


    const {isLoaded, loadError} = useGoogleMapsScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_REACT_APP_API_URL,
        libraries,
    });

    useEffect(() => {

        if (isLoaded) {
            // TODO MESSAGE
        } else if (loadError) {
            // TODO MESSAGE
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
                        <label className=" text-sm mt-3 text-gray-400">We won´t share your address</label>
                        <label className="text-sm mb-10 text-gray-400">with your ex (or whoever).</label>
                        <SearchInput numberOptions={3} />
                    </div>}
            </main>
        </div>
    )
}
