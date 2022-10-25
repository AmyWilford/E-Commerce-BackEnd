// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Establish Table Connection -> Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id',
});

// Establish Table Connection ->Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE' 
});

// Establish Table Connection -> Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: {
    model: ProductTag,
    foreignKey: 'product_id'
  }
});

// Establish Table Connection -> Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: {
    model: ProductTag, 
    foreignKey: 'tag_id'
  }
});

// Export all models
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
