import { useState, useEffect } from "react";
import api from "../../services/api";
import {
    askAI,
    getChatHistory
} from "../../services/aiService";


function AIChatWidget() {

    const [open, setOpen] = useState(false);

    const [question, setQuestion] = useState("");

    const [messages, setMessages] = useState([]);

    const sendMessage = async () => {

        if (!question.trim()) return;

        const userMessage = {
            sender: "user",
            text: question
        };

        setMessages(prev => [
            ...prev,
            userMessage
        ]);

        try {

            const tenantId =
                localStorage.getItem(
                    "tenant_id"
                );

            const response =
                await api.post(
                    "ai/chat/",
                    {
                        company_id: tenantId,
                        question: question
                    }
                );

            setMessages(prev => [
                ...prev,
                {
                    sender: "ai",
                    text: response.data.answer
                }
            ]);

        } catch (error) {

            console.log(error);

            setMessages(prev => [
                ...prev,
                {
                    sender: "ai",
                    text: "AI service unavailable"
                }
            ]);
        }

        setQuestion("");
    };

    useEffect(() => {

    loadHistory();

}, []);

const loadHistory = async () => {

    try {

        const data = await getChatHistory(
            companyId
        );

        const formatted = data.reverse().flatMap(
            item => [
                {
                    sender: "user",
                    text: item.question
                },
                {
                    sender: "ai",
                    text: item.answer
                }
            ]
        );

        setMessages(
            formatted
        );

    } catch (error) {

        console.log(error);
    }
};


    return (
        <>
            {/* Floating Button */}

            <button
                onClick={() =>
                    setOpen(!open)
                }
                className="
                fixed
                bottom-8
                right-8
                z-50
                bg-black
                text-white
                w-16
                h-16
                rounded-full
                shadow-2xl
                text-2xl
                hover:scale-110
                transition
                "
            >
                🤖
            </button>

            {/* Chat Window */}

            {open && (

                <div
                    className="
                    fixed
                    bottom-28
                    right-8
                    w-[380px]
                    h-[550px]
                    bg-white
                    rounded-2xl
                    shadow-2xl
                    flex
                    flex-col
                    overflow-hidden
                    z-50
                    "
                >

                    {/* Header */}

                    <div
                        className="
                        bg-black
                        text-white
                        p-4
                        font-bold
                        text-lg
                        "
                    >
                        {localStorage.getItem(
                            "company_name"
                        )} AI Assistant
                    </div>

                    {/* Messages */}

                    <div
                        className="
                        flex-1
                        overflow-y-auto
                        p-4
                        space-y-3
                        "
                    >

                        {messages.map(
                            (
                                message,
                                index
                            ) => (

                                <div
                                    key={index}
                                    className={
                                        message.sender === "user"
                                            ? "text-right"
                                            : "text-left"
                                    }
                                >

                                    <span
                                        className={
                                            message.sender === "user"
                                                ? "bg-black text-white px-4 py-2 rounded-xl inline-block"
                                                : "bg-gray-200 text-black px-4 py-2 rounded-xl inline-block"
                                        }
                                    >
                                        {
                                            message.text
                                        }
                                    </span>

                                </div>
                            )
                        )}

                    </div>

                    {/* Input */}

                    <div
                        className="
                        p-3
                        border-t
                        flex
                        gap-2
                        "
                    >

                        <input
                            type="text"
                            value={question}
                            onChange={(e) =>
                                setQuestion(
                                    e.target.value
                                )
                            }
                            placeholder="Ask AI..."
                            className="
                            flex-1
                            border
                            rounded-lg
                            px-3
                            py-2
                            "
                        />

                        <button
                            onClick={
                                sendMessage
                            }
                            className="
                            bg-black
                            text-white
                            px-4
                            rounded-lg
                            "
                        >
                            Send
                        </button>

                    </div>

                </div>
            )}
        </>
    );
}

export default AIChatWidget;