window.addEventListener("load", async() => {

const loadData = async(body,url,method)=>{
    var result = await requestor(
      method,
      null,
     url
    );
    const res = JSON.parse(result);
    if(res){
      return res.data
    }
    
    else{
    return []
    }
  }
  var raw = JSON.stringify({ 
    Name:"user1",
    });
  const billData =await  loadData(raw,"http://localhost:8000/data","GET");
 console.log(billData);
 
 
 const billList = document.querySelector("#prod-list");

 var count = 0
 const tbody = billList.querySelector("tbody");
 billData.forEach((bill) => {
   count +=1
   const trEle = document.createElement("tr");
   const td = document.createElement("td");
   td.innerText = count
   trEle.appendChild(td);
   Object.values(bill).forEach((data) => {
     const td = document.createElement("td");
     td.innerText = data;
     trEle.appendChild(td);
   });
   tbody.appendChild(trEle)
 });
})