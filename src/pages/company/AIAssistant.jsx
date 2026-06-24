import { useState } from "react";
import axios from "axios";

function AIAssistant() {

    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);

    const askAI = async () => {

        try {

            setLoading(true);

            const response = await axios.post(
                "http://localhost:8000/api/ai/chat/",
                {
                    company_id: 1,
                    question: question
                }
            );

            setAnswer(response.data.answer);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);
        }
    };

    return (
        <div>

            <h1>AI Assistant</h1>

            <textarea
                rows="5"
                value={question}
                onChange={(e) =>
                    setQuestion(e.target.value)
                }
            />

            <br />

            <button onClick={askAI}>
                Ask AI
            </button>

            {loading && <p>Thinking...</p>}

            <h3>Answer</h3>

            <p>{answer}</p>

        </div>
    );
}

export default AIAssistant;