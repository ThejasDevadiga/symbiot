const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Invoices = require("./src/models/invoiceList");
const asyncHandler = require("express-async-handler");
const Tesseract = require("tesseract.js");
const GenerateId = require("./src/utils/generateId");
const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb://localhost:27017/symbiot", {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log(`Connected to Database : ${conn.connection.host}`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit();
  }
};
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 400 : res.statusCode;
  console.log(err.message);
  res.status(statusCode).json({ message: err.message, heading: "ERROR FOUND" });
};

connectDB();

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(cors());

console.log(__dirname);
app.use(express.static("public"));
app.get(
  "/percentage",
  asyncHandler(async (req, res) => {
    const result = await Invoices.aggregate([
      {
        $group: {
          _id: { $cond: [{ $gte: ["$Amount", 0] }, "positive", "negative"] },
          totalAmount: { $sum: "$Amount" },
          count: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json({
      data: result,
    });
  })
);

app.get("/data",asyncHandler(async(req,res)=>{
      const result = await Invoices.find({},{date:1,Amount:1,billNo:1,title:1,_id:0})
      res.status(200).json({
        data: result,
      });
}))

app.get(
  "/bills",
  asyncHandler(async (req, res) => {
    const result = await Invoices.find({}, { date: 1, Amount: 1 });
    res.status(200).json({
      data: result,
    });
  })
);
app.get(
  "/extractText/:id/:name",
  asyncHandler(async (req, res) => {
    console.log(req.params.id);
    console.log(req.params.name);
    const Output = {};
    const url =
      "https://res.cloudinary.com/acahscollege/image/upload/" +
      req.params.id +
      "/" +
      req.params.name;
    console.log(url);
    Tesseract.recognize(url, "eng", { logger: (m) => console.log(m) }).then(
      async ({ data: { text } }) => {
        console.log("Final : " + text);
 
        const rupeePattern = /Total: \₹(\d+)/;
        const dolorPattern = /Total: \$(\d+)/;
         const dmyPattern = /Date : (\d{1,2}[-\/]\d{1,2}[-\/]\d{2,4})/;
        const dtyPattern = /Date : (\d{2} [A-Za-z]{3} \d{4})/
        const dolorMatch = text.match(dolorPattern);
        const rupeeMatch = text.match(rupeePattern);
        const dmyMatch = text.match(dmyPattern);
        const dtyMatch = text.match(dtyPattern);
        var totalAmount =0
        if (dolorMatch) {
           totalAmount = parseInt(dolorMatch[1]);
          console.log('Total amount:', totalAmount);
        }
        else if(rupeeMatch){
          totalAmount = parseInt(rupeeMatch[1]);
          console.log('Total amount:', totalAmount);
        }
        else {
          console.log('Total amount not found');
           totalAmount = 0;
        }
        var date=""
        if(dmyMatch){
          date = dmyMatch[1];
          console.log('Date:', date);
        }
        else if(dtyMatch){
          date = dtyMatch[1];
          console.log('Date:', date);
        }
        else{
          date = Date();
          console.log('Date:', date);
        }

        await  Invoices.create({
            billNo: GenerateId("BILL"),
            Name: "user1",
            date: date,
            Amount: (-1)*totalAmount ,
            title: "Bill",
          });
          res.status(200).json({
            status:true,
            total: -(totalAmount),
          });
      }
    );
  })
);
app.post(
  "/uploadtext",
  asyncHandler(async (req, res) => {
    console.log(req.body);
    // "title":title,
    // "amount":amount,
    // "name":"user1",
    // "Date":Date()

    const result = await Invoices.create({
      billNo: GenerateId("BILL"),
      Name: req.body["name"],
      date: req.body["Date"],
      Amount: req.body["amount"],
      title: req.body["title"],
    });
    if (!result) {
      res.status(200).json({
        data: "error",
      });
    } else {
      res.status(200).json({
        data: "done",
      });
    }
  })
);

app.get("/", (req, res) => {
  console.log(__dirname);
  res.sendFile(__dirname + "/views/home.html");
});

app.get("/billing", (req, res) => {
  res.sendFile(__dirname + "/views/billing.html");
});



app.get("/about", (req, res) => {
  res.sendFile(__dirname + "/views/aboutus.html");
});

app.get("/upload", (req, res) => {
  res.sendFile(__dirname + "/views/upload.html");
});

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/views/login.html");
});

app.get("/visuals", (req, res) => {
  res.sendFile(__dirname + "/views/visuals.html");
});
app.get("/about", (req, res) => {
  res.sendFile(__dirname + "/views/setting.html");
});

app.get("/draw", (req, res) => {
  res.sendFile(__dirname + "/views/draw.html");
});

app.use(errorHandler);

const PORT = 5000;
console.log(`http://localhost:${PORT}/`);

app.listen(PORT, console.log(`Server port ${PORT}`));
