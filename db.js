const mongoose = require("mongoose");
let options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
};
const connect = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL, options);
        // console.log("Database connected");
        return "Orbits Database Connected!";
    } catch (error) {
        // console.log(`Database not connected\n${error}`);
        return `Database not connected! ${error}`;
    }
};

module.exports = connect;
