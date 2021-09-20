//Validation for email
export const validateEmail = (email) => {
  try{
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email.toLowerCase());
  }
  catch(err){
    console.log(err);
    return false; 
  }
}

// Validation for Contact Number
export const validateContact = (contactNo) => {
  try{
    const contactRegex = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
    return contactRegex.test(contactNo);
  }
  catch(err){
    console.log(err);
    return false; 
  }
}