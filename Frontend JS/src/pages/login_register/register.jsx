import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const endPoint = "http://localhost:3001/users";
    const [formData, setFormData] = useState({
        name: "",
        createPassword: "",
        confirmPassword: "",
        password: "",  // Will be assigned after validation
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, createPassword, confirmPassword, role } = formData;

        if (createPassword !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        const finalData = {
            name,
            password: createPassword, // validated
        };

        try {
            const res = await fetch(endPoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(finalData)
            });

            if (res.ok) {
                alert("Registration successful!");
                navigate("/login");
            } else {
                alert("Registration failed.");
            }
        } catch (err) {
            console.error("Error during registration:", err);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="d-flex justify-content-center align-items-sm-center p-2" style={{ height: '92vh' }}>
                <div className="d-flex flex-column col-12 col-sm-3 p-sm-2">
                    <h3>Sign Up</h3>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input placeholder="Jonh Doe" onChange={handleChange} name="name" type="text" className="form-control" required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Create Password</label>
                        <input onChange={handleChange} name="createPassword" type="password" className="form-control" required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Confirm Password</label>
                        <input onChange={handleChange} name="confirmPassword" type="password" className="form-control" required />
                    </div>
                    <button type="submit" className="btn btn-primary">Sign Up</button>
                    <span>Have an account? <a href="/login">Sign in here</a></span>
                </div>
            </form>
        </>
    );
};

export default Register;
