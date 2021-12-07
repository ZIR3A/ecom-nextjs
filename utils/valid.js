function validateEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

const valid = (name, email, password, cf_password) => {
  if (!name || !email || !password) return "All fields are required";
  if (!validateEmail(email)) return "Invalid email";
  if (password.length < 6) return "Password must at least 6 characters";
  if (password !== cf_password) return "Password doesn't match";
};

export default valid;
