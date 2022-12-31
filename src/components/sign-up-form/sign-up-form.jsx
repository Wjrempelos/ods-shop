import { useState } from 'react';
import FormInput from '../form-input/form-input';
import { createAuthuserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase';
import './sign-up-form.scss'
import Button from '../button/button';


const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;

    console.log(formFields)

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password != confirmPassword) {
           alert("passwords do not match");
           return;
        } 
        
        try {
            const { user } = await createAuthuserWithEmailAndPassword(
                email,
                password
            );           
            await createUserDocumentFromAuth(user, { displayName });
            resetFormFields();
        } catch(error) {
            if(error.code === 'auth/email-already-in-use'){
                alert('Email already in use, please sign in or create new account');
            } else {
                console.log('user creation encountered an error', error);
            }
        }    
    };

    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value })
    };

    return (
        <div className='sign-up-container'>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label='Display Name'   
                    type='text' 
                    required onChange={handleChange} 
                    name='displayName' 
                    value={displayName} 
                />                
                <FormInput
                    label='Email'   
                    type='email' 
                    required onChange={handleChange} 
                    name='email' 
                    value={email} 
                />
                <FormInput
                    label='Password'   
                    type='password' 
                    required onChange={handleChange} 
                    name='password' 
                    value={password} 
                />
                <FormInput
                    label='Confirm Password'   
                    type='password' 
                    required onChange={handleChange} 
                    name='confirmPassword' 
                    value={confirmPassword} 
                />

                <Button type='submit'> Sign Up </Button>
            </form>
        </div>
    );
};

export default SignUpForm;