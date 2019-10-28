const fs = require('fs');

exports.add = async (item, qty, price) => {
    if (typeof item !== "string" || isNaN(Number(qty)) || isNaN(Number(price))) {
        return { message: "Incorrect values", status: 500 }
    }
    const lowerItem = item.toLowerCase();
    try {
        const data = fs.readFileSync('./grocerylist.txt', { encoding: "utf8" });
        if (data) { // if file there

            let jsonData = JSON.parse(data); // string to json object

            let hasItem = false; // check for if item exists
            jsonData.some(obj => {
                if (obj.item.toLowerCase() === lowerItem) { // if item exists
                    hasItem = true;
                    obj.qty += qty; // increase qty
                    obj.price += price; // increase price
                }
            });

            if (!hasItem) { // if item does not exist
                jsonData.push({ item: item, qty: qty, price: price }); // add item
            }

            try {
                fs.writeFileSync('./grocerylist.txt', JSON.stringify(jsonData)); // write back to file
                return { message: "success", status: 201 }; // end success
            } catch (err) {
                console.error("Error while updating file"); // end failed
            }
        } else { // else if file is blank
            try {
                fs.writeFileSync('./grocerylist.txt', JSON.stringify([{ item: lowerItem, qty: qty, price: price }])); // write to file first object
                return { message: "success", status: 201 }; // end success
            } catch (err) {
                console.error("Error while writing to file"); // end failed
            }
        }
    } catch (err) { // else if file not there
        try {
            fs.writeFileSync('./grocerylist.txt', JSON.stringify([{ item: item, qty: qty, price: price }])); // write to file first object
            return { message: "success", status: 201 }; // end success
        } catch (err) {
            console.error("Error while creating file"); // end failed
        }
    }
}

exports.remove = (item, qty) => {
    if (typeof item !== "string" || isNaN(Number(qty))) {
        return { message: "Incorrect values", status: 500 }
    }
    const lowerItem = item.toLowerCase();
    try {
        const data = fs.readFileSync('./grocerylist.txt', { encoding: "utf8" });
        if (data) { // if file there
            let jsonData = JSON.parse(data); // string to json object

            const index = jsonData.findIndex(obj => {
                return obj.item.toLowerCase() === lowerItem;
            });
            if (index !== -1) {
                console.log("INDEX:", index)
                const obj = jsonData[index];
                const subPrice = obj.price / (obj.qty / qty);
                obj.qty -= qty; // deduct qty
                obj.price -= subPrice; // deduct from price
                if (obj.qty < 1) {
                    jsonData.splice(index, 1);
                }
                try {
                    fs.writeFileSync('./grocerylist.txt', JSON.stringify(jsonData)); // write back to file
                    return { message: "success", status: 200 }; // end success
                } catch (err) {
                    console.error("Error while updating file"); // end failed
                }
            }

            return { message: "success", status: 200 }; // end success

        } else { // else if file is blank
            return { message: "success", status: 200 }; // end success
        }
    } catch (err) { // else if file not there
        return { message: "File does not exist", status: 500 }; // end failed
    }
}

exports.get = () => {
    try {
        const data = fs.readFileSync('./grocerylist.txt', { encoding: "utf8" });
        return data;
    } catch (err) {
        return { message: "File does not exist", status: 500 }; // end failed
    }
}

exports.getOne = (item) => {
    if (typeof item !== "string") {
        return { message: "Incorrect item name", status: 500 }
    }
    const lowerItem = item.toLowerCase();
    try {
        const data = fs.readFileSync('./grocerylist.txt', { encoding: "utf8" });
        if (data) {
            let jsonData = JSON.parse(data);

            const index = jsonData.findIndex(obj => {
                return obj.item.toLowerCase() === lowerItem;
            });
            if (index !== -1) {
                return { message: "success", status: 200, data: JSON.stringify(jsonData[index]) }; // end success
            }

            return { message: "Item not found.", status: 200 }

        } else {
            return { message: "Item not found.", status: 200 }; // end success
        }
    } catch (err) {
        return { message: "File does not exist", status: 500 }; // end failed
    }
}