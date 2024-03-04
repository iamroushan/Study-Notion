import loginImg from "../assets/images/login.webp"
import Template from "../components/core/Auth/Template"

function login(){
    return (
        <Template
            title="Welcome Back"
            description1 = "Build skills for today, tomorrow, and beyond."
            description2 = "Education to future-proof your career."
            image = {loginImg}
            formType = "login"
        />
    )
}

export default login