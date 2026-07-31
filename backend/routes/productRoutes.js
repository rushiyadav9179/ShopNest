const express  =require('express');
const { protect } = require('../middleware/authMiddleware.js');
const { admin } = require('../middleware/adminMiddlewaew.js');
const { getproducts, createProduct, getProductById, updateProduct, deleteProduct } = require('../controllers/productController.js');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const router = express.Router();

//all product
router.route('/').get(getproducts).post(protect, admin, upload.single('image'), createProduct);
//specific product
router.route('/:id').get(getProductById).put(protect, admin, upload.single('image'), updateProduct).delete(protect, admin, deleteProduct);

module.exports = router;