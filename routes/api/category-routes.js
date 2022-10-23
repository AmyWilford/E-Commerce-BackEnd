const router = require("express").Router();
const { Category, Product } = require("../../models");

// Category Routes using `/api/categories` endpoint

// GET route to find all categories and associated Product data
router.get("/", async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{model: Product}]
    });
    return res.status(200).json(categoryData);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// GET route to find one category by its `id` value and its associated product data
router.get("/:id", async (req, res) => {
  try {
    const individualCategory = await Category.findByPk(req.params.id, {
      include: [{model: Product}],
    });
    if (!individualCategory) {
      return res
        .status(404)
        .json({ message: "Could not locate product with provided ID" });
    }
    return res.status(200).json(individualCategory);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// POST Route to create a new category
router.post("/", async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    if (!newCategory) {
      return res.status(404).json({ message: "Could not create category" });
    }
    return res.status(200).json(newCategory);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// PUT route to update a category by its `id` value
router.put("/:id", async (req, res) => {
  try {
    const updatedCategory = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    if (!updatedCategory) {
      return res.status(404).json({message: 'Invalid ID. Could not update Category'})
    }
    return res.status(200).json(updatedCategory);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// DELETE route to remove a category by its `id` value
router.delete("/:id", async (req, res) => {
  try{
    const deletedCategory = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    if(!deletedCategory){
     return res.status(404).json({message: 'Invald ID. Could not delete Category'})
    }
    return res.status(200).json(deletedCategory)
  } catch (err){
    return res.status(500).json(err);
  }
});

// Export Router Module
module.exports = router;
