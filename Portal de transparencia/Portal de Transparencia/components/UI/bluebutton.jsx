import { Link } from "react-router-dom";

export default function BlueButton({nome, link}){
    return (
        <>
        <Link to={link} className={`w-fit h-fit bg-(--navy) text-sm text-white font-bold border border-gray-900 drop-shadow-md py-2 px-5 rounded-3xl hover:bg-blue-800 cursor-pointer duration-300`}>{nome}</Link>
        </>
    )}