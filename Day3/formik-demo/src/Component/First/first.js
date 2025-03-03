import React from 'react';

import { Formik, Field, Form } from 'formik';



 import './first.css'
const First = () => (
<div>
<h1>Sign Up</h1>
<Formik initialValues={
    {
        empno : 0,
        firstName: '',
        lastName : '',
        email : '',
        salary : 0
    }
}

    onSubmit = {async (values) => {
        alert("Employ No  " +values.empno + " First Name " +values.firstName
                + " Last Name " +values.lastName + " Email " +values.email + 
                " Salary " +values.salary

        );
    }}

>
<Form>
<label htmlFor='empno'>Employ No</label>
<Field id="empno" name="empno" placeholder="Please Enter Employ No  " /> <br/><br/>
<label htmlFor="firstName">First Name</label>
<Field id="firstName" name="firstName" placeholder="Please Enter FirstName" />
<br/><br/>
<label htmlFor='lastName'>Last Name</label> 
<Field id="lastName" name="lastName" placeholder="Please Enter LastName" /> 
<br/><br/>
<label htmlFor='email'>Email</label>
<Field id="email" name="email" placeholder="Please Enter Email" /> <br/><br/>
<label htmlFor='salary'>Salary</label> 
<Field id="salary" name="salary" placeholder="Please Enter Salary" /> <br/><br/>
<button type="submit">Submit</button>
</Form>
</Formik>
</div>
);
export default First;