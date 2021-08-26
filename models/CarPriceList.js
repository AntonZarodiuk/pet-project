const mongoose = require('mongoose');

const CarListSchema = new mongoose.Schema({
    model: String,
    prices: Map
});

const CarListModel = mongoose.model('CarList', CarListSchema);

CarListModel.sendData = async (data) => {
    try {
        const { model, minPrice, maxPrice, averagePrice, date } = data;
        const candidate = await CarListModel.findOne({ model });
        const prices = { minPrice, maxPrice, averagePrice };
        const last = candidate.prices.size - 1;
        
        if (!candidate) {
            let car = new CarListModel({ model, prices: new Map().set(date, prices) });
            car.save();
        } else {
            const values = Array.from(candidate.prices.values());
            if (
                candidate &&
                (values[last].minPrice !== minPrice ||
                values[last].maxPrice !== maxPrice ||
                values[last].averagePrice !== averagePrice)
            ) {
                console.log("Adding: ", prices)
                candidate.prices.set(date, prices);
                candidate.save();
            }
        }
    } catch (err) {
        console.log('Error');
        console.log(err.message)
    }
};

CarListModel.getData = async (model) => {
    const result = await CarListModel.findOne({ model });
    return result
}

module.exports = CarListModel;