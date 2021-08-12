// const mongoose = require("mongoose");

// if (process.argv.length < 3) {
//     console.log("give password as argument");
//     process.exit(1);
// }

// // const password = process.argv[2];

// const url = `NO REAL MONGO URL`;

// mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

// const personchema = new mongoose.Schema({
//     name: String,
//     number: String,
// });

// // const Persona = mongoose.model("Persona", personchema);

// if (process.argv.length > 3) {
//     const name = process.argv[3];
//     const number = process.argv[4];
//     const person = new Person({ name, number });

//     person.save().then((response) => {
//         console.log(
//             `added ${person.name} number ${person.number} to phonebook`
//         );
//         mongoose.connection.close();
//     });
// } else {
//     Person.find({}).then((result) => {
//         console.log("phonebook:");
//         result.forEach((person) => {
//             console.log(person.name, person.number);
//         });
//         mongoose.connection.close();
//     });
// }
