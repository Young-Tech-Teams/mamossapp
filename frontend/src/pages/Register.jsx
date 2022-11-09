import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import styled from 'styled-components';
import AuthService from "../utils/auth.service";

const Register = () => {
   const navigate = useNavigate();
   const [values, setValues] = useState({
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
      if (localStorage.getItem("token")) {
        navigate("/")
      }
   }, []);

   const handleSubmit = async (e) => {
      e.preventDefault();

      if (handleValidation()) {
         const { email, password, confirmPassword } = values;
         const { data } = await AuthService.register(email, password, confirmPassword).then(
            (response) => {
               console.log(response.data.message);
               setTimeout(() => {
                  navigate("/connexion")
               }, 500)
            },
         );
      }
   };

   const handleValidation = () => {
      const { email, password, confirmPassword } = values;
      if (password !== confirmPassword) {
         toast.error(
            "The password and confirm password do not match", 
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
                     <BrandName>S'inscrire</BrandName>
                  </Brand>
                  <Input 
                     type="email" 
                     placeholder="Email" 
                     name="email"
                     autoComplete="off" 
                     onChange={(e) => handleChange(e)}
                     />
                  <Input 
                     type="password" 
                     placeholder="Mot de passe" 
                     name="password" 
                     onChange={(e) => handleChange(e)}
                     />
                  <Input 
                     type="password" 
                     placeholder="Confirmer le mot de passe" 
                     name="confirmPassword" 
                     onChange={(e) => handleChange(e)}
                  />
                  <Button type="submit">Valider</Button>
                  <Account className="account">
                     <Span>
                        Déjà inscrit ?
                        <Space></Space>
                        <Link to="/connexion">Connectez-vous</Link>
                     </Span>
                  </Account>
               </Form>
            </FormContainer>
            <ToastContainer />
         </RegisterSection>
      </>
  )
}

const RegisterSection = styled.section``
const FormContainer = styled.div``
const Form = styled.form``
const Brand = styled.div``
const BrandName = styled.h1``
const Input = styled.input``
const Button = styled.button``
const Account = styled.div``
const Span = styled.span``
const Space = styled.br``

export default Register