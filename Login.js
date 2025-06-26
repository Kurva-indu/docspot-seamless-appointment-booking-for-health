localStorage.setItem("token", res.data.token);
localStorage.setItem("userType", res.data.isDoctor ? "doctor" : "user");

