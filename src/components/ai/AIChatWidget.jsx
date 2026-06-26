// import { useState, useEffect, useRef } from "react";
// import api from "../../services/api";
// import { getChatHistory } from "../../services/aiService";

// function AIAssistantPage() {
//     const companyId = localStorage.getItem("tenant_id");
//     const companyName = localStorage.getItem("company_name") || "Company";

//     const [question, setQuestion] = useState("");
//     const [messages, setMessages] = useState([]);
//     const messagesEndRef = useRef(null);

//     useEffect(() => {
//         loadHistory();
//     }, []);

//     useEffect(() => {
//         messagesEndRef.current?.scrollIntoView({
//             behavior: "smooth"
//         });
//     }, [messages]);

//     const loadHistory = async () => {
//         try {
//             const data = await getChatHistory(companyId);
//             const formatted = data.reverse().flatMap(item => [
//                 { sender: "user", text: item.question },
//                 { sender: "ai", text: item.answer }
//             ]);
//             setMessages(formatted);
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     const sendMessage = async (text = question) => {
//         if (!text.trim()) return;

//         // Add user message instantly
//         setMessages(prev => [...prev, { sender: "user", text }]);
//         setQuestion(""); // Clear input

//         try {
//             const response = await api.post("ai/chat/", {
//                 company_id: companyId,
//                 question: text
//             });

//             // Add AI response
//             setMessages(prev => [...prev, { sender: "ai", text: response.data.answer }]);
//         } catch {
//             setMessages(prev => [...prev, { sender: "ai", text: "AI service unavailable" }]);
//         }
//     };

//     return (
//         /* w-screen, h-screen, and overflow-hidden prevent the whole page from scrolling */
//         <div className="w-screen h-screen bg-black flex flex-col overflow-hidden font-sans text-white relative">
            
//             {/* INJECTED CUSTOM ANIMATIONS & SCROLLBAR */}
//             <style>
//                 {`
//                     @keyframes flyInRight {
//                         0% { opacity: 0; transform: translateX(50px) scale(0.95); }
//                         100% { opacity: 1; transform: translateX(0) scale(1); }
//                     }
//                     @keyframes popInLeft {
//                         0% { opacity: 0; transform: translateX(-50px) scale(0.95); }
//                         100% { opacity: 1; transform: translateX(0) scale(1); }
//                     }
//                     .animate-user-msg { animation: flyInRight 0.4s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
//                     .animate-ai-msg { animation: popInLeft 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
                    
//                     /* Dark RGB Scrollbar */
//                     .chat-scroll::-webkit-scrollbar { width: 6px; }
//                     .chat-scroll::-webkit-scrollbar-track { background: #000; }
//                     .chat-scroll::-webkit-scrollbar-thumb { background: #27272a; border-radius: 10px; }
//                     .chat-scroll::-webkit-scrollbar-thumb:hover { background: rgb(0,255,0); }
//                 `}
//             </style>

//             {/* Ambient Background Glows */}
//             <div className="absolute top-0 left-0 w-[30rem] h-[30rem] bg-[rgb(0,255,0)] rounded-full mix-blend-screen filter blur-[200px] opacity-[0.03] pointer-events-none"></div>
//             <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-[rgb(0,0,255)] rounded-full mix-blend-screen filter blur-[200px] opacity-[0.03] pointer-events-none"></div>

//             {/* HEADER */}
//             <div className="h-24 bg-black border-b border-zinc-800 flex items-center px-8 shadow-[0_0_20px_rgba(0,255,0,0.05)] relative z-10 shrink-0">
//                 <div className="w-14 h-14 rounded-full bg-zinc-900 border border-[rgb(0,255,0)] flex items-center justify-center text-[rgb(0,255,0)] font-extrabold text-xl shadow-[0_0_15px_rgba(0,255,0,0.2)]">
//                     AI
//                 </div>
//                 <div className="ml-4">
//                     <p className="text-xs tracking-widest uppercase text-zinc-500 font-bold mb-1">
//                         Secure Connection
//                     </p>
//                     <h1 className="text-3xl font-extrabold tracking-wide drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
//                         {companyName} <span className="text-[rgb(0,255,0)]">AI</span>
//                     </h1>
//                 </div>
//             </div>

//             {/* QUICK QUESTIONS */}
//             <div className="p-4 border-b border-zinc-900 flex flex-wrap gap-3 bg-black relative z-10 shrink-0">
//                 {[
//                     { label: "Products", text: "What products do you have?", color: "rgb(0,255,0)" },
//                     { label: "Recommend", text: "Recommend a product", color: "rgb(0,0,255)" },
//                     { label: "Cheapest", text: "What is the cheapest product?", color: "rgb(255,0,0)" },
//                     { label: "Orders", text: "Show my previous orders", color: "rgb(0,255,0)" }
//                 ].map((btn, idx) => (
//                     <button
//                         key={idx}
//                         onClick={() => sendMessage(btn.text)}
//                         className="px-5 py-2 rounded-full border border-zinc-700 bg-black text-white text-sm font-bold tracking-widest uppercase hover:text-black hover:border-transparent transition-all duration-300 hover:shadow-[0_0_15px_currentColor] active:scale-95"
//                         style={{ '--tw-hover-bg': btn.color, '--tw-shadow-color': btn.color }}
//                         onMouseEnter={(e) => e.currentTarget.style.backgroundColor = btn.color}
//                         onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
//                     >
//                         {btn.label}
//                     </button>
//                 ))}
//             </div>

//             {/* CHAT AREA (Scrollable) */}
//             <div className="flex-1 overflow-y-auto chat-scroll bg-black p-6 relative">
//                 <div className="max-w-5xl mx-auto space-y-6 pb-4">
                    
//                     {messages.length === 0 && (
//                         <div className="text-center mt-32 text-zinc-600">
//                             <h2 className="text-5xl font-extrabold mb-4 tracking-widest drop-shadow-[0_0_15px_rgba(255,255,255,0.05)]">
//                                 SYSTEM READY
//                             </h2>
//                             <p className="uppercase tracking-widest text-sm font-bold">
//                                 Awaiting query input regarding products, orders, or stock.
//                             </p>
//                         </div>
//                     )}

//                     {messages.map((message, index) => (
//                         <div
//                             key={index}
//                             className={`flex w-full ${message.sender === "user" ? "justify-end" : "justify-start"}`}
//                         >
//                             <div
//                                 className={`
//                                     px-6 py-4 rounded-[2rem] max-w-[75%] shadow-lg leading-relaxed
//                                     ${message.sender === "user" 
//                                         ? "bg-black border border-[rgb(0,255,0)] text-white rounded-br-sm animate-user-msg shadow-[0_0_15px_rgba(0,255,0,0.15)]" 
//                                         : "bg-zinc-900 border border-zinc-800 text-zinc-300 rounded-tl-sm animate-ai-msg shadow-[0_0_15px_rgba(255,255,255,0.05)]"
//                                     }
//                                 `}
//                             >
//                                 {message.text}
//                             </div>
//                         </div>
//                     ))}
                    
//                     {/* Dummy div to scroll to bottom */}
//                     <div ref={messagesEndRef} className="h-1"></div>
//                 </div>
//             </div>

//             {/* INPUT AREA */}
//             <div className="border-t border-zinc-800 bg-black p-5 relative z-10 shrink-0">
//                 <div className="flex gap-4 max-w-5xl mx-auto relative group">
                    
//                     {/* RGB Glowing Wrap for Input */}
//                     <div className="flex-1 relative rounded-full p-[1px] bg-zinc-800 focus-within:bg-gradient-to-r focus-within:from-[rgb(255,0,0)] focus-within:via-[rgb(0,255,0)] focus-within:to-[rgb(0,0,255)] transition-all duration-300">
//                         <input
//                             type="text"
//                             value={question}
//                             onChange={(e) => setQuestion(e.target.value)}
//                             onKeyDown={(e) => {
//                                 if (e.key === "Enter") {
//                                     sendMessage();
//                                 }
//                             }}
//                             placeholder="Execute command or ask query..."
//                             className="w-full h-full bg-black rounded-full px-6 py-4 outline-none text-white placeholder-zinc-600"
//                         />
//                     </div>

//                     <button
//                         onClick={() => sendMessage()}
//                         className="bg-transparent border border-[rgb(0,255,0)] text-[rgb(0,255,0)] px-10 rounded-full font-bold tracking-widest uppercase hover:bg-[rgb(0,255,0)] hover:text-black hover:shadow-[0_0_25px_rgba(0,255,0,0.6)] transition-all duration-300 active:scale-90"
//                     >
//                         Send
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default AIAssistantPage;

import { useState, useEffect, useRef } from "react";
import api from "../../services/api";
import { getChatHistory } from "../../services/aiService";

function AIAssistantPage() {
    const companyId = localStorage.getItem("tenant_id");
    const companyName = localStorage.getItem("company_name") || "Company";

    const [question, setQuestion] = useState("");
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        loadHistory();
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth"
        });
    }, [messages]);

    const loadHistory = async () => {
        try {
            const data = await getChatHistory(companyId);
            const formatted = data.reverse().flatMap(item => [
                { sender: "user", text: item.question },
                { sender: "ai", text: item.answer }
            ]);
            setMessages(formatted);
        } catch (error) {
            console.log(error);
        }
    };

    const sendMessage = async (text = question) => {
        if (!text.trim()) return;

        // Add user message instantly
        setMessages(prev => [...prev, { sender: "user", text }]);
        setQuestion(""); // Clear input

        try {
            const response = await api.post("ai/chat/", {
                company_id: companyId,
                question: text
            });

            // Add AI response
            setMessages(prev => [...prev, { sender: "ai", text: response.data.answer }]);
        } catch {
            setMessages(prev => [...prev, { sender: "ai", text: "AI service unavailable" }]);
        }
    };

    return (
        /* FIXED INSET-0: Pins the app to the exact screen edges. 
           This permanently disables window scrolling. 
        */
        <div className="fixed inset-0 bg-black flex flex-col font-sans text-white overflow-hidden z-50">
            
            {/* INJECTED CUSTOM ANIMATIONS & SCROLLBAR */}
            <style>
                {`
                    @keyframes flyInRight {
                        0% { opacity: 0; transform: translateX(50px) scale(0.95); }
                        100% { opacity: 1; transform: translateX(0) scale(1); }
                    }
                    @keyframes popInLeft {
                        0% { opacity: 0; transform: translateX(-50px) scale(0.95); }
                        100% { opacity: 1; transform: translateX(0) scale(1); }
                    }
                    .animate-user-msg { animation: flyInRight 0.4s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
                    .animate-ai-msg { animation: popInLeft 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
                    
                    /* Dark RGB Scrollbar */
                    .chat-scroll::-webkit-scrollbar { width: 6px; }
                    .chat-scroll::-webkit-scrollbar-track { background: #000; }
                    .chat-scroll::-webkit-scrollbar-thumb { background: #27272a; border-radius: 10px; }
                    .chat-scroll::-webkit-scrollbar-thumb:hover { background: rgb(0,255,0); }
                `}
            </style>

            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-0 w-[30rem] h-[30rem] bg-[rgb(0,255,0)] rounded-full mix-blend-screen filter blur-[200px] opacity-[0.03] pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-[rgb(0,0,255)] rounded-full mix-blend-screen filter blur-[200px] opacity-[0.03] pointer-events-none"></div>

            {/* HEADER (shrink-0 prevents it from squishing) */}
            <div className="shrink-0 h-24 bg-black border-b border-zinc-800 flex items-center px-8 shadow-[0_0_20px_rgba(0,255,0,0.05)] relative z-10">
                <div className="w-14 h-14 rounded-full bg-zinc-900 border border-[rgb(0,255,0)] flex items-center justify-center text-[rgb(0,255,0)] font-extrabold text-xl shadow-[0_0_15px_rgba(0,255,0,0.2)]">
                    AI
                </div>
                <div className="ml-4">
                    <p className="text-xs tracking-widest uppercase text-zinc-500 font-bold mb-1">
                        Secure Connection
                    </p>
                    <h1 className="text-3xl font-extrabold tracking-wide drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                        {companyName} <span className="text-[rgb(0,255,0)]">AI</span>
                    </h1>
                </div>
            </div>

            {/* QUICK QUESTIONS (shrink-0) */}
            <div className="shrink-0 p-4 border-b border-zinc-900 flex flex-wrap gap-3 bg-black relative z-10">
                {[
                    { label: "Products", text: "What products do you have?", color: "rgb(0,255,0)" },
                    { label: "Recommend", text: "Recommend a product", color: "rgb(0,0,255)" },
                    { label: "Cheapest", text: "What is the cheapest product?", color: "rgb(255,0,0)" },
                    { label: "Orders", text: "Show my previous orders", color: "rgb(0,255,0)" }
                ].map((btn, idx) => (
                    <button
                        key={idx}
                        onClick={() => sendMessage(btn.text)}
                        className="px-5 py-2 rounded-full border border-zinc-700 bg-black text-white text-sm font-bold tracking-widest uppercase hover:text-black hover:border-transparent transition-all duration-300 hover:shadow-[0_0_15px_currentColor] active:scale-95 cursor-pointer"
                        style={{ '--tw-hover-bg': btn.color, '--tw-shadow-color': btn.color }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = btn.color}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                        {btn.label}
                    </button>
                ))}
            </div>

            {/* CHAT AREA (flex-1 and min-h-0 make it perfectly scrollable without breaking layout) */}
            <div className="flex-1 min-h-0 overflow-y-auto chat-scroll bg-black p-6 relative">
                <div className="max-w-5xl mx-auto space-y-6 pb-4">
                    
                    {messages.length === 0 && (
                        <div className="text-center mt-32 text-zinc-600">
                            <h2 className="text-5xl font-extrabold mb-4 tracking-widest drop-shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                                SYSTEM READY
                            </h2>
                            <p className="uppercase tracking-widest text-sm font-bold">
                                Awaiting query input regarding products, orders, or stock.
                            </p>
                        </div>
                    )}

                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`flex w-full ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                        >
                            <div
                                className={`
                                    px-6 py-4 rounded-[2rem] max-w-[75%] shadow-lg leading-relaxed
                                    ${message.sender === "user" 
                                        ? "bg-black border border-[rgb(0,255,0)] text-white rounded-br-sm animate-user-msg shadow-[0_0_15px_rgba(0,255,0,0.15)]" 
                                        : "bg-zinc-900 border border-zinc-800 text-zinc-300 rounded-tl-sm animate-ai-msg shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                                    }
                                `}
                            >
                                {message.text}
                            </div>
                        </div>
                    ))}
                    
                    {/* Invisible div to scroll to bottom */}
                    <div ref={messagesEndRef} className="h-1"></div>
                </div>
            </div>

            {/* INPUT AREA (shrink-0) */}
            <div className="shrink-0 border-t border-zinc-800 bg-black p-5 relative z-10">
                <div className="flex gap-4 max-w-5xl mx-auto relative group">
                    
                    {/* RGB Glowing Wrap for Input */}
                    <div className="flex-1 relative rounded-full p-[1px] bg-zinc-800 focus-within:bg-gradient-to-r focus-within:from-[rgb(255,0,0)] focus-within:via-[rgb(0,255,0)] focus-within:to-[rgb(0,0,255)] transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                        <input
                            type="text"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    sendMessage();
                                }
                            }}
                            placeholder="Execute command or ask query..."
                            className="w-full h-full bg-black rounded-full px-6 py-4 outline-none text-white placeholder-zinc-600 transition-colors"
                        />
                    </div>

                    <button
                        onClick={() => sendMessage()}
                        className="bg-transparent border border-[rgb(0,255,0)] text-[rgb(0,255,0)] px-10 rounded-full font-bold tracking-widest uppercase hover:bg-[rgb(0,255,0)] hover:text-black hover:shadow-[0_0_25px_rgba(0,255,0,0.6)] transition-all duration-300 active:scale-90 cursor-pointer"
                    >
                        Send
                    </button>
                </div>
            </div>

        </div>
    );
}

export default AIAssistantPage;