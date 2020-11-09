const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
import { ApolloServer, gql } from 'apollo-server-micro'

import { connectToDatabase } from '../../utils/mongodb'

const { JWT_SECRET_KEY } = process.env

const generateToken = (user) => {
    return jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username
    // The secret key should be hidden in .env though is placed here for convenience. 
    }, JWT_SECRET_KEY, {
        expiresIn: '1h'
    })
}

const typeDefs = gql`
    type Mutation {
        createUser(email: String!, username: String!, password: String!, passwordConfirm: String!): User!
    }
    # A query root is required to make graphql actually work.
    type Query {
        validateUser(username: String!, password: String!): User!
    }
    type User {
        _id: ID
        email: String
        token: String
        username: String
    }
`

const resolvers = {
    Mutation: {
        async createUser(_, { email, username, password, passwordConfirm }) {
            const { db } = await connectToDatabase()
            const emailRegEx = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

            if (username.trim() === '') {
                throw new Error('Username must not be empty.')
            } else if (email.trim() === '') {
                throw new Error('Email must not be empty.')
            } else if (!email.match(emailRegEx)) {
                throw new Error('Email must be a valid email address.')
            } else if (password === '') {
                throw new Error('Password must not be empty.')
            } else if (password !== passwordConfirm) {
                throw new Error ('Passwords should match.')
            } else {
                const encrypt = await bcrypt.hash(password, 12)
                try { 
                    const user = {
                        createdAt: new Date().toISOString(),
                        email,
                        username, 
                        password: encrypt
                    }        
                    await db.collection('users').insertOne(user)
                    const token = generateToken({
                        _id: user._id,
                        email: user.email,
                        username: user.username
                    })
                    return {
                        _id: user._id,
                        createdAt: user.createdAt,
                        email,
                        token,
                        username, 
                    }
                } catch(error) {
                    throw new Error(error)
                }
            }            
        }
    },
    Query: {
        async validateUser(_, { username, password }) {
            const { db } = await connectToDatabase()

            if (username.trim() === '') {
                throw new Error('Username must not be empty.')
            } else if (password.trim() === '') {
                throw new Error('Password must not be empty.')
            } else {
                const user = await db.collection('users').findOne({ username: username })

                if (!user) {
                    throw new Error('User has not been found, please verify.')
                }
    
                const match = await bcrypt.compare(password, user.password)
                if (!match) {
                    throw new Error('Password is not correct, please verify.')
                }
    
                const token = generateToken({
                    _id: user._id,
                    email: user.email,
                    username: user.username
                })
    
                return {
                    _id: user._id,
                    createdAt: user.createdAt,
                    email: user.email,
                    token,
                    username: user.username, 
                }   
            }
        }
    }
}

const apolloServer = new ApolloServer({ typeDefs, resolvers })

export const config = {
    api: {
        bodyParser: false
    }
}

// Ensure to put a slash as the first character to prevent errors.
export default apolloServer.createHandler({ path: '/api/users' })