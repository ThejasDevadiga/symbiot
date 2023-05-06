window.addEventListener("load", () => {
  const Loginform = document.querySelector("#upldSub");
  Loginform.addEventListener("click", async () => {
    const title = document.getElementById("title").value;
    const amount = document.getElementById("amount").value;
    // var  actamount = amount
    // if(title!='income' || title !='profit'){
    //  var  actamount = (-1) *(amount)
    // }
    
    console.log(title, amount);
    
    var result = await requestor(
      "post",
      JSON.stringify({
        title: title,
        amount: amount,
        name: "user1",
        Date: Date(),
      }),
      "http://localhost:8000/uploadtext"
    );

    if (result) {
      resData = JSON.parse(result);
      console.log(resData);
      if (resData.data != "done") {
        const error = document.getElementById("notify");
        error.style.color = "red";
        error.innerText = "Please try later!";
      } else {
        const error = document.getElementById("notify");
        error.style.color = '#29ff5e'
        error.innerText = "Successfully stored !!";
         document.getElementById("title").value ="";
        document.getElementById("amount").value="";
      }
    }
  });
});

