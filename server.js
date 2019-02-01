var express = require("express");
var multer = require('multer');
var bodyParser = require('body-parser')

var app = express();
const port=process.env.PORT || 3000;
app.use(express.static(__dirname + "/public")); //use static files in ROOT/public folder

app.get("/", function (request, response) {
    let itemList = {
        "storeId": 3524,
        "dishList": [
            {
                "dishId": "103",
                "dishName": "Biryani",
                "dishBatchNumber": "11230002384",
                "dishDescription": "Taste of India's best biryani dum.",
                "dishImage": "https://github.com/vishalecho/shop-server/blob/master/public/images/dish.jpg",
                "dishCategory": "Non-Veg",
                "sellingPrice": "180.00",
                "tag": "Best Seller",
                "rating": "4.3/5"
            },
            {
                "dishId": "104",
                "dishName": "Coffee",
                "dishBatchNumber": "1123424384",
                "dishDescription": "Best Coffee",
                "dishImage": "https://github.com/vishalecho/shop-server/blob/master/public/images/dish.jpg",
                "dishCategory": "Veg Beverage",
                "sellingPrice": "100.00",
                "tag": "",
                "rating": "4.8/5"
            },
              {
                "dishId": "105",
                "dishName": "Biryani2",
                "dishBatchNumber": "112300023842",
                "dishDescription": "Taste of India's best biryani dum.",
                "dishImage": "https://github.com/vishalecho/shop-server/blob/master/public/images/dish.jpg",
                "dishCategory": "Non-Veg",
                "sellingPrice": "180.00",
                "tag": "Best Seller",
                "rating": "4.3/5"
            },
                {
                "dishId": "106",
                "dishName": "Biryani",
                "dishBatchNumber": "11230002384",
                "dishDescription": "Taste of India's best biryani dum.",
                "dishImage": "https://github.com/vishalecho/shop-server/blob/master/public/images/dish.jpg",
                "dishCategory": "Non-Veg",
                "sellingPrice": "180.00",
                "tag": "Best Seller",
                "rating": "4.3/5"
            },
            {
                "dishId": "107",
                "dishName": "Coffee",
                "dishBatchNumber": "1123424384",
                "dishDescription": "Best Coffee",
                "dishImage": "https://github.com/vishalecho/shop-server/blob/master/public/images/dish.jpg",
                "dishCategory": "Veg Beverage",
                "sellingPrice": "100.00",
                "tag": "",
                "rating": "4.8/5"
            },
              {
                "dishId": "108",
                "dishName": "Biryani2",
                "dishBatchNumber": "112300023842",
                "dishDescription": "Taste of India's best biryani dum.",
                "dishImage": "https://github.com/vishalecho/shop-server/blob/master/public/images/dish.jpg",
                "dishCategory": "Non-Veg",
                "sellingPrice": "180.00",
                "tag": "Best Seller",
                "rating": "4.3/5"
            }
        ]
    };
    response.send(itemList);
});

app.get("/dishList", function (request, response) {
    let itemList =
    {
        "storeId": 3524,
        "dishList": [
            {
                "dishId": "103",
                "discount": "20",
                "position": 1
            },
            {
                "dishId": "104",
                "discount": "10",
                "position": 2
            }
        ]
    };
    response.send(itemList);
});

var Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./Upload/Images");
    },
    filename: function (req, file, callback) {
    callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});

var upload = multer({ storage: Storage }).array("imgUploader", 3); //Field name and max count

app.post("/api/Upload", function (req, res) {
    upload(req, res, function (err) {
    if (err) {
    return res.end("Something went wrong!");
    }
    return res.end("File uploaded sucessfully!.");
    });
});


app.listen(port,() => {

    console.log(`Server running at port `+port);
    
    });
