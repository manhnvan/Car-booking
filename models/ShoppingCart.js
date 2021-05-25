const mongoose = require("mongoose");
Schema = mongoose.Schema;

var shoppingCartSchema = new Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "customer",
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "product",
      },
      amount: {
        type: Number,
        require: true,
        default: 0
      },
      checked: {
        type: Boolean,
        default: true
      }
    },
  ],
  created: {
    type: Date,
    default: Date.now,
  },
});

shoppingCartSchema.methods.addToCart = (productId) => {
    for (let i of item) {{
        if(i.productId === productId) {
            item[i].amount += 1;
            break;
        }
        else item.concat({
            productId, 
            amount: 0
        })
    };
    console.log(item)
}}

module.exports = mongoose.model("shopping_cart", shoppingCartSchema);
