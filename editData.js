const mongoose = require("mongoose");
const Product = require("./models/product.model");
require("dotenv").config();
async function run() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);

    console.log("Connected DB");

    const duplicates = await Product.aggregate([
    {
      $group: {
        _id: "$title", // field cần check trùng
        ids: { $push: "$_id" },
        count: { $sum: 1 }
      }
    },
    {
      $match: {
        count: { $gt: 1 } // chỉ lấy những cái bị trùng
      }
    }
  ]);

  for (let item of duplicates) {
    const [keep, ...removeIds] = item.ids;

    await Product.deleteMany({
      _id: { $in: removeIds }
    });
  }

  console.log("Xoá xong dữ liệu trùng");
  process.exit();

    console.log("Updated:", result.modifiedCount, "documents");

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
    const result = await Product.updateMany(
  {},
  [
    { $unset: "id" },
    {
      $set: {
        status: {
          $cond: {
            if: { $lte: ["$stock", 0] },
            then: "inactive",
            else: "active"
          }
        },
        deleted: {
          $cond: {
            if: { $eq: [{ $type: "$deleted" }, "missing"] },
            then: false,
            else: "$deleted"
          }
        }
      }
    }
  ],
  { updatePipeline: true } // 🔥 thêm dòng này
  
);
}

run();