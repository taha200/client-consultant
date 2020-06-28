function validation(values) {
    let errors = {};
    // form validation
    if (values.user_name === "") {
      errors.user_name = "User Name is required";
    }
    if (values.email === "") {
      errors.email = "Email is required";
    }
    if (values.password === "") {
        errors.password = "Password is required";
      }
    return errors;
  }
  
  let defaultValues = {
   user_name: "",
   email: "",
   password: ""
  };
  
  export { validation, defaultValues };