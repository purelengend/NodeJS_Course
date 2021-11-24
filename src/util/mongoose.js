module.exports = {
    multipleMongooseToObject: function (moongoses) {
        return moongoses.map((mongoose) => mongoose.toObject());
    },
    mongooseToObject: function (mongoose) {
        return mongoose ? mongoose.toObject() : mongoose;
    },
};
