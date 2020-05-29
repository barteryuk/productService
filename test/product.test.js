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
    UserId: "sample1",
};
let wrongInput = {};
let errors = [];
let testToken;
var testurl = "http://localhost:4002";

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

    after(() => {
        Product.deleteMany({});
    });

    // REAL TEST BEGIN HERE
    describe("PRODUCT SERVICES TEST", () => {
        //ADD PRODUCT
        it("create product success", async () => {
            // let body = {
            //     name: 'test',
            //     qty: 10,
            //     description: 'String, min: 50, max: 150, required',
            //     price: 5000,
            //     categories: 'test'
            // }
            // let headers = { token }

            // await chai.request(testurl)
            res = await chai.request(app)
            // return chai.request(app)
                .post("/products/add")
                // .type('form')
                .field("title", testInput.title)
                .field("description", testInput.description)
                .field("value", testInput.value)
                .field("UserId", testInput.UserId)
                .attach("photo", tesPropicPath)
                // .end((err, res) => {

                //     if(err) {
                //         return done(err)
                //     }

                //     let product = res.body;
                //     console.log("RES STATUS IS");
                //     console.log(res.status);
                //     console.log("RES BODY IS");
                //     console.log(product);
                //     expect(res).to.have.status(201);
                //     // productId = product._id
                //     // expect(product).to.have.property('name')
                //     // expect(product).to.have.property('qty')
                //     // expect(product).to.have.property('description')
                //     // expect(product).to.have.property('image')
                //     // expect(product).to.have.property('category')
                //     // expect(product).to.have.property('price')
                //     // expect(product.name).to.be.a('String')
                //     // expect(product.description).to.be.a('String')
                //     // expect(product.image).to.be.a('String')
                //     // expect(product.category).to.be.a('String')
                //     // expect(product.qty).to.be.a('Number')
                //     // expect(product.price).to.be.a('Number')
                //     // sampleProductId = ObjectId(product._id);
                //     return done();
                // })
                // .catch((err) => {
                //     throw err;
                // });

                expect(res).to.have.status(201);          

                // done()
        });
    });
});

// // REAL TESTING BEGIN
// describe("PRODUCT SERVICES TEST", () => {
//     // // HOOKS
//     // before(function () {
//     //     return Product.deleteMany({})
//     // })

//     before((done) => {
//         mongoose.connect("mongodb://localhost/productServicesTestDB", {
//             useUnifiedTopology: true,
//             useNewUrlParser: true,
//             useCreateIndex: true,
//             useFindAndModify: false,
//         });
//         const db = mongoose.connection;
//         db.on("error", console.error.bind(console, "connection error"));
//         db.once("open", () => {
//             console.log("We are connected to userServiceTestDB!");
//             done();
//         });
//     });

//     // PRODUCT CREATE SUCCESS
//     describe("Success add product", () => {
//         describe("POST /products ", () => {
//             test("Should return status 201 with object of id, title, description, photo, value  & owner", (done) => {
//                 request(app)
//                     .post("/products/add")
//                     // .set({
//                     //     access_token: testToken
//                     // })
// .field("title", testInput.title)
// .field("description", testInput.description)
// .field("value", testInput.value)
// .field("UserId", testInput.UserId)
//                     .attach("photo", testInput.photo)
//                     .end((error, response) => {
//                         if (error) {
//                             return done(error);
//                         } else {
//                             console.log("RESPONSE STATUS FOR ADD PRODUCT SUCCESS IS");
//                             console.log(response.status);
//                             console.log("RESPONSE BODY FOR ADD PRODUCT SUCCESS IS");
//                             console.log(response.body);

//                             expect(response.status).to.be(201);

//                             // expect(response.body).toHaveProperty('id', expect.any(Number))
//                             // expect(response.body).toHaveProperty('name', testInput.name)
//                             // expect(response.body).toHaveProperty('description', testInput.description)
//                             // expect(response.body).toHaveProperty('category', testInput.category)
//                             // expect(response.body).toHaveProperty('image_url', expect.any(String))
//                             // expect(response.body).toHaveProperty('price', testInput.price)
//                             // expect(response.body).toHaveProperty('stock', testInput.stock)

//                             sampleProductId = ObjectId(response.body._id);

//                             return done();
//                         }
//                     });
//             });
//         });
//     });

//     // // PRODUCT CREATE ERROR
//     // describe('Error add product', () => {
//     //     describe('POST /products ', () => {

//     //         test('Should return status 400 because of invalid name, category, price & stock (negative numbers)', (done) => {
//     //             wrongInput = {
//     //                 name: null,
//     //                 description: 'adadeh',
//     //                 category: 'narkoba',
//     //                 image_url: '/mnt/c/Users/sandbox/Documents/HACKTIV8/PHASE2R/obat_bebas_terbatas.jpg',
//     //                 price: -2000,
//     //                 stock: -2000
//     //             }
//     //             errors = [
//     //                 // 'NAME REQUIRED',
//     //                 'PLEASE ENTER VALID DRUG CATEGORY',
//     //                 'PRICE MUST BE NON-NEGATIVE',
//     //                 'STOCK MUST BE NON-NEGATIVE'
//     //             ]
//     //             request(app)
//     //                 .post('/products/')
//     //                 .set({
//     //                     access_token: testToken
//     //                 })
//     //                 // .send(wrongInput)
//     //                 .field("name", "")
//     //                 .field("description", wrongInput.description)
//     //                 .field("category", wrongInput.category)
//     //                 .attach("imageSrc", tesPropicPath)
//     //                 .field("price", wrongInput.price)
//     //                 .field("stock", wrongInput.stock)
//     //                 .end((error, response) => {
//     //                     if (error) {
//     //                         return done(error)
//     //                     } else {

//     //                         // console.log("RESPONSE STATUS FOR ADD PRODUCT ERROR IS");
//     //                         // console.log(response.status);
//     //                         // console.log("RESPONSE BODY FOR ADD PRODUCT ERROR IS");
//     //                         // console.log(response.body);

//     //                         expect(response.status).toBe(400)
//     //                         expect(response.body).toHaveProperty('errors', errors)
//     //                         // expect(response.body).toHaveProperty('errors', expect.any(Array))
//     //                         return done()
//     //                     }
//     //                 })
//     //         })

//     //     })
//     // })

//     // // GET ALL PRODUCTS SUCCESS
//     // describe('Success get all product', () => {
//     //     describe('GET /products ', () => {

//     //         test('Should return status 200  with object of array of all mercs', (done) => {
//     //             request(app)
//     //                 .get('/products')
//     //                 .set({
//     //                     access_token: testToken
//     //                 })
//     //                 .end((error, response) => {
//     //                     if (error) {
//     //                         return done(error)
//     //                     } else {

//     //                         // console.log(response.status);
//     //                         // console.log(response.body);

//     //                         expect(response.status).toBe(200)

//     //                         expect(response.body).toHaveProperty('data', expect.any(Array))

//     //                         return done()
//     //                     }
//     //                 })
//     //         })

//     //     })
//     // })

//     // // GET ONE PRODUCT SUCCESS
//     // describe('Success get ONE product', () => {
//     //     describe('GET /products/:id ', () => {

//     //         test('Should return status 200  with object of id, name, description, category, price & stock', (done) => {
//     //             request(app)
//     //                 .get(`/products/${sampleProductId}`)
//     //                 .set({
//     //                     access_token: testToken
//     //                 })
//     //                 .end((error, response) => {
//     //                     if (error) {
//     //                         return done(error)
//     //                     } else {

//     //                         // console.log(response.status);
//     //                         // console.log(response.body);

//     //                         expect(response.status).toBe(200)

//     //                         expect(response.body).toHaveProperty('id', expect.any(Number))
//     //                         expect(response.body).toHaveProperty('name', testInput.name)
//     //                         expect(response.body).toHaveProperty('description', testInput.description)
//     //                         expect(response.body).toHaveProperty('category', testInput.category)
//     //                         expect(response.body).toHaveProperty('image_url', expect.any(String))
//     //                         expect(response.body).toHaveProperty('price', testInput.price)
//     //                         expect(response.body).toHaveProperty('stock', testInput.stock)

//     //                         return done()
//     //                     }
//     //                 })
//     //         })

//     //     })
//     // })

//     // // GET ONE PRODUCT FAIL
//     // describe('FAIL get ONE product', () => {
//     //     describe('GET /products/:id ', () => {

//     //         test('Should return error 404 because ID not found', (done) => {
//     //             errors = ['NOT FOUND']
//     //             request(app)
//     //                 .get(`/products/${-100000000000}`)
//     //                 .set({
//     //                     access_token: testToken
//     //                 })
//     //                 .end((error, response) => {
//     //                     if (error) {
//     //                         return done(error)
//     //                     } else {

//     //                         // console.log(response.status);
//     //                         // console.log(response.body);

//     //                         expect(response.status).toBe(404)
//     //                         expect(response.body).toHaveProperty('errors', errors)

//     //                         return done()
//     //                     }
//     //                 })
//     //         })

//     //     })
//     // })

//     // // PRODUCT EDIT SUCCESS
//     // describe('Success edit product', () => {
//     //     describe('PUT /products ', () => {

//     //         test('Should return status 200 with UPDATED object of id, name, description, category, price & stock', (done) => {
//     //             // TEST EDIT
//     //             let testEdit = {
//     //                 name: 'Codipront',
//     //                 description: 'codein 40mg',
//     //                 category: 'prescription',
//     //                 image_url: '/mnt/c/Users/sandbox/Documents/HACKTIV8/PHASE2R/obat_bebas_terbatas.jpg',
//     //                 price: 80000,
//     //                 stock: 6000
//     //             }

//     //             request(app)
//     //                 .put(`/products/${sampleProductId}`)
//     //                 .set({
//     //                     access_token: testToken
//     //                 })
//     //                 // .send(testEdit)
//     //                 .field("name", testEdit.name)
//     //                 .field("description", testEdit.description)
//     //                 .field("category", testEdit.category)
//     //                 .attach("imageSrc", testEdit.image_url)
//     //                 .field("price", testEdit.price)
//     //                 .field("stock", testEdit.stock)
//     //                 .end((error, response) => {
//     //                     if (error) {
//     //                         return done(error)
//     //                     } else {

//     //                         console.log("RESPONSE STATUS FOR EDIT PRODUCT SUCCESS IS");
//     //                         console.log(response.status);
//     //                         console.log("RESPONSE BODY FOR EDIT PRODUCT SUCCESS IS");
//     //                         console.log(response.body);

//     //                         expect(response.status).toBe(200)

//     //                         expect(response.body).toHaveProperty('id', expect.any(Number))
//     //                         expect(response.body).toHaveProperty('name', testEdit.name)
//     //                         expect(response.body).toHaveProperty('description', testEdit.description)
//     //                         expect(response.body).toHaveProperty('category', testEdit.category)
//     //                         expect(response.body).toHaveProperty('image_url', expect.any(String))
//     //                         expect(response.body).toHaveProperty('price', testEdit.price)
//     //                         expect(response.body).toHaveProperty('stock', testEdit.stock)

//     //                         return done()
//     //                     }
//     //                 })
//     //         })

//     //     })
//     // })

//     // // PRODUCT EDIT FAIL
//     // describe('FAILED edit product', () => {
//     //     describe('PUT /products ', () => {

//     //         test('Should return error 400 because of wrong name, category, stock & price', (done) => {
//     //             // TEST EDIT
//     //             let wrongEdit = {
//     //                 name: '',
//     //                 description: 'codein 40mg',
//     //                 category: 'narkoba',
//     //                 image_url: '',
//     //                 price: -80000,
//     //                 stock: -6000
//     //             }

//     //             errors = [
//     //                 // 'NAME REQUIRED',
//     //                 'PLEASE ENTER VALID DRUG CATEGORY',
//     //                 'PRICE MUST BE NON-NEGATIVE',
//     //                 'STOCK MUST BE NON-NEGATIVE'
//     //             ]

//     //             request(app)
//     //                 .put(`/products/${sampleProductId}`)
//     //                 .set({
//     //                     access_token: testToken
//     //                 })
//     //                 // .send(wrongEdit)
//     //                 .field("name", wrongEdit.name)
//     //                 .field("description", wrongEdit.description)
//     //                 .field("category", wrongEdit.category)
//     //                 .attach("imageSrc", wrongEdit.image_url)
//     //                 .field("price", wrongEdit.price)
//     //                 .field("stock", wrongEdit.stock)
//     //                 .end((error, response) => {
//     //                     if (error) {
//     //                         return done(error)
//     //                     } else {

//     //                         console.log(response.status);
//     //                         console.log(response.body);

//     //                         expect(response.status).toBe(400)
//     //                         // expect(response.body).toHaveProperty('errors', expect.any(Array))
//     //                         expect(response.body).toHaveProperty('errors', errors)

//     //                         return done()
//     //                     }
//     //                 })
//     //         })

//     //     })
//     // })

//     // // DELETE ONE PRODUCT SUCCESS
//     // describe('Success delete ONE product', () => {
//     //     describe('DELETE /products/:id ', () => {

//     //         test('Should return status 200  with object of id, name, description, category, price & stock', (done) => {
//     //             // let msg = 'PRODUCT Panadol DROPPED FROM STORE INVENTORY'
//     //             request(app)
//     //                 .delete(`/products/${sampleProductId}`)
//     //                 .set({
//     //                     access_token: testToken
//     //                 })
//     //                 .end((error, response) => {
//     //                     if (error) {
//     //                         return done(error)
//     //                     } else {

//     //                         // console.log(response.status);
//     //                         // console.log(response.body);

//     //                         expect(response.status).toBe(200)
//     //                         expect(response.body).toHaveProperty('message', expect.any(String))

//     //                         return done()
//     //                     }
//     //                 })
//     //         })

//     //     })
//     // })

//     // // DELETE ONE PRODUCT FAIL
//     // describe('FAIL deleting ONE product', () => {
//     //     describe('DELETE /products/:id ', () => {

//     //         test('Should return error 404 because ID not found', (done) => {
//     //             errors = ['NOT FOUND']
//     //             request(app)
//     //                 .delete(`/products/${-700000000000}`)
//     //                 .set({
//     //                     access_token: testToken
//     //                 })
//     //                 .end((error, response) => {
//     //                     if (error) {
//     //                         return done(error)
//     //                     } else {

//     //                         // console.log(response.status);
//     //                         // console.log(response.body);

//     //                         expect(response.status).toBe(404)
//     //                         expect(response.body).toHaveProperty('errors', errors)

//     //                         return done()
//     //                     }
//     //                 })
//     //         })

//     //     })
//     // })
// });
