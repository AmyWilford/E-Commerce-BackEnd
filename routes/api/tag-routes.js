const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint
// find all tags
// be sure to include its associated Product data
router.get("/", async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }],
    });
    return res.status(200).json(tagData);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// find a single tag by its `id`
// be sure to include its associated Product data
router.get("/:id", async (req, res) => {
  try{
    const individualTag = await Tag.findByPk(req.params.id, {
      include: [{model:Product}]
    })
    if (!individualTag){
      return res.status(404).json({message: 'Invalid ID. Could not locate Tag'});
    }
    return res.status(200).json(individualTag);
  }catch (err){
    return res.status(500).json(err);
  }
});

// create a new tag
router.post("/", async (req, res) => {
  try{
    const newTag = await Tag.create(req.body);
    if (!newTag){
      return res.status(404).json({message:'Could not create new Tag'});
    }
    return res.status(200).json(newTag);
  }catch (err){
    return res.status(500).json(err);
  }
});

// update a tag's name by its `id` value
router.put("/:id", async (req, res) => {
  try{
    const updatedTag = await Tag.update(req.body,  
      {
        where:{
          id: req.params.id
        },
      });
      if (!updatedTag){
        return res.status(404).json({message:'Invald ID: Could not update Tag'});
      }
      return res.status(200).json(updatedTag);
  }catch (err){
    return res.status(500).json(err);
  }
});

// delete on tag by its `id` value
router.delete("/:id", async (req, res) => {
  try{
    const deletedTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    })
    if(!deletedTag){
      return res.status(404).json({message:'Invalid ID. Could not delete Tag'});
    }
    return res.status(200).json(deletedTag);
  }catch (err){
    return res.status(500).json(err);
  }
});

module.exports = router;
