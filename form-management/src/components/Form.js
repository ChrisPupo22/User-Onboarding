import React from 'react';
import Axios from 'axios';
import { Form, Field, withFormik, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const UserForm = ({touched, errors}) => {
    return(
        <div className='user-form'>
            <h1>Please update you information here!</h1>
                <Form>
                    <Field className='name-input' type='text' name='name' placeholder='Name' />
                    {touched.name && errors.name && <p className='error'>Please type in your name</p>}

                    <Field className='email-input' type='text' name='email' placeholder='Email' />
                    {touched.email && errors.email && <p className='error'>Please type in your email</p>}

                    <Field className='password-input' type='text' name='password' placeholder='Password' />
                    {touched.password && errors.password && <p className='error'>Password is a required field!</p>}

                    <p className='tos-instructions' >Please agree to our terms of service here!</p>
                    <Field className='checkbox-input' type='checkbox' name='TOS'></Field>

                <button>Submit Info!</button>
                </Form>
        </div>
    )
};

const FormikUserForm = withFormik({
    mapPropsToValues({name, email, password}){
        return{
            name: name || '',
            email: email || '',
            password: password || ''
        }
    },
    validationSchema: Yup.object().shape({
        name:Yup.string().required(),
        email:Yup.string().required(),
        password:Yup.string().required()
    }),
    handleSubmit(values) {
        console.log('form submitted', values);
        Axios.post('https://reqres.in/api/users/', values)
            .then(res => console.log(res))
            .catch(err => console.log(err.response));
    }
})(UserForm);

export default FormikUserForm; 