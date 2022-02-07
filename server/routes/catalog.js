var express = require('express');
var router = express.Router();

const item_controller = require('../controllers/itemController');
const category_controller = require('../controllers/categoryController');
const brand_controller = require('../controllers/brandController');
const animaltype_controller = require('../controllers/animalTypeController');

// * ITEM * //
router.get('/', item_controller.index);

router.get('/item/create', item_controller.item_create_get);
router.post('/item/create', item_controller.item_create_post);

router.get('/item/:id/delete', item_controller.item_delete_get);
router.post('/item/:id/delete', item_controller.item_delete_post);

router.get('/item/:id/update', item_controller.item_delete_get);
router.post('/item/:id/update', item_controller.item_delete_post);

router.get('/item/:id', item_controller.get_item_detail);

router.get('/items', item_controller.get_item_list);

// * CATEGORY * //
router.get('/category/:id/delete', category_controller.category_delete_get);
router.post('/category/:id/delete', category_controller.category_delete_post);

router.get('/category/:id/update', category_controller.category_update_get);
router.post('/category/:id/update', category_controller.category_update_post);

router.get('/category/create', category_controller.category_create_get);
router.post('/category/create', category_controller.category_create_post);

router.get('/category/:id', category_controller.get_category_detail);

router.get('/categories', category_controller.get_category_list);

// * BRAND * //
router.get('/brand/:id/delete', brand_controller.brand_delete_get);
router.post('/brand/:id/delete', brand_controller.brand_delete_post);

router.get('/brand/:id/update', brand_controller.brand_update_get);
router.post('/brand/:id/update', brand_controller.brand_update_post);

router.get('/brand/create', brand_controller.brand_create_get);
router.post('/brand/create', brand_controller.brand_create_post);

router.get('/brand/:id', brand_controller.get_brand_detail);

router.get('/brands', brand_controller.get_brand_list);

// * ANIMAL TYPE * //
router.get('/animaltype/:id/delete', animaltype_controller.animaltype_delete_get);
router.post('/animaltype/:id/delete', animaltype_controller.animaltype_delete_post);

router.get('/animaltype/:id/update', animaltype_controller.animaltype_update_get);
router.post('/animaltype/:id/update', animaltype_controller.animaltype_update_post);

router.get('/animaltype/create', animaltype_controller.animaltype_create_get);
router.post('/animaltype/create', animaltype_controller.animaltype_create_post);

router.get('/animaltype/:id', animaltype_controller.get_animaltype_detail);

router.get('/animaltypes', animaltype_controller.get_animaltype_list);

module.exports = router;
