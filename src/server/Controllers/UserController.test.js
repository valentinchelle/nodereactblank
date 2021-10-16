const UserController = require("./UserController")
// @ponicode
describe("authenticate", () => {
    let inst

    beforeEach(() => {
        inst = new UserController()
    })

    test("0", () => {
        let callFunction = () => {
            inst.authenticate({ body: { email: "TestUpperCase@Example.com", password: "$p3onyycat" } }, { status: () => 500, send: () => true })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            inst.authenticate({ body: { email: "TestUpperCase@Example.com", password: "accessdenied4u" } }, { status: () => 500, send: () => false })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            inst.authenticate({ body: { email: "bed-free@tutanota.de", password: "!Lov3MyPianoPony" } }, { status: () => 200, send: () => true })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            inst.authenticate({ body: { email: "something.example.com", password: "!Lov3MyPianoPony" } }, { status: () => 404, send: () => false })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            inst.authenticate({ body: { email: "email@Google.com", password: "NoWiFi4you" } }, { status: () => 429, send: () => true })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            inst.authenticate({}, { status: () => -Infinity, send: () => true })
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("register", () => {
    let inst

    beforeEach(() => {
        inst = new UserController()
    })

    test("0", () => {
        let callFunction = () => {
            inst.register({ body: { email: "TestUpperCase@Example.com", username: 123, password: "NoWiFi4you" } }, { send: () => 500, status: () => 404, sendStatus: () => 404 })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            inst.register({ body: { email: "user@host:300", username: 123, password: "accessdenied4u" } }, { send: () => 400, status: () => 400, sendStatus: () => 404 })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            inst.register({ body: { email: "TestUpperCase@Example.com", username: "user-name", password: "accessdenied4u" } }, { send: () => 404, status: () => 429, sendStatus: () => 200 })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            inst.register({ body: { email: "TestUpperCase@Example.com", username: "username", password: "!Lov3MyPianoPony" } }, { send: () => 429, status: () => 404, sendStatus: () => 400 })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            inst.register({ body: { email: "bed-free@tutanota.de", username: "user_name", password: "$p3onyycat" } }, { send: () => 429, status: () => 500, sendStatus: () => 400 })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            inst.register(undefined, undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("silentAuth", () => {
    let inst

    beforeEach(() => {
        inst = new UserController()
    })

    test("0", () => {
        let callFunction = () => {
            inst.silentAuth({ body: { token: "new" }, query: { token: "..." } }, { status: () => 400, send: () => false })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            inst.silentAuth({ body: { token: "):" }, query: { token: "==" } }, { status: () => 200, send: () => false })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            inst.silentAuth({ body: { token: "{" }, query: { token: "#" } }, { status: () => 500, send: () => true })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            inst.silentAuth({ body: { token: "," }, query: { token: ")" } }, { status: () => 429, send: () => false })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            inst.silentAuth({ body: { token: "~@" }, query: { token: "-" } }, { status: () => 429, send: () => false })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            inst.silentAuth(undefined, undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
