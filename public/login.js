window.addEventListener("load", () => {
  const Loginform = document.querySelector("#loginSub");
  Loginform.addEventListener("click", () => {
    const uname = document.getElementById("uname").value;
    const pass = document.getElementById("pass").value;
    console.log(uname, pass);
    if (uname == "admin") {
      if (pass == "admin") {
        location.href = "/";
      } else {
        const error = document.getElementById("notify");
        error.innerText = "Invalid password!!!";
      }
    }
    else{
        const error = document.getElementById("notify");
        error.innerText = "Invalid Username!!!"     
        }
  });
  console.log("dfgdfgdfgdfg");
});
