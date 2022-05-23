export default function validate(values) {
    let errors = {};
    
    console.log(values);
    console.log(/([a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|gif))/i.test(values.image))

    if (!values.title) {
        errors.title = 'Title is required';
    } 
    if (!values.description) {
        errors.description = 'Description is required';
    }
    if(!values.priority)    {
        errors.priority =   'Priority is required.';
    }
    if(!values.startDate)    {
        errors.startDate =   'Start date is required.';
    }
    if(!values.dueDate)    {
        errors.dueDate =   'Due Date is required.';
    }
    return errors;
};
