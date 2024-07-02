const express = require("express");
const cors = require("cors");
const http = require("http");

const app = express();
const fileUpload = require("express-fileupload");
const productRoutes = require("./routes/productos.routes");


app.use(cors());
app.use('/public', express.static('public'));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads"
}));

app.use("/api/productos",productRoutes);

module.exports = {
    app
};