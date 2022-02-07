const Category = require('../models/category');
const Item = require('../models/item');

const async = require('async');

exports.get_category_list = (req, res, next) => {
  async.parallel({
    categories: (callback) => { 
      Category.find({})
        .sort({ name: 1})
        .exec((callback))
    },
    items: (callback) => {
      Item.find({})
        .populate('category')
        .exec((callback))
    }
  }, (err, results) => {
    if (err) return next(err);

    res.render('category_list', {
      title: 'All Categories',
      categories: results.categories,
      items: results.items
    })
  })
}

exports.get_category_detail = (req, res, next) => {
  res.render('category_detail' , {
    title: 'Category Detail',
    message: 'NOT IMPLEMENTED: category detail GET' + req.params.id
  })
}

exports.category_create_get = (req, res, next) => {
  res.render('category_form', {
    title: 'Create New Category',
    message: 'NOT IMPLEMENTED: category create GET'
  })
}

exports.category_create_post = (req, res, next) => {
  res.render('category_form', {
    title: 'Create New Category',
    message: 'NOT IMPLEMENTED: category create POST' + req.params.id
  })
}

exports.category_delete_get = (req, res, next) => {
  res.render('category_delete', {
    title: 'Delete Category',
    message: 'NOT IMPLEMENTED: category delete GET' + req.params.id
  })
}

exports.category_delete_post = (req, res, next) => {
  res.render('category_delete', {
    title: 'Delete Category',
    message: 'NOT IMPLEMENTED: delete category POST' + req.params.id
  })
}

exports.category_update_get = (req, res, next) => {
  res.render('category_form', {
    title: 'Update Category', 
    message: 'NOT IMPLEMENTED: update category GET' + req.params.id
  })
}

exports.category_update_post = (req, res, next) => {
  res.render('category_form', {
    title: 'Update Category',
    message: 'NOT IMPLEMENTED: update category POST' + req.params.id
  })
}