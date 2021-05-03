import axios from "axios";

async function validateEmail(email) {
  const data = await axios.post("/api/auth/email", {
    email,
  });
  var check = data.data.check;
  return check;
}

export default validateEmail;
