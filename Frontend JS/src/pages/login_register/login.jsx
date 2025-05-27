import { useState } from "react"
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate()
  const endPoint = "http://localhost:3001/login"
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(endPoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data[0].payload.data){
        const role = data[0].payload.data.role
        navigate('/home')
      }

      setFormData({
        email: "",
        password: ""
      });
    } 
    catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  return (
    <>
      <form onSubmit={handleLogin} className="d-flex justify-content-center align-items-sm-center p-2" style={{ height: '92vh' }}>
        <div className="d-flex flex-column gap-3 col-12 col-sm-3 p-sm-2" >
          <div className="">
            <label className="form-label">Email Address</label>
            <input value={formData.email} onChange={handleChange} name="email" type="email" className="form-control" required />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="">
            <label className="form-label">Password</label>
            <input value={formData.password} onChange={handleChange} name="password" type="password" className="form-control" required />
          </div> 
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </div>
      </form>
    </>
  )
}

export default Login