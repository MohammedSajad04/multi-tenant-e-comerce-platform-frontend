import AIChatWidget from "../../components/ai/AIChatWidget";

function AIAssistantPage() {

    return (

        <div className="min-h-screen bg-black text-white">

            <h1 className="text-4xl p-10">
                AI Assistant
            </h1>

            <AIChatWidget />

        </div>

    );
}

export default AIAssistantPage;