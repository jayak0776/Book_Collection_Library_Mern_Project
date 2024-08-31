import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

//Display all books route
router.get("/", async (req, res) => {
  try {
    const book = await Book.find();
    return res.status(201).json({
      count: book.length,
      data: book,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

// Display  book by id route
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findById(id);
    return res.status(201).json(book);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

// Add books route
router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res
        .status(400)
        .send({ message: "Send all requried fields:title,author,publishYear" });
    }
    const newbook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };
    const book = await Book.create(newbook);
    return res.status(201).send(book);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

// Update book by id route
router.put("/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res
        .status(400)
        .send({ message: "Send all fields like: title,author,publishYear" });
    }
    const { id } = req.params;

    const result = await Book.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).send({ message: "Book not found!" });
    }
    return res.status(200).send({ message: "Book successfully updated!" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

// Delete book by id route
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).send({ message: "Book not found" });
    }
    return res.status(200).send({ message: "Successfully Deleted!" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

export default router;
