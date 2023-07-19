import { createContext, useContext, useReducer, useState } from "react";
import { useAuth } from "./authContext";

const chatContext = createContext();


export const ChatContextProvider = ({ children }) => {

    const [users, setUsers] = useState(false)
    const [chats, setChats] = useState([])
    const [selectedChat, setSelectedChat] = useState(null)

    const [inputText, setInputText] = useState("")
    const [attachement, setAttachement] = useState(null)
    const [attachementPreview, setAttachementPreview] = useState(null)
    const [editMsg, setEditMsg] = useState(null)
    const [isTyping, setIsTyping] = useState(null)
    const [imageViewer, setImageViewer] = useState(null)



    const { currentUser } = useAuth()


    const resetFooterState = () => {

        setInputText('')
        setAttachement(null)
        setAttachementPreview(null)
        setEditMsg(null)
        setImageViewer(null)
    }






    const INITIAL_STATE = {
        chatId: "",
        user: null
    }


    const chatReducer = (state, action) => {
        switch (action.type) {
            case "CHANGE_USER":
                return {
                    user: action.payload,
                    chatId: currentUser.uid > action.payload.uid ? currentUser.uid + action.payload.uid : action.payload.uid + currentUser.uid
                }


            case "EMPTY":
                return INITIAL_STATE


            default:
                return state
        }
    }


    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE)



    return (
        <chatContext.Provider value={{
            users, setUsers,
            data: state,
            dispatch,
            chats, setChats,
            selectedChat, setSelectedChat,
            inputText, setInputText,
            attachement, setAttachement,
            attachementPreview, setAttachementPreview,
            editMsg, setEditMsg,
            isTyping, setIsTyping,
            imageViewer, setImageViewer,
            resetFooterState
        }}>
            {children}
        </chatContext.Provider>
    )
}


export const userChatContext = () => useContext(chatContext)