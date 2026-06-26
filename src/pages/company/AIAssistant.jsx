import { useState } from "react";
import api from "../../services/api";

function AIAssistant() {

    const [question, setQuestion] = useState("");

    const [messages, setMessages] = useState([]);

    const [loading, setLoading] = useState(false);

    const companyId =
        localStorage.getItem("tenant_id");

    const companyName =
        localStorage.getItem("company_name") || "Company";

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

        setLoading(true);

        try {

            const response =
                await api.post(
                    "ai/chat/",
                    {
                        company_id: companyId,
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

        setLoading(false);
    };

    return (

        <div className="min-h-screen bg-gray-100">

            {/* Header */}

            <div className="bg-white shadow-sm p-6">

                <h1 className="text-3xl font-bold">
                    {companyName} Admin AI
                </h1>

                <p className="text-gray-500 mt-2">
                    Business Analytics Assistant
                </p>

            </div>

            {/* Suggestions */}

            <div className="p-6 flex gap-3 flex-wrap">

                <button
                    onClick={() =>
                        setQuestion(
                            "How many orders do we have?"
                        )
                    }
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                    Orders
                </button>

                <button
                    onClick={() =>
                        setQuestion(
                            "What is our revenue?"
                        )
                    }
                    className="bg-green-600 text-white px-4 py-2 rounded-lg"
                >
                    Revenue
                </button>

                <button
                    onClick={() =>
                        setQuestion(
                            "Which product sells most?"
                        )
                    }
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg"
                >
                    Best Seller
                </button>

                <button
                    onClick={() =>
                        setQuestion(
                            "Which product has lowest stock?"
                        )
                    }
                    className="bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                    Stock Alert
                </button>

            </div>

            {/* Chat */}

            <div className="p-6">

                <div className="bg-white rounded-xl shadow p-4 h-[600px] flex flex-col">

                    <div className="flex-1 overflow-y-auto space-y-4">

                        {messages.map((msg, index) => (

                            <div
                                key={index}
                                className={
                                    msg.sender === "user"
                                        ? "text-right"
                                        : "text-left"
                                }
                            >

                                <span
                                    className={
                                        msg.sender === "user"
                                            ? "bg-blue-600 text-white px-4 py-2 rounded-xl inline-block"
                                            : "bg-gray-200 px-4 py-2 rounded-xl inline-block"
                                    }
                                >
                                    {msg.text}
                                </span>

                            </div>

                        ))}

                    </div>

                    <div className="mt-4 flex gap-3">

                        <input
                            type="text"
                            value={question}
                            onChange={(e) =>
                                setQuestion(
                                    e.target.value
                                )
                            }
                            className="flex-1 border rounded-lg px-4 py-3"
                            placeholder="Ask business questions..."
                        />

                        <button
                            onClick={sendMessage}
                            disabled={loading}
                            className="bg-blue-600 text-white px-6 rounded-lg"
                        >
                            Send
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default AIAssistant;