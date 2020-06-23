const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Product = require('../models/Product');


// @desc    GET all products
// @route   GET /api/v1/products
//@access   Public
exports.getProducts = asyncHandler(async(req, res, next) => {
    let query;

    let queryStr = JSON.stringify(req.query);
    const products = await Product.find();

    res.status(200).json({ success: true, count: products.length, data: products });
});

// @desc    GET single product
// @route   GET /api/v1/products/:id
//@access   Public
exports.getProduct = asyncHandler(async(req, res, next) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorResponse(`Não foi possivel achar o produto com o id ${req.params.id}`, 404));
    }
    res.status(200).json({ success: true, data: product });

});


// @desc    CREATE product
// @route   POST /api/v1/products
//@access   Public
exports.createProduct = asyncHandler(async(req, res, next) => {

    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        data: product
    });

});


// @desc    Update product
// @route   PUT /api/v1/products/:id
//@access   Public
exports.updateProduct = asyncHandler(async(req, res, next) => {

    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!product) {
        return next(new ErrorResponse(`Não foi possivel achar o produto com o id ${req.params.id}`, 404));
    }

    res.status(201).json({
        success: true,
        data: product
    });

});

// @desc    Delete product
// @route   DELETE /api/v1/products/:id
//@access   Public
exports.deleteProduct = asyncHandler(async(req, res, next) => {

    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
        return next(new ErrorResponse(`Não foi possivel achar o produto com o id ${req.params.id}`, 404));
    }

    res.status(201).json({
        success: true
    });

});