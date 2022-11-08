import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { registerRoute } from '../utils/APIRoutes';
import { 
   RegisterSection,
   FormContainer,
   Form,
   Brand,
   BrandName,
   Input,
   Button,
   Account,
   Span,
   Space
} from '../components/StyledElements'

const Register = () => {
   const navigate = useNavigate();
   const [values, setValues] = useState({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
   });

   const toastOptions = {
      position: "bottom-right",
      autoClose: 8000,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
   };

   useEffect(() => {
      if (localStorage.getItem("miyuchat-user")) {
        navigate("/")
      }
   }, []);

   const handleSubmit = async (e) => {
      e.preventDefault();
      if (handleValidation()) {
         const { username, email, password } = values;
         const { data } = await axios.post(registerRoute, {
            username,
            email,
            password, 
         });
         if (data.status === false) {
            toast.error(data.msg, toastOptions);
         }
         if (data.status === true) {
            localStorage.setItem('miyuchat-user', JSON.stringify(data.user));
            navigate("/");
         }
      }
   };

   const handleValidation = () => {
      const { password, confirmPassword, username, email } = values;
      if (password !== confirmPassword) {
         toast.error(
            "The password and confirm password do not match", 
            toastOptions
        ); 
         return false;
      } else if (username.length < 3) {
         toast.error(
            "Username should be at least 3 characters", 
            toastOptions 
        );
         return false;
      } else if (username.length > 22) {
         toast.error(
            "Username should not exceed 22 characters",
            toastOptions 
        );
         return false;
      } else if (password.length < 8) {
         toast.error(
            "Password should be at least 8 characters", 
            toastOptions 
        );
         return false;
      } else if (password.length > 24) {
         toast.error(
            "Password should not exceed 24 characters", 
            toastOptions 
        );
         return false;
      } else if (email === "") {
         toast.error(
            "The email is required",
            toastOptions 
        );
         return false;
      }
      return true;
   };

   const handleChange = (e) => {
      setValues({ ...values, [e.target.name]: e.target.value });
   }

   return (
      <>
         <RegisterSection id="register-section">
            <FormContainer className="form container">
               <Form onSubmit={(e) => handleSubmit(e)}>
                  <Brand className="brand">
                     <BrandName>MiyuChat</BrandName>
                  </Brand>
                  <Input 
                     type="text" 
                     placeholder="Username" 
                     name="username" 
                     autoComplete="off" 
                     onChange={(e) => handleChange(e)}
                     />
                  <Input 
                     type="email" 
                     placeholder="Email" 
                     name="email"
                     autoComplete="off" 
                     onChange={(e) => handleChange(e)}
                     />
                  <Input 
                     type="password" 
                     placeholder="Password" 
                     name="password" 
                     onChange={(e) => handleChange(e)}
                     />
                  <Input 
                     type="password" 
                     placeholder="Confirm Password" 
                     name="confirmPassword" 
                     onChange={(e) => handleChange(e)}
                  />
                  <Button type="submit">Create User</Button>
                  <Account className="account">
                     <Span>
                        Already have an account ? 
                        <Space></Space>
                        <Link to="/login"> Log In</Link>
                     </Span>
                  </Account>
               </Form>
            </FormContainer>
            <ToastContainer />
         </RegisterSection>
      </>
  )
}

export default Register