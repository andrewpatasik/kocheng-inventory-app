const AnimalType = require('../models/animalType');
const Item = require('../models/item');

const async = require('async');

exports.get_animaltype_list = (req, res, next) => {
  async.parallel({
    animaltypes: (callback) => { 
      AnimalType.find({})
        .sort({ name: 1})
        .exec((callback))
    },
    items: (callback) => {
      Item.find({})
        .populate('animal_type')
        .exec((callback))
    }
  }, (err, results) => {
    if (err) return next(err);

    res.render('animaltype_list', {
      title: 'All Animal Types',
      animaltypes: results.animaltypes,
      items: results.items
    })
  })

}

exports.get_animaltype_detail = (req, res, next) => {
  res.render('animaltype_detail', {
    title: 'Animal Type Detail',
    message: 'NOT IMPLEMENTED: GET animal type detail' + req.params.id
  })
}

exports.animaltype_create_get = (req, res, next) => {
  res.render('animaltype_form', {
    title: 'Create New Animal Type',
    message: 'NOT IMPLEMENTED: animal type create GET'
  })
}

exports.animaltype_create_post = (req, res, next) => {
  res.render('animaltype_form', {
    title: 'Create New Animal Type',
    message: 'NOT IMPLEMENTED: animal type create POST'
  })
}

exports.animaltype_delete_get = (req, res, next) => {
  res.render('animaltype_delete', {
    title: 'Delete Animal Type',
    message: 'NOT IMPLEMENTED: animal type delete GET ' + req.params.id
  })
}

exports.animaltype_delete_post = (req, res, next) => {
  res.render('animaltype_delete', {
    title: 'Delete Animal Type',
    message: 'NOT IMPLEMENTED: animal type delete POST ' + req.params.id
  })
}

exports.animaltype_update_get = (req, res, next) => {
  res.render('animaltype_form', {
    title: 'Update Animal Type',
    message: 'NOT IMPLEMENTED: animal type update GET ' + req.params.id
  })
}

exports.animaltype_update_post = (req, res, next) => {
  res.render('animaltype_form', {
    title: 'Update Animal Type',
    message: 'NOT IMPLEMENTED: animal type update POST ' + req.params.id
  })
}