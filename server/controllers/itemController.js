const Item = require('../models/item');
const Category = require('../models/category');
const Brand = require('../models/brand');
const AnimalType = require('../models/animalType');

const async = require('async');
const { body, validationResult } = require('express-validator');

exports.index = (req, res, next) => {
  async.parallel({
    items: (callback) => {
      Item.find({}, 'name brand price number_in_stock')
        .sort({ name: 1 })
        .populate('brand')
        .limit(3)
        .exec(callback)
    },
    categories: (callback) => {
      Category.find({}, 'name')
        .exec(callback)
    },
    brands: (callback) => {
      Brand.find({})
        .exec(callback)
    },
    animaltypes: (callback) => {
      AnimalType.find({})
        .sort({ name: 'asc'})
        .exec(callback)
    }
  }, (err, results) => {
    if (err) return next(err)

    res.render('index', {
      title: 'Kocheng', 
      error: err,
      items: results.items,
      categories: results.categories,
      brands: results.brands,
      animaltypes: results.animaltypes
    })
  })
} 

exports.get_item_list = (req, res, next) => {
  Item.find({})
    .sort({ name: 'asc'})
    .populate('category')
    .populate('brand')
    .populate('animal_type')
    .exec((err, result) => {
      if (err) return next(err);
      
      res.render('item_list', {
        title: 'All Items',
        items: result,
      })
    })
}

exports.get_item_detail = (req, res, next) => {
  Item.findById(req.params.id)
    .populate('category')
    .populate('brand')
    .populate('animal_type')
    .exec((err, result) => {
      if (err) return next(err);
      if (result === null) {
        const error = new Error('Item not found');
        error.status = 404;
        return next(error)
      }

      res.render('item_detail', {
        title: result.name,
        item: result
      })
    })
}

exports.item_create_get = (req, res, next) => {
  async.parallel({
    categories: (callback) => {
      Category.find({})
        .exec(callback)
    },
    brands: (callback) => {
      Brand.find({})
        .exec(callback)
    },
    animaltypes: (callback) => {
      AnimalType.find({})
        .exec(callback)
    }
  }, (err, results) => {
    if (err) return next(err)

    res.render('item_form', {
      title: 'Create New Item',
      categories: results.categories,
      brands: results.brands,
      animaltypes: results.animaltypes
    })
  })
}

exports.item_create_post = [
  body('item-name', 'Name field must be specified').trim().isLength({ min: 1 }).escape(),
  body('item-category', 'Category field must be specified').trim().isLength({ min: 1 }).escape(),
  body('item-brand', 'Brand field must be specified').trim().isLength({ min: 1 }).escape(),
  body('item-animaltype', 'Animal type field must be specified').trim().isLength({ min: 1}).escape(),
  body('item-price', 'Price field must be specified').trim().isLength({ min: 1 }).escape(),
  body('item-stock', 'Stock field must be specified').trim().isLength({ min: 1 }).escape(),
  body('item-description', 'Description field must be specified').trim().isLength({ min: 1 }).escape(),

  (req, res, next) => {
    const errors = validationResult(req);

    const newItem = new Item({
      name: req.body["item-name"],
      description: req.body["item-description"],
      category: req.body["item-category"],
      brand: req.body["item-brand"],
      animal_type: req.body["item-animaltype"],
      price: req.body["item-price"],
      number_in_stock: req.body["item-stock"]
    });

    if (!errors.isEmpty()) {
      console.log('ERROR', + errors.array())
      return next(errors.array())
    } else {
      newItem.save((err) => {
        if (err) {
          console.log('FINAL ERR' + err)
          return next(err)
        }

        res.redirect(newItem.url);
      })
    }
  }
] 
exports.item_delete_get = (req, res, next) => {
  res.render('item_delete', {
    title: 'Delete Item',
    message: 'NOT IMPLEMENTED: Item delete GET' + req.params.id
  })
}

exports.item_delete_post = (req, res, next) => {
  res.render('item_delete', {
    title: 'Delete Item',
    message: 'NOT IMPLEMENTED: Item delete POST' + req.params.id
  })
}

exports.item_update_get = (req, res, next) => {
  res.render('item_form', {
    title: 'Update Item',
    message: 'NOT IMPLEMENTED: Item update GET' + req.params.id
  })
}

exports.item_update_post = (req, res, next) => {
  res.render('item_form', {
    title: 'Update Item',
    message: 'NOT IMPLEMENTED: Item update POST' + req.params.id
  })
}