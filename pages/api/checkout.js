const { STRIPE_SECRET_KEY } = process.env

const stripe = require('stripe')(`${STRIPE_SECRET_KEY}`)
stripe.api_version = '2020-08-27'

export default async function handler(req, res) {
    // res.statusCode = 200
    // res.setHeader('Content-Type', 'application/json')
    // res.end(JSON.stringify({ name: 'John Doe' }))
    const product = req.body
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['ideal'],
        line_items: [{
            price_data: {
                currency: product.price.currency,
                product_data: {
                    name: product.title,
                    // images: [product.photo],
                },
                unit_amount: product.price.amount * 100,
            },
            quantity: 1,
        }],
        mode: 'payment',
        success_url: `${req.headers.origin}?success=true`,
        cancel_url: `${req.headers.origin}?canceled=true`,
    })

    res.json({ id: session.id })
}
