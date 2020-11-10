import { ApolloServer, gql } from 'apollo-server-micro'
import { ObjectID } from 'mongodb'

import { connectToDatabase } from '../../utils/mongodb'

const typeDefs = gql`
    type Mutation {
        createProduct(title: String!, description: String!, amount: Int!, currency: String!, photo: String! published: Boolean!, username: String!): Product!
    }
    # A query root is required to make graphql actually work.
    type Query {
        readProduct(_id: ID!): Product!
        readProducts: [Product]!
    }
    type Price {
        currency: String,
        amount: Int
    }
    type Product {
        _id: ID
        createdAt: String,
        title: String
        description: String
        photo: String
        price: Price
        published: Boolean
        user: User
    }
    type User {
        _id: ID
        email: String
        username: String
    }
`

const resolvers = {
    Mutation: {
        async createProduct(_, { title, description, amount, currency, photo, published, username }) {
            const { db } = await connectToDatabase()

            if (title.trim() === '') {
                throw new Error('Title must not be empty.')
            } else if (description.trim() === '') {
                throw new Error('Description must not be empty.')
            } else {
                const user = await db.collection('users').findOne({ username: username })

                const product = {
                    createdAt: new Date().toISOString(),
                    title,
                    description,
                    photo,
                    price: {
                        amount,
                        currency
                    },
                    published,
                    user: {
                        _id: user._id,
                        email: user.email,
                        username: user.username
                    }
                }

                await db.collection('products').insertOne(product)
                return {
                    _id: product._id,
                    createdAt: product.createdAt,
                    title,
                    description,
                    photo,
                    price: {
                        amount,
                        currency
                    },
                    published,
                    user: {
                        _id: user._id,
                        email: user.email,
                        username: user.username
                    }
                }
            }
        }
    },
    Query: {
        async readProduct(_, { _id }) {
            const { db } = await connectToDatabase()

            const product = await db.collection('products').findOne({ _id: ObjectID(_id), published: true })
            return product
        },
        async readProducts() {
            const { db } = await connectToDatabase()

            const products = await db.collection('products').find({ published: true }).sort({ createdAt: -1 }).limit(10).toArray()
            return products
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
export default apolloServer.createHandler({ path: '/api/products' })