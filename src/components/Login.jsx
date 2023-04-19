import { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { AppContext } from "../context/appContext";
import { CirclePicker } from "react-color";
import routes from "../data/routes";

export default function Login() {
    const { memberSet } = useContext(AppContext);
    const [username, setUsername] = useState("");
    const [color, setColor] = useState("");
    const navigate = useNavigate();

    const usernameSet = (e) => {
        setUsername(e.target.value);
    }

    const colorSet = (e) => {
        setColor(e.hex);
        console.log("------------------------");
        console.log(e);
    }

    const onSubmit = (e) => {
        if (username === "" || color === "") {
            alert("Popunite sva polja!");
            return
        }
        memberSet(username, color);
        navigate(routes.chat);
    }
    
    return (
        <form className="login-container" onSubmit={onSubmit}>
            <label>USERNAME</label>
            <input
                spellCheck="false"
                type="text"
                className="login-input"
                onChange={usernameSet}
            />
            <label>COLOR</label>
            <CirclePicker onChange={colorSet}/>
            <button 
                type="submit"
                className="login-button">
                    LOGIN
            </button>
        </form>
    );
}
