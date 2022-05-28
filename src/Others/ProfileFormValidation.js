export default function validate(values) {
    let errors = {};
    
      
      

    if (!values.name) {
        errors.name = 'Name is required';
    } 
    if (!values.image) {
        errors.image = 'Image is required';
    } else if (!/(https?:\/\/.*\.(?:png|jpg|jpeg))/i.test(values.image)) {
        errors.image = 'Image must be valid Image URL';
    }
    return errors;
};
