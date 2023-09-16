
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const Mongo = require('./Conn/mongoose.js');
const cors = require('cors');

const app = express();
const port=3000;

Mongo();

const MovieData=require('./Model/MovieData.js');

app.use(cors({
    origin: 'http://localhost:3001',
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());



app.post('/insert', async (req,res) => {
    // console.log(req.body);
    const {Title, Year, imdbID, Type, Poster} = req.body;
    try {
        const query=await MovieData.findOne({imdbID});
        if(!query){
            const data = new MovieData({Title, Year, imdbID, Type, Poster});
            await MovieData.insertMany([data]);
        }
        res.status(200).json({
            Status: 'Success',
            Message: 'Inserted successfully!!!'
        })
    } catch (error) {
        console.log("error");
        res.status(200).json({
            Status: 'Failed',
            Message: 'Not Inserted!!!'
        })
    }
});

app.post('/delete', async (req,res) => {
    const {imdbID} = req.body;
    try {
        await MovieData.deleteOne({imdbID});
        res.status(200).json({
            Status: 'Success',
            Message: 'Deleted successfully!!!'
        })
    } catch (error) {
        console.log("error");
        res.status(200).json({
            Status: 'Failed',
            Message: 'Not Deleted!!!'
        })
    }
});

app.get('/favourite', async (req,res) => {
    try {
        const data= await MovieData.find({});
        res.status(200).json({
            data
        })
    } catch (error) {
        console.log("error");
        res.status(200).json({
            Status: 'Failed',
            Message: 'Not fetched!!!'
        })
    }
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})