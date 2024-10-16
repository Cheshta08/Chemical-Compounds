const express = require("express");
const config = require("./dbconfig");
const compundclass = require("./compoundClass");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files (HTML, CSS, JS)
app.use(express.static("public"));

// Custom middleware to ensure req.body is always JSON
// app.use((req, res, next) => {
//   if (
//     req.body &&
//     Object.keys(req.body).length > 0 &&
//     req.headers["content-type"] !== "application/json"
//   ) {
//     try {
//       const jsonBody = JSON.parse(req.body);
//       req.body = jsonBody;
//     } catch (err) {
//       return res.status(400).json({ error: "Invalid JSON format" });
//     }
//   }
//   next();
// });

// Get Compound list
app.get("/api/compounds", async (req, res) => {
  try {
    const data = await config.getChemicalCompounds();
    if (!data) {
      return res.status(404).json({ message: "No Data Found!!" });
    }
    res.json(data);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get Compound detail By Id
app.get("/api/getChemicalCompoundsById/:id", async (req, res) => {
  try {
    const item = await config.getChemicalCompoundsById(parseInt(req.params.id));
    if (!item) {
      return res.status(404).json({ message: "Compound not Found" });
    }
    res.json(item);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update Compound Detail
app.put("/api/UpdateCompoundDet/:id", async (req, res) => {
  try {
    const compoundId = parseInt(req.params.id);
    const updatedData = req.body;
    // console.log(req.body);
    if (!compoundId) {
      res.status(404).json({ error: "Invalid Compound Id" });
    }
    if (updatedData && compoundId) {
      const updateDataObj = {
        CompoundName: updatedData.hasOwnProperty("CompoundName")
          ? updatedData.CompoundName
          : "",
        CompoundDescription: updatedData.hasOwnProperty("CompoundDescription")
          ? updatedData.CompoundDescription
          : null,
        strImageSource: updatedData.hasOwnProperty("strImageSource")
          ? updatedData.strImageSource
          : null,
        strImageAttribution: updatedData.hasOwnProperty("strImageAttribution")
          ? updatedData.strImageAttribution
          : null,
        dateModified: compundclass.formatDateToLocalString(new Date()),
      };
      //   console.log(updateDataObj);
      const result = await config.UpdateCompoundDet(compoundId, updateDataObj);
      console.log(result);
      if (result.affectedRows > 0) {
        res.json({ message: "Compound Details Updated Successfully" });
      } else {
        res.status(404).json({ message: "Error updating Compound Details" });
      }
    } else {
      res.status(404).json({ error: "Bad Request" });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
