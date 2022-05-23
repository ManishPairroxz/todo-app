export default function validate(values) {
    let errors = {};
    
    console.log(values);
    console.log(/([a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|gif))/i.test(values.image))

    if (!values.name) {
        errors.name = 'Name is required';
    } 
    if (!values.image) {
        errors.image = 'Image is required';
    } else if (!/([a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|gif))/i.test(values.image)) {
        errors.image = 'Image must be JPG,JPEG,PNG,GIF';
    }
    return errors;
};
