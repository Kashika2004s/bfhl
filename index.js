const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const fullName = "john_doe"; // your name in lowercase
const dob = "17091999"; // ddmmyyyy
const email = "john@xyz.com";
const rollNumber = "ABCD123";

app.post("/bfhl", (req, res) => {
  try {
    const data = req.body.data;
    if (!Array.isArray(data)) {
      return res.status(400).json({ is_success: false, message: "Invalid input" });
    }

    let evenNumbers = [];
    let oddNumbers = [];
    let alphabets = [];
    let specialChars = [];
    let sum = 0;

    data.forEach((item) => {
      if (/^-?\d+$/.test(item)) {
        let num = parseInt(item);
        if (num % 2 === 0) evenNumbers.push(item);
        else oddNumbers.push(item);
        sum += num;
      } else if (/^[a-zA-Z]+$/.test(item)) {
        alphabets.push(item.toUpperCase());
      } else {
        specialChars.push(item);
      }
    });

    let concatString = alphabets
      .join("")
      .split("")
      .reverse()
      .map((c, i) => (i % 2 === 0 ? c.toUpperCase() : c.toLowerCase()))
      .join("");

    res.status(200).json({
      is_success: true,
      user_id: `${fullName}_${dob}`,
      email,
      roll_number: rollNumber,
      odd_numbers: oddNumbers,
      even_numbers: evenNumbers,
      alphabets,
      special_characters: specialChars,
      sum: sum.toString(),
      concat_string: concatString,
    });
  } catch (error) {
    res.status(500).json({ is_success: false, message: "Server Error" });
  }
});

app.get("/", (req, res) => {
  res.send("BFHL API running on Render!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
