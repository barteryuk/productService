// process.env.NODE_ENV = "test";
const fs = require("fs");
// const mongoose = require('mongoose')

// CHAI THINGY
const chai = require("chai");
const chaiHttp = require("chai-http");
var assert = chai.assert;    // Using Assert style
var expect = chai.expect;    // Using Expect style
var should = chai.should();  // Using Should style
var res
var errors

const app = require("../app.js");
const {ObjectId} = require("mongoose").Types;
const tesPropicPath = "/mnt/c/Users/sandbox/Documents/HACKTIV8/PHASE2R/nagamerah.png";
// const {
//     createToken
// } = require('../helpers/jwt')
const Product = require("../models/product");
// const request = require("supertest");
// const testUser = {
//     email: 'sample@mail.com',
//     password: 'hehehehe',
//     role: 'admin'
// }
let sampleProductId = "";
const testInput = {
    title: "Ukiran kayu",
    description: "naga merah",
    photo: tesPropicPath,
    value: 5000000,
    userId: "sample1",
};
let wrongInput = {};
var wrongId
// let errors = [];
let testToken;
var testurl = "http://localhost:4002";
var product

chai.use(chaiHttp);

describe("MICROSERVICES TEST", () => {
    //HOOKS
    // before((done) => {
    //     mongoose.connect("mongodb://localhost/productServiceTestDB", {
    //         useUnifiedTopology: true,
    //         useNewUrlParser: true,
    //         useCreateIndex: true,
    //         useFindAndModify: false,
    //     });
    //     const db = mongoose.connection;
    //     db.on("error", console.error.bind(console, "connection error"));
    //     db.once("open", () => {
    //         console.log("We are connected to productServiceTestDB!");
    //         done();
    //     });
    // });

    after(async () => {
        await Product.deleteMany({userId: testInput.userId});
    });

    // CREATE PRODUCT
    describe("ADD PRODUCT SERVICES TEST", () => {
        //SUCCESS
        it("create product success", async () => {
            try{

                res = await chai.request(app)
                    .post("/products/add")
                    // .type('form')
                    .field("title", testInput.title)
                    .field("description", testInput.description)
                    .field("value", testInput.value)
                    .field("userId", testInput.userId)
                    .attach("photo", tesPropicPath)

                expect(res).to.have.status(201);

                console.log("this is res.body create product");
                console.log(res.body);
                product = res.body.result

                sampleProductId = String(product._id)
                

                // EXPECT PROPERTIES: COMPULSTORY ONES
                expect(product).to.have.property('title')
                expect(product).to.have.property('value')
                expect(product).to.have.property('description')
                expect(product).to.have.property('userId')
                expect(product).to.have.property('photo')

                // EXPECT FORMAT
                expect(product.title).to.be.a('String')
                expect(product.description).to.be.a('String')
                expect(product.photo).to.be.a('String')
                expect(product.userId).to.be.a('String')
                expect(product.value).to.be.a('Number')

            }
            catch(err) {
                error = err
                console.log("this is error create product");
                console.error(error);
            }

        });

        // FAIL
        it("create product fail", async () => {

            try{
                res = await chai.request(app)
                    .post("/products/add")
                    // .type('form')
                    .field("title", '')
                    .field("description", testInput.description)
                    .field("value", -1)
                    .field("userId", testInput.userId)
                    .attach("photo", tesPropicPath)

            }
            catch(err) {
                error = err
                // console.log("WHAT IS ERROR IN CREATING?");
                // console.log(error);

                expect(error).to.have.property('code')
                expect(error).to.have.property('message')
                expect(error.code).to.be(400)
                expect(error.message).to.be.a('String')

            }

        });


    });


    // READ PRODUCT
    describe("READ PRODUCT SERVICES TEST", () => {
        //SUCCESS READ ALL
        it("read all products success", async () => {
            try{

                res = await chai.request(app)
                    .get("/products/getall")

                expect(res).to.have.status(200);

                console.log("this is res.body for read all products");
                console.log(res.body);
                product = res.body.data
                

                // EXPECT PROPERTIES: COMPULSTORY ONES
                expect(res.body).to.have.property('data')

                // EXPECT FORMAT
                expect(product).to.be.a('Array')

            }
            catch(err) {
                error = err
                console.log("this is error");
                console.error(error);
            }

        });


        //SUCCESS READ ONE
        it("read one success", async () => {
            try{

                res = await chai.request(app)
                    .get(`/products/getone/${sampleProductId}`)

                expect(res).to.have.status(200);

                console.log("this is res.body for read one product");
                console.log(res.body);
                product = res.body.data
                

                // EXPECT PROPERTIES: COMPULSTORY ONES
                expect(res.body).to.have.property('data')

                // EXPECT FORMAT
                expect(product).to.be.a('Object')

            }
            catch(err) {
                error = err
                console.log("this is error read one product");
                console.error(error);
            }

        });

    });
});
