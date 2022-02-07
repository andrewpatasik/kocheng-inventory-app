const Brand = require('../models/brand');
const Item = require('../models/item');

const async = require('async');

exports.get_brand_list = (req, res, next) => {
  async.parallel({
    brands: (callback) => { 
      Brand.find({})
        .sort({ name: 1})
        .exec((callback))
    },
    items: (callback) => {
      Item.find({}, 'name brand')
        .populate('brand')
        .exec((callback))
    }
  }, (err, results) => {
    if (err) return next(err);

    res.render('brand_list', {
      title: 'All Brands',
      brands: results.brands,
      items: results.items,
      error: err
    })
  })
}

exports.get_brand_detail = (req, res, next) => {
  res.render('brand_detail', {
    title: 'Brand Detail',
    message: 'NOT IMPLEMENTED: GET brand detail ' + req.params.id
  })
}

exports.brand_create_get = (req, res, next) => {
  res.render('brand_form', {
    title: 'Create New Brand',
    message: 'NOT IMPLEMENTED: brand create GET'
  })
}

exports.brand_create_post = (req, res, next) => {
  res.render('brand_form', {
    title: 'Create New Brand',
    message: 'NOT IMPLEMENTED: brand create POST' + req.params.id
  })
}

exports.brand_delete_get = (req, res, next) => {
  res.render('brand_delete', {
    title: 'Delete Brand',
    message: 'NOT IMPLEMENTED: brand delete GET' + req.params.id
  })
}

exports.brand_delete_post = (req, res, next) => {
  res.render('brand_delete', {
    title: 'Delete Brand',
    message: 'NOT IMPLEMENTED: brand delete POST' + req.params.id
  })
}

exports.brand_update_get = (req, res, next) => {
  res.render('brand_form', {
    title: 'Update Brand',
    message: 'NOT IMPLEMENTED: brand update GET' + req.params.id
  })
}

exports.brand_update_post = (req, res, next) => {
  res.render('brand_form', {
    title: 'Update Brand',
    message: 'NOT IMPLEMENTED: brand update POST' + req.params.id
  })
}
