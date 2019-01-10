/**
 * Export a set of queries to be executed on the database `products` table
 * @type {Object}
 */

module.exports = {
  findAll: 'SELECT * FROM products LIMIT 1, 500',
  findAllPaginated: 'SELECT * FROM products LIMIT ?, 10',
  findAllInStock: 'SELECT * FROM products WHERE inventory_count > 0',
  findAllInStockPaginated: 'SELECT * FROM products WHERE inventory_count > 0 LIMIT ?, 20',
};

// {"RandL":{"items":["apple","bag","balloon","bananas","bed","beef","blouse","book","bookmark","boom box","bottle","bottle cap","bow","bowl","box","bracelet","bread","brocolli","hair brush","buckel","button","camera","candle","candy wrapper","canvas","car","greeting card","playing card","carrots","cat","CD","cell phone","packing peanuts","cinder block","chair","chalk","newspaper","soy sauce packet","chapter book","checkbook","chocolate","clay pot","clock","clothes","computer","conditioner","cookie jar","cork","couch","credit card","cup","deodorant ","desk","door","drawer","drill press","eraser","eye liner","face wash","fake flowers","flag","floor","flowers","food","fork","fridge","glass","glasses","glow stick","grid paper","hair tie","hanger","helmet","house","ipod","charger","key chain","keyboard","keys","knife","lace","lamp","lamp shade","leg warmers","lip gloss","lotion","milk","mirror","model car","money","monitor","mop","mouse pad","mp3 player","nail clippers","nail file","needle","outlet","paint brush","pants","paper","pen","pencil","perfume","phone","photo album","picture frame","pillow","plastic fork","plate","pool stick","soda can","puddle","purse","blanket","radio","remote","ring","rubber band","rubber duck","rug","rusty nail","sailboat","sand paper","sandal","scotch tape","screw","seat belt","shampoo","sharpie","shawl","shirt","shoe lace","shoes","shovel","sidewalk","sketch pad","slipper","soap","socks","sofa","speakers","sponge","spoon","spring","sticky note","stockings","stop sign","street lights","sun glasses","table","teddies","television","thermometer","thread","tire swing","tissue box","toe ring","toilet","tomato","tooth picks","toothbrush","toothpaste","towel","tree","truck","tv","twezzers","twister","vase","video games","wallet","washing machine","watch","water bottle","doll","magnet","wagon","headphones","clamp","USB drive","air freshener","piano","ice cube tray","white out","window","controller","coasters","thermostat","zipper"],"meta":{"img":{"local":true,"prefix":"/img/things/","suffix":".jpg"}}}}
