"use client"
import {useEffect} from "react";
import 'reactjs-popup/dist/index.css';
import {useGoogleMapsScript, Libraries} from "use-google-maps-script";
import {SearchInput} from "@/app/components/searchInput";

const libraries: Libraries = ["places"];

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

export default function Home() {


    const {isLoaded, loadError} = useGoogleMapsScript({
        googleMapsApiKey: "AIzaSyDLqqFiYYa6zLwNxLRobK0gj2lR8AmZYmg",
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
                        <label className=" text-sm mt-3 text-[#9098a4ff]">We won´t share your address</label>
                        <label className="text-sm mb-10 text-[#9098a4ff]">with your ex (or whoever).</label>
                        <SearchInput numberOptions={3} messageLocation={messageLocation}/>

                    </div>}
            </main>
        </div>
    )
}
