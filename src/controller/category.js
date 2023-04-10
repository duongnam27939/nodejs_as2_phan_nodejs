import Category from "../models/category";

export const create = async (req, res) => {
    try {
        const category = await Category.create(req.body);
        if (category.length === 0) {
            return res.status(201).json({
                message: "không thêm được danh mục"
            });
        }
        return res.json(category)
    } catch (error) {
        return res.status(404).json({
            message: error.message
        })
    }
}
export const getAll = async (req, res) => {
    try {
        const category = await Category.find();
        if (category.length === 0) {
            return res.status(201).json({
                message: "Không có dữ liệu"
            });
        }
        return res.json(category)
    } catch (error) {
        return res.status(404).json({
            message: error.message
        })
    }
}

export const get = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id).populate("products");
        if (category.length === 0) {
            return res.status(201).json({
                message: "Không có dữ liệu"
            });
        }
        return res.json(category)
    } catch (error) {
        return res.status(404).json({
            message: error.message
        })
    }
}

export const updata = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true });
        if (category.length === 0) {
            return res.status(201).json({
                message: "Cập nhập danh mục không thành công",
            });
        }
        return res.json(category)
    } catch (error) {
        return res.status(404).json({
            message: error.message
        })
    }
}


export const remove = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete({ _id: req.params.id });
        if (category.length === 0) {
            return res.status(201).json({
                message: "Xóa danh mục thành công",
            });
        }
        return res.json(category)
    } catch (error) {
        return res.status(404).json({
            message: error.message
        })
    }
}

