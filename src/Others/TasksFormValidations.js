export default function validate(values) {
    let errors = {};

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
