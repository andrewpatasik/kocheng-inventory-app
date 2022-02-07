#! /usr/bin/env node

console.log('mongodb+srv://admin:admin123@kocheng-inventory-db.cw116.mongodb.net/kocheng-inventory-db?retryWrites=true&w=majority');

// Get arguments passed on command line
const userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
const async = require('async');
const Item = require('./models/item');
const Category = require('./models/category');
const AnimalType = require('./models/animalType');
const Brand = require('./models/brand');

const mongoose = require('mongoose');
const mongoDB = userArgs[0];

mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const items = [];
const categories = [];
const brands = [];
const animaltypes = [];

const itemCreate = (name, description, category, brand, animal_type, price, number_in_stock, cb) => {
  const itemDetail = {
    name,
    description,
    category,
    animal_type,
    price,
    number_in_stock
  }

  if (brand !== false) itemDetail.brand = brand

  const item = new Item(itemDetail);
  item.save((err) => {
    if (err) {
      cb(err, null);
      return
    }

    console.log(`New item: ${item.name} added`)
    items.push(item)
    cb(null, item)
  })

}

const categoryCreate = (name, description, cb) => {
  const categoryDetail = {
    name,
    description,
  }

  const category = new Category(categoryDetail);
  category.save((err) => {
    if (err) {
      cb(err, null);
      return;
    }

    console.log(`New category: ${category.name} added`)
    categories.push(category)
    cb(null, category)
  })
}

const brandCreate = (name, cb) => {
  const brandDetail = {
    name
  }

  const brand = new Brand(brandDetail);
  brand.save((err) => {
    if (err) {
      cb(err, null);
      return
    }

    console.log(`New brand: ${brand.name} added`)
    brands.push(brand)
    cb(null, brand)
  })
}

const animalTypeCreate = (name, cb) => {
  const animalTypeDetail = {
    name
  }

  const animalType = new AnimalType(animalTypeDetail)
  animalType.save((err) => {
    if (err) {
      cb(err, null)
      return
    }

    console.log(`New animal type: ${animalType.name} added`)
    animaltypes.push(animalType)
    cb(null, animalType)
  })
}

const createBrand = (cb) => {
  async.series([
    (callback) => brandCreate('Wish Bone', callback),
    (callback) => brandCreate('Sicce', callback),
    (callback) => brandCreate('Kennels Favorite', callback)
  ], cb);
}

const createAnimalType = (cb) => {
  async.series([
    (callback) => animalTypeCreate('Cat', callback),
    (callback) => animalTypeCreate('Dog', callback),
    (callback) => animalTypeCreate('Small Animal', callback),
  ], cb)
}

const createCategory = (cb) => {
  async.series([
    (callback) => categoryCreate('Food', "List of available food in the store", callback),
    (callback) => categoryCreate('Supply', "List of available supply in the store", callback)
  ], cb)
}

const createItem = (cb) => {
  async.parallel([
    (callback) => itemCreate('Cat Food Wish Bone 1,8 Kg', 'Wish Bone Pasture Protein 32% Fat 15%', categories[0], brands[0], animaltypes[0], 30.00, 10, callback),
    (callback) => itemCreate('Dog Food Kennels Favorite Lamb & Rice 12,5 Kg', 'Kennels Favorite Lamb & Rice Protein 23% Fat 10%', categories[0], brands[2], animaltypes[1], 75.00, 4, callback),
    (callback) => itemCreate('Pervinca Bird Cage', 'Made with high quality steel, firm and eco-friendly. Diameter: (L x W x H) = 100.5 x 167.5. Color: Blue', categories[1], false, animaltypes[2],  12.00, 1, callback)
  ], cb)
}

async.series([
  createBrand,
  createAnimalType,
  createCategory,
  createItem
], (err, results) => {
  if (err) {
    console.log('FINAL ERROR: ' + err);
    return;
  }

  mongoose.connection.close()
    .then((res) => {
      console.log('connection closed.')
      return;
    })
})
