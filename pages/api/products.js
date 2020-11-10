import { ApolloServer, gql } from 'apollo-server-micro'

import { connectToDatabase } from '../../utils/mongodb'

const typeDefs = gql`
    type Mutation {
        createProduct(title: String!, description: String!, published: Boolean!, username: String!): Product!
    }
    # A query root is required to make graphql actually work.
    type Query {
        readProducts: [Product]!
    }
    type Product {
        _id: ID
        title: String
        description: String
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
        async createProduct(_, { title, description, published, username }) {
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