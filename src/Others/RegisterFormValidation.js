export default function validate(values) {
    let errors = {};
       

    if(!values.name)    {
        errors.name =   'Name is required.';
    }

    if(!values.confirmPassword) {
        errors.confirmPassword  =   'Confirm Password is required';
    }   else if(values.password != values.confirmPassword)  {
        errors.confirmPassword  =   'Password & COnfirm Password should match.';
    }
    if (!values.email) {
         

      errors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email address is invalid';

       
    }
    if (!values.password) {
      errors.password = 'Password is required';
    } else if (values.password.length < 8) {
      errors.password = 'Password must be 8 or more characters';
    }
    return errors;
  };
  