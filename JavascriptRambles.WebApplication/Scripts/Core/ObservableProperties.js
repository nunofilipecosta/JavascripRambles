var Book = function (name, price) {

    var priceChanging = [],
        priceChanged = [];

    this.name = function (val) {

        return name;
    };

    this.price = function (val) {
        if (val !== undefined && val !== price) {
            for (var i = 0; i < priceChanging.length; i++) {
                if (!priceChanging[i](this, val)) {
                    return price;
                }
            }
            price = val;
            for (var j = 0; j < priceChanged.length; j++) {
                priceChanged[j](this);
            }
        }
        return price;
    };

    this.onPriceChanging = function (callback) {
        priceChanging.push(callback);
    };

    this.onPriceChanged = function (callback) {
        priceChanged.push(callback);
    };
};


var currentBook = new Book('Javascript The good parts', 23.99);

console.log("Name : " + currentBook.name());

console.log("Price : " + currentBook.price());

currentBook.onPriceChanged(function (b, price) {
    if (price > 100) {
        console.log('system errors');
        return false;
    }
    return true;
});


currentBook.onPriceChanged(function (b) {
    console.log('New Price : $', b.price());
});


currentBook.price(19.99);
currentBook.price(199.00);
