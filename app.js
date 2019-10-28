const yargs = require('yargs');
const { add, remove, get, getOne } = require('./grocerylistmodule');

yargs.version('1.1.1'); // sets version for the package. Can be seen on calling 'node app --version'

yargs.command(
    {
        command: 'add',
        describe: 'Add an item',
        builder: {
            particular: {
                describe: 'Item Name',
                demandOption: true, // required
                type: 'string' // data type
            },
            price: {
                describe: 'Item Price',
                demandOption: true, // required
                type: 'number' // data type
            },
            quantity: {
                describe: 'Item Quantity',
                demandOption: true, // required
                type: 'number' // data type
            }
        },
        handler: function (argv) {
            console.log(add(argv.particular, argv.quantity, argv.price));
            console.log("Item added!", "Item:", argv.particular, "Price: INR", argv.price, "Quantity:", argv.quantity, "gms");
        }
    }
);

yargs.command(
    {
        command: 'remove',
        describe: 'Remove an item',
        builder: {
            particular: {
                describe: 'Item Name',
                demandOption: true, // required
                type: 'string' // data type
            },
            quantity: {
                describe: 'Item Quantity',
                demandOption: true, // required
                type: 'number' // data type
            }
        },
        handler: function (argv) {
            console.log(remove(argv.particular, argv.quantity));
            console.log("Item removed!");
        }
    }
);

yargs.command(
    {
        command: 'view',
        describe: 'View all items',
        handler: function () {
            console.log(get());
            console.log("View items!");
        }
    }
);

yargs.command(
    {
        command: 'read',
        describe: 'Read a note',
        handler: function (argv) {
            console.log(getOne(argv.particular));
            console.log("Read an item!");
        }
    }
);

yargs.parse() // respond to command