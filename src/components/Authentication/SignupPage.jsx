import { useForm } from "react-hook-form";
import React, { useState } from 'react';
import {z} from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "./SignupPage.css";
import user from "../../assets/user.webp";
import { getUser, signup } from "../../Services/userServices";
import { Navigate } from "react-router-dom";


let first_login_date1 ;
const schema = z.object({
    name: z.string().min(3,{message: "Name must be at least 3 characters long"}),
    email: z.string().email({message: "Please enter a valid email address"}),
    password: z.string().min(3,{message: "Password must be at least 3 characters long"}),
    account: z.string().min(1, { message: "Please select an account type" }),
    confirmPassword: z.string().min(3,{message: "Confirm Password must be at least 3 characters long"}),
    deliveryAddress: z.string().min(5,{message: "Delivery Address must be at least 5 characters long"})
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
});

const SignupPage = () => {
    const [profilePic, setProfilePic] = useState(null);
    const [formError, setFormError] = useState("");
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema)
    });
    const onSubmit = async (formData) => {

             first_login_date1 = new Date().toISOString();
            console.log("Form Data Submitted: ", first_login_date1);
        try{
            await signup(formData, profilePic);
           window.location = "/";
        }
        catch (err) {
            if (err.response && err.response.status === 400) {
                setFormError(err.response.data.message);
            }
        } 

   
    };
     if (getUser()) {
            return <Navigate to="/" />
        }
    
    return (
        <section className='align_center form_page'>
            <form className='authentication_form signup_form' 
            onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
               
                <h2>SignUp Form</h2>

                <div className='image_input_section'>
                    <div className='image_preview'>
                        <img src={profilePic ? URL.createObjectURL(profilePic) : user} id='file-ip-1-preview' />
                    </div>
                    <label htmlFor='file-ip-1' className='image_label'>
                        Upload Image
                    </label>
                    <input type='file' id='file-ip-1' className='image_input' onChange={(e) => setProfilePic(e.target.files[0])} />
                </div>

                {/* Form Inputs */}
                <div className='form_inputs signup_form_input'>
                    <div>
                        <label htmlFor='name'>Name</label>
                        <input
                            id='name'
                            className='form_text_input'
                            type='text'
                            placeholder='Enter your name'
                            {...register("name")}
                        />
                        {errors.name && <em className='form_error'>{errors.name.message}</em>}
                    </div>

                    <div>
                        <label htmlFor='email'>Email</label>
                        <input
                            id='email'
                            className='form_text_input'
                            type='email'
                            placeholder='Enter your email address'
                            {...register("email")}
                        />
                        {errors.email && <em className='form_error'>{errors.email.message}</em>}
                    </div>

                    <div>
                        <label htmlFor='password'>Password</label>
                        <input
                            id='password'
                            className='form_text_input'
                            type='password'
                            placeholder='Enter your password'
                            {...register("password")}
                        />
                        {errors.password && <em className='form_error'>{errors.password.message}</em>}
                    </div>

                    <div>
                        <label htmlFor='cpassword'>Confirm Password</label>
                        <input
                            id='cpassword'
                            className='form_text_input'
                            type='password'
                            placeholder='Enter confirm password'
                            {...register("confirmPassword")}
                        />
                        {errors.confirmPassword && <em className='form_error'>{errors.confirmPassword.message}</em>}
                    </div>

                    <div>
                        <label htmlFor='account'>Account</label>                        
                        <select id="account" className="form_text_input" {...register("account")}>
                        <option value="">-- Choose Plan --</option>
                        <option value="basic">Basic</option>
                        <option value="standard">Standard</option>
                        <option value="premium">Premium</option>
                        <option value="enterprise">Enterprise</option>
                    </select>
                        {errors.account && <em className='form_error'>{errors.account.message}</em>}
                    </div>

                    <div className='signup_textares_section'>
                        <label htmlFor='address'>Delivery Address</label>
                        <textarea
                            id='address'
                            className='input_textarea'
                            placeholder='Enter delivery address'
                            {...register("deliveryAddress")}
                        />
                        {errors.deliveryAddress && <em className='form_error'>{errors.deliveryAddress.message}</em>}
                    </div>
                </div>
                {formError && <em className='form_error'>{formError}</em>}
                <button className='search_button form_submit' onClick={handleSubmit(onSubmit)} type='submit'>
                    Submit
                </button>
            </form>
        </section>
    );
};

export default SignupPage;

// name - Name should be at least 3 characters.
// email - Please enter valid email
// password - Password must be at least 8 characters.
// confirmPassword - Confirm Password does not match Password
// account - Please select an account type.
// deliveryAddress - Address must be at least 15 characters.
