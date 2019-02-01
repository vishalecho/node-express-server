const express = require("express");
const bodyParser = require('body-parser')
const fs = require('fs')
const formidable = require('formidable')
const cors = require('cors')
var app = express();
const port = process.env.PORT || 4000;
app.use(express.static(__dirname + "/public")); //use static files in ROOT/public folder
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())

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

// var Storage = multer.diskStorage({
//     destination: function (req, file, callback) {
//         callback(null, "./Upload/Images");
//     },
//     filename: function (req, file, callback) {
//     callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
//     }
// });

// var upload = multer({ storage: Storage }).array("imgUploader", 3); //Field name and max count

app.post('/api/upload', (req, res) => {
    console.log(req.body)
    let form = new formidable.IncomingForm();
    form.multiples = true
    form.parse(req, function (err, fields, files) {
        console.log("Files", typeof(files), files);
        let done = 0
     
        if (typeof(files.file.length) == "undefined") {
            let oldpath = files.file.path;
            let newpath = __dirname + '/public/upload/' + files.file.name;
            let readStream = fs.createReadStream(oldpath);
            let writeStream = fs.createWriteStream(newpath);
            readStream.on('error', function (err) {
                console.log("File Read Stream Error",err)
                res.send(err)
            });
            writeStream.on('error', function (err) {
                console.log("File write stream error",err)
                res.send(err)
            });
            readStream.on('close', function () {
                fs.unlink(oldpath, function () {
                    
                });
            });
            readStream.pipe(writeStream)
            res.send('Success')
        } else {
            files.file.forEach((i, index) => {
                let oldpath = i.path;
                let newpath = __dirname + '/public/upload/' + i.name;
                let readStream = fs.createReadStream(oldpath);
                let writeStream = fs.createWriteStream(newpath);
                readStream.on('error', function (err) {
                    console.log(err)
                    res.send(err)

                });
                writeStream.on('error', function (err) {
                    console.log(err)
                    res.send(err)

                });
                readStream.on('close', function () {
                    fs.unlink(oldpath, function () {
                        done += 1
                        done === files.file.length
                    });
                });
                readStream.pipe(writeStream);
               
            })
            res.send('Success')
        }
        res.send('Success')
    })
    
})
//Client - add FormData to push
// fileUpload = (event) => {
//     if(this.state.fileStatus){
//       axios.post('http://localhost:9000/upload', this.state.formy, {
//           headers: {
//             'Content-Type': 'multipart/form-data'
//           }
//         }).then(function (response) {
//             alert("Uploaded"+response.data)
//             this.setState({formy: new FormData(), fileStatus: false})
//         }).catch(function (error) {
//         })
//     }
  
//   }
app.listen(port, () => {
    console.log(`Server running at port ` + port);
});
