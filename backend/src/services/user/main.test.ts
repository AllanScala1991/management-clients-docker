import { UserService } from "."

let userId: string

describe("User Service", () => {
    test("Should validate create user successfully", async () => {
        const user = await new UserService().createUser({
            username: "any user",
            password: "any_password",
            email: "anymail@mail.com"
        })

        expect(user).not.toBeNull
        expect(user).toHaveProperty("id")
        expect(user).toHaveProperty("username")
        expect(user).toHaveProperty("password")
        expect(user).toHaveProperty("email")
    })

    test("Should validate find user by username", async () => {
        const user = await new UserService().findUserByUsername("any user")

        expect(user).not.toBeNull
        expect(user[0].email).toEqual("anymail@mail.com")

        userId = user[0].id
    })

    test("Should validate find user by ID", async () => {
        const user = await new UserService().findUserById(userId)

        expect(user).not.toBeNull
        expect(user[0].email).toEqual("anymail@mail.com")
    })

    test("Should validate update username", async () => {
        const user = await new UserService().updateUser({
            username: "update username",
            password: "any_password",
            email: "anymail@mail.com"
        }, userId)

        expect(user).not.toBeNull
        expect(user.username).toEqual("update username")
        expect(user.id).toEqual(userId)
    })

    test("Should validate delete user", async () => {
        const user = await new UserService().deleteUser(userId)

        expect(user).not.toBeNull
        expect(user.id).toEqual(userId)
    })
})