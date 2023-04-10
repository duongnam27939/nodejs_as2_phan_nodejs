import Product from "../models/products"
import Category from "../models/category";
import joi from "joi";
 
const productSchema = joi.object({
    name: joi.string().required("name là trương dữ liệu bắt buộc"),
    price: joi.number().required("price là trường dữ liệu bắt buộc"),
    original_price: joi.number().required("original_price là trường dữ liệu bắt bược"),
    images: joi.string().required("Images là trường bắt buộc"),
    categoryId: joi.string().required("categoryId là trường dữ liệu bắt buộc"),
});

export const create = async(req,res) =>{
    try {
        const {error} = productSchema.validate(req.body)
        if(error) {
            return res.status(400).json({
                message: error.details.map((err)=> err.message)
            });
        }

        const product = await Product.create(req.body);
        // Thêm ObjectId vào thuộc tính products trong model Category
        await Category.findByIdAndUpdate(product.categoryId, {
            $addToSet: {
                products: product._id,
            },
        });
        if (product.length === 0) {
            return res.status(200).json({
                message: "Không thêm được sản phẩm",
            });
        }
        return res.json(product);
    } catch (error) {
        return res.status(404).json({
            message: error.message,
        });
    }
}

export const getAll = async(req,res) =>{
    try {
        const product = await Product.find()
        return res.status(201).json({
            product
        })
    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }
}

export const get = async(req,res) =>{
    try {
        const product = await Product.findById(req.params.id).populate("categoryId")
        return res.status(201).json({
            product
        })
    } catch (error) {
        return res.status(400).json({
            error
        })
    }
}

export const updata = async(req,res) =>{
    try {
        const product = await Product.findOneAndUpdate({_id: req.params.id},req.body)
        return res.status(201).json({
            message: "Thêm sản phẩm thành công",
            product
        })
    } catch (error) {
        return res.status(400).json({
            message: "Thêm sản phẩm thất bại",
            error
        })
    }
}

export const remove = async(req,res) =>{
    try {
        const product = await Product.findByIdAndDelete({_id: req.params.id})
        return res.status(201).json({
            message: "Xóa sản phẩm thành công"
        })
    } catch (error) {
        return res.status(400).json({
        })
    }
}
