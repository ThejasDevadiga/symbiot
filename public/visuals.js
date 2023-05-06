window.addEventListener("load",async()=>{ 
    const canvas1 = document.getElementById('canvas1');
        const canvas2 = document.getElementById('canvas2');

    new Chart(canvas2, {
      type: 'bar',
      data: {
      
        labels: ['27 Apr', '28 Apr', '29 Apr', '30 Apr', '01 May', '02 May','03 May', '04 May', '05 May', '06 May'],
        datasets: [{
          label: 'Income amount',
          data: [3500,2500,6080,9020,2000,1000,5030,9020,3010,4202],
          borderWidth: 1,
        //   borderColor: 'blue',
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }, 
        responsive: true,
        maintainAspectRatio: false,
      }
    })
    
 

      
    // -----------------------------------------
    
    
      
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
    const billData =await  loadData(raw,"http://localhost:5000/bills","GET");
   console.log(billData);

   const startDate = new Date("2023-05-01T00:00:00.000Z");
   const endDate = new Date("2023-05-10T23:59:59.999Z");
   
   const dates = [];
   const amounts = [];
   
   for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
       const day = d.getDate().toString().padStart(2, '0');
       const month = (d.getMonth() + 1).toString().padStart(2, '0');
       dates.push(`${day} May`);
       const amount = billData.filter(item => item.date.startsWith(`2023-05-${day}`)).reduce((acc, item) => acc + item.Amount, 0);
       amounts.push(amount);
   }
   
   console.log(dates); 
   console.log(amounts);
   new Chart(canvas1, {
    type: 'line',
    data: {
    
      labels: dates,
      datasets: [{
        label: 'Amount spent',
        data: amounts,
        borderWidth: 1,
        borderColor: 'red',
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }, 
      responsive: true,
      maintainAspectRatio: false,
    }
  })

    
  })