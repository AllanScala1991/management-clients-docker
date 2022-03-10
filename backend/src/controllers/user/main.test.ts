import { UserController } from "."
import { IUser } from "../../interfaces/user"

let userID: string | undefined

describe("User Controller", () => {
    test("Should validate create user successfully", async () => {
        const user: IUser = {
            email: "any_email@mail.com",
            password: "any_password",
            username: "any username"
        }

        const createUser = await new UserController().createUser(user)

        expect(createUser.status).toBeTruthy
        expect(createUser.message).toEqual("Usuário registrado com sucesso.")
        expect(createUser.data).toHaveProperty("email")
        expect(createUser.data).toHaveProperty("password")
        expect(createUser.data).toHaveProperty("username")
        userID = createUser.data?.id
    })

    test("Should validate create user with empty value", async () => {
        const user: IUser = {
            email: "",
            password: "any_password",
            username: "any username"
        }

        const emptyUser = await new UserController().createUser(user)

        expect(emptyUser.status).toBeFalsy
        expect(emptyUser.message).toEqual("Todos os campos devem ser preenchidos.")
    })

    test("Should validate create existing user", async () => {
        const user: IUser = {
            email: "any_email@mail.com",
            password: "any_password",
            username: "any username"
        }

        const existingUser = await new UserController().createUser(user)

        expect(existingUser.status).toBeFalsy
        expect(existingUser.message).toEqual("Já existe um usuário com essas informações.")
    })

    test("Should validate invalid email", async () => {
        const user: IUser = {
            email: "any_emailmail.com",
            password: "any_password",
            username: "other username"
        }

        const invalidEmail = await new UserController().createUser(user)

        expect(invalidEmail.status).toBeFalsy
        expect(invalidEmail.message).toEqual("E-mail inválido, tente novamente.")
    })

    test("Should validate find user by ID", async () => {
        if(userID != undefined) {
            const findUserByID = await new UserController().findUserById(userID)

            expect(findUserByID.status).toBeTruthy
        }
    })

    test("Should validate find user with invalid ID", async () => {
        const findEmptyID = await new UserController().findUserById("")

        expect(findEmptyID.status).toBeFalsy
        expect(findEmptyID.message).toEqual("Usuário não localizado.")
    })

    test("Should validate find not existent user", async () => {
        const findNotExistentUser = await new UserController().findUserById("")

        expect(findNotExistentUser.status).toBeFalsy
        expect(findNotExistentUser.message).toEqual("Usuário não localizado.")
    })

    test("Should validate find user by Username", async () => {
        const findUserByUsername = await new UserController().findUserByUsername("any username")

        expect(findUserByUsername.status).toBeTruthy
        expect(findUserByUsername.data?.length).toBeGreaterThan(0)
    })

    test("Should validate find not existent user", async () => {
        const findNotExistentUser = await new UserController().findUserByUsername("83098928")

        expect(findNotExistentUser.status).toBeFalsy
        expect(findNotExistentUser.message).toEqual("Nenhum usuário localizado.")
    })

    test("Should validate update user", async () => {
        const user: IUser = {
            email: "any_email@mail.com",
            password: "any_password",
            username: "update username"
        }

        if(userID != undefined) {
            const updateUser = await new UserController().updateUser(user, userID)

            expect(updateUser.status).toBeTruthy
            expect(updateUser.message).toEqual("Usuário atualizado com sucesso.")
        }
    })

    test("Should validate update user with empty value", async () => {
        const user: IUser = {
            email: "",
            password: "any_password",
            username: "update username"
        }

        if(userID != undefined) {
            const updateUserWithEmptyValue = await new UserController().updateUser(user, userID)

            expect(updateUserWithEmptyValue.status).toBeFalsy
            expect(updateUserWithEmptyValue.message).toEqual("Todos os campos devem ser preenchidos.")
        }
    })

    test("Should validate update user with empty ID", async () => {
        const user: IUser = {
            email: "update_email@mail.com",
            password: "any_password",
            username: "update username"
        }

        const updateUserWithEmptyID = await new UserController().updateUser(user, "")

        expect(updateUserWithEmptyID.status).toBeFalsy
        expect(updateUserWithEmptyID.message).toEqual("Usuário não localizado.")
    })

    test("Should validate update with invalid email", async () => {
        const user: IUser = {
            email: "update_emailmail.com",
            password: "any_password",
            username: "update username"
        }

        if(userID != undefined) {
            const updateUserWithInvalidEmail = await new UserController().updateUser(user, userID)

            expect(updateUserWithInvalidEmail.status).toBeFalsy
            expect(updateUserWithInvalidEmail.message).toEqual("E-mail inválido, tente novamente.")
        }
    })

    test("Should validate delete user", async () => {

        if(userID != undefined) {
            const deleteUser = await new UserController().deleteUser(userID)

            expect(deleteUser.status).toBeTruthy
            expect(deleteUser.message).toEqual("Usuário deletado com sucesso.")
        }
    })

    test("Should validate delete user with invalid ID", async () => {
        const deleteUserWithInvalidID = await new UserController().deleteUser("")

        expect(deleteUserWithInvalidID.status).toBeFalsy
        expect(deleteUserWithInvalidID.message).toEqual("Usuário não localizado.")
    })
})