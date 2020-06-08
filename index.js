var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var multer  = require('multer')
const cors = require('cors');
const morgan = require('morgan');



app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express());
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use(cors());
app.use(morgan('dev'));


app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));

const FILE_PATH = 'uploads';

// configure multer
const upload = multer({
    dest: `${FILE_PATH}/`,
    limits: {
        fieldSize: 2 * 1024 * 1024 // 2 MB (max file size)
    }
});

app.get("/", (req,res)=>{
    res.render("home");
})

app.post('/upload', upload.single('upfile'), async (req, res) => {
    try {
        const fl = req.file;
        // make sure file is available
        if (!fl) {
            res.status(400).send({
                status: false,
                data: 'No file is selected.'
            });
        } else {
            // send response
            res.send({
                message: 'Success!',
                data: {
                    name: fl.originalname,
                    type: fl.mimetype,
                    size: fl.size
                }
            });
        }

    } catch (err) {
        res.status(500).send(err);
    }
});
app.listen(process.env.PORT || 3000, (req, res)=>{
    console.log("Server started!")
})