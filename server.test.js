import { test, describe, it } from "node:test"
import assert from "node:assert/strict"
import request from "supertest"
import app from "./src/app.js"

test("POST /register creates a user and returns 201", async () => {
    const res = await request(app)
        .post("/register")
        .send({ username: "azlan", password: "secret123" })

    assert.equal(res.status, 201)

})

test("POST /register returns 400 when username or password is missing", async () => {
    const res = await request(app).post("/register").send({ username: "azlan" })

    assert.equal(res.status, 401)
})

test("POST /register returns 409 when username already exists", async () => {
    await request(app).post("/register").send({ username: "azlan", password: "a" })
    const res = await request(app).post("/register").send({ username: "azlan", password: "b" })

    assert.equal(res.status, 409)
})




describe(`testing the logic for login`, () => {
    it(`test for non existant user` , async () => {
        //dont have any previous input and just query azlan
        const res = await request(app).post("/login").send({ username: "ghost", password: "secret123" })

        assert.equal(res.status, 401)
    })
    it(`test for existent user` , async () => {
        //create user using register and then login
        await request(app).post("/register").send({ username: "loginuser", password: "secret123" })
        const res = await request(app).post("/login").send({ username: "loginuser", password: "secret123" })

        assert.equal(res.status, 200)
        assert.ok(res.body.Token)
    })
    it(`test for malformed input` , async () => {
        //missing password
        const res = await request(app).post("/login").send({ username: "loginuser" })

        assert.equal(res.status, 400)
    })
}) 


describe(`Testing the deposit`, () => {
    //register a user and grab their token for the valid jwt tests
    const getToken = async (username) => {
        const res = await request(app).post("/register").send({ username, password: "secret123" })
        return res.body.token
    }//scary we are using someone elses token (highly illegal)

    it('no jwt in request', async () =>{
        const res = await request(app).post("/userFunction/deposit").send({ amount: 100 })

        assert.equal(res.status, 401)
    })
    it('invalid/corrupted jwt' , async() =>{
        const res = await request(app)
            .post("/userFunction/deposit")
            .set("Authorization", "not.a.realtoken")
            .send({ amount: 100 })

        assert.equal(res.status, 403)
    })
    //now its all valid jwt
    it('no deposit amount', async () =>{
        const token = await getToken("depositnoamount")
        const res = await request(app)
            .post("/userFunction/deposit")
            .set("Authorization", `${token}`)
            .send({})

        assert.equal(res.status, 400)
    })
    it('negative value for deposit', async () =>{
        const token = await getToken("depositnegative")
        const res = await request(app)
            .post("/userFunction/deposit")
            .set("Authorization", `Bearer ${token}`)
            .send({ amount: -50 })

        assert.equal(res.status, 400)
    })
})
