import bcrypt from 'bcryptjs';

const data = {
    users: [ 
        {
            name: 'John',
            email: 'admin@example.com',
            password: bcrypt.hashSync('123456'),
            isAdmin: true,
        },
        {
            name: 'Jack',
            email: 'user@example.com',
            password: bcrypt.hashSync('123456'),
            isAdmin: false,
        },
    ],
    products: [
        {
            name: 'Ring',
            slug: 'ring-1',
            category: "Rings",
            image: '/images/ring1.jpg',
            price: 120,
            brand: 'Nike',
            rating: 4.5,
            reviews: 8,
            countInStock: 20,
            description: 'A very cool ring',
        },
        {
            name: 'Second ring',
            slug: 'ring-2',
            category: "Rings",
            image: '/images/ring2.jpg',
            price: 100,
            brand: 'Nike',
            rating: 4.5,
            reviews: 3,
            countInStock: 20,
            description: 'the 2nd cool ring',
        },
        {
            name: 'Necklace',
            slug: 'necklace-1',
            category: "Necklace",
            image: '/images/necklace1.jpg',
            price: 70,
            brand: 'Nike',
            rating: 4.5,
            reviews: 8,
            countInStock: 10,
            description: 'A very cool Necklace',
        },
        {
            name: '2nd Necklace',
            slug: 'necklace-2',
            category: "Necklace",
            image: '/images/necklace2.jpg',
            price: 80,
            brand: 'Nike',
            rating: 4.5,
            reviews: 8,
            countInStock: 5,
            description: 'Another Cool Necklace',
        },
        {
            name: 'Bracelet',
            slug: 'Bracelet-1',
            category: "Bracelets",
            image: '/images/bracelet1.jpg',
            price: 120,
            brand: 'Nike',
            rating: 4.5,
            reviews: 8,
            countInStock: 20,
            description: 'A very cool Bracelet',
        },
        {
            name: '2nd Bracelet',
            slug: 'Bracelet-2',
            category: "Bracelets",
            image: '/images/bracelet2.jpg',
            price: 50,
            brand: 'Nike',
            rating: 4.5,
            reviews: 8,
            countInStock: 20,
            description: 'The 2nd cool Bracelet',
        }
    ]
}

export default data