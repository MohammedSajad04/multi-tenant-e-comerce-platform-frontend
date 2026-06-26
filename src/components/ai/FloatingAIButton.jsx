import { useNavigate } from "react-router-dom";

function FloatingAIButton() {

    const navigate = useNavigate();

    return (

        <button
            onClick={() =>
                navigate("/ai-assistant")
            }
            className="
            fixed
            bottom-8
            right-8
            z-50
            w-16
            h-16
            rounded-full
            bg-black
            text-white
            text-2xl
            shadow-2xl
            hover:scale-110
            transition
            "
        >
            🤖
        </button>

    );
}

export default FloatingAIButton;