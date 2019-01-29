var express = require("express");

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
                "dishImage": "",
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
                "dishImage": "Link or base64 encoded ? ",
                "dishCategory": "Veg Beverage",
                "sellingPrice": "100.00",
                "tag": "",
                "rating": "4.8/5"
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

app.listen(port,() => {

    console.log(`Server running at port `+port);
    
    });