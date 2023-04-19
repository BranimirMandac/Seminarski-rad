import { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/appContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Messages from './Messages';
import Input from './Input';

export default function Chat() {
    
    const { member, memberSet } = useContext(AppContext);

    const [drone] = useState(new window.Scaledrone("SsYD3wA7uOGnYwGd", { data: member }));
    const [messages, setMessages] = useState([]);

    drone.on('open', error => {
        if (error) { return console.error(error) };
        memberSet(member.username, member.color, drone.clientId);
    });

    const room = drone.subscribe("observable-room");

    room.on('message', message => {
        const { data, member: messageMember } = message;
        const time = Date.now();
        setMessages([...messages, { member: messageMember, text: data, time }]);
        if (messageMember.clientData !== member) {
            showReceivedMessageNotification();
        }
    });

    const onSendMessage = (message) => {
        drone.publish({
            room: "observable-room",
            message
        });
        showToastMessage();
    };

    const showToastMessage = () => {
        toast.success('Message sent!', {
            position: toast.POSITION.TOP_RIGHT
        });
    };

    const showReceivedMessageNotification = () => {
        toast.info('You have a new message!', {
            position: toast.POSITION.TOP_RIGHT
        });
    };

    return (
        <div>
            <Messages messages={messages} currentMember={member} />
            <Input onSendMessage={onSendMessage} />
            <ToastContainer />
        </div>
    );
}

