const mongoose = require('mongoose');

const ProductScheema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Por favor,adicione um nome'],
        unique: true,
        trim: true,
        maxlength: [50, 'O nome não pode ter mais que 50 caracteres']
    },
    description: {
        type: String,

        maxlength: [500, 'Description can not be more than 500 characters']
    },
    price: {
        type: Number,
        min: 0.00,
        required: [true, 'Por favor, adicione um preço positivo']
    },
    quantity: {
        type: Number,
        min: 0,
        required: [true, 'Por favor, adicione uma quantidade positiva']
    }

});

module.exports = mongoose.model('Product', ProductScheema);