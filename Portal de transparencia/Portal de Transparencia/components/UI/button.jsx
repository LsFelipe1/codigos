import { Link } from "react-router-dom";

export default function Button({nome, link}){
    return (
        <>
        <Link to={link} className={`w-fit h-fit bg-(--blue-50) text-sm text-black font-bold border border-gray-900 drop-shadow-md py-2 px-5 rounded-3xl hover:bg-(--blue-100) cursor-pointer duration-300`}>{nome}</Link>
        </>
    )}