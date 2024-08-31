import express from "express";
import { PORT, mongodburl } from "./config.js";
import mongoose from "mongoose";
// import { Book } from "./models/bookModel.js";
import bookRoutes from "./Routes/bookRoutes.js";
import cors from "cors";

const app = express();

app.use(express.json());

//Middleware of all cors policys
// 1st options Allow all with default cors(*)
app.use(cors());
// 2nd options Allow all custom origins
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     method: ["GET", "POST", "PUT", "DELETE"],
//     allowHeaders: ["Content-Type"],
//   })
// );

// app.get("/", (req, res) => {
//   console.log(req);
//   return res.status(200).send("Hello World");
// });

// app.get("/books", async (req, res) => {
//   try {
//     const book = await Book.find();
//     return res.status(201).json({
//       count: book.length,
//       data: book,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({ message: error.message });
//   }
// });

// app.get("/books/:id", async (req, res) => {
//   try {
//     const { id } = req.params;

//     const book = await Book.findById(id);
//     return res.status(201).json(book);
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({ message: error.message });
//   }
// });

// app.post("/books", async (req, res) => {
//   try {
//     if (!req.body.title || !req.body.author || !req.body.publishYear) {
//       return res
//         .status(400)
//         .send({ message: "Send all requried fields:title,author,publishYear" });
//     }
//     const newbook = {
//       title: req.body.title,
//       author: req.body.author,
//       publishYear: req.body.publishYear,
//     };
//     const book = await Book.create(newbook);
//     return res.status(201).send(book);
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({ message: error.message });
//   }
// });

// app.put("/books/:id", async (req, res) => {
//   try {
//     if (!req.body.title || !req.body.author || !req.body.publishYear) {
//       return res
//         .status(400)
//         .send({ message: "Send all fields like: title,author,publishYear" });
//     }
//     const { id } = req.params;

//     const result = await Book.findByIdAndUpdate(id, req.body);

//     if (!result) {
//       return res.status(404).send({ message: "Book not found!" });
//     }
//     return res.status(200).send({ message: "Book successfully updated!" });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({ message: error.message });
//   }
// });

// app.delete("/books/:id", async (req, res) => {
//   try {
//     const { id } = req.params;

//     const result = await Book.findByIdAndDelete(id);

//     if (!result) {
//       return res.status(404).send({ message: "Book not found" });
//     }
//     return res.status(200).send({ message: "Successfully Deleted!" });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({ message: error.message });
//   }
// });

app.use("/books", bookRoutes);

mongoose
  .connect(mongodburl)
  .then(() => {
    console.log("App is connected to database.");
    app.listen(PORT, () => {
      console.log("Server at port:" + PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
