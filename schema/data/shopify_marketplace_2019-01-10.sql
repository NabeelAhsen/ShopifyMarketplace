/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table carts
# ------------------------------------------------------------

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;

INSERT INTO `carts` (`id`, `user_id`, `status`)
VALUES
	(1,1,'Completed');

/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table items_in_carts
# ------------------------------------------------------------

LOCK TABLES `items_in_carts` WRITE;
/*!40000 ALTER TABLE `items_in_carts` DISABLE KEYS */;

INSERT INTO `items_in_carts` (`cart_id`, `product`)
VALUES
	(1,'Iron Man\'s Suit - MK III'),
	(1,'keyboard');

/*!40000 ALTER TABLE `items_in_carts` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table products
# ------------------------------------------------------------

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;

INSERT INTO `products` (`title`, `price`, `inventory_count`)
VALUES
	('air freshener',46.31,10),
	('apple',118.81,0),
	('bag',9.03,6),
	('balloon',62.36,30),
	('bananas',361.07,19),
	('bed',44.21,27),
	('beef',126.38,29),
	('blanket',436.46,32),
	('blouse',9.04,24),
	('book',229.53,0),
	('bookmark',36.03,24),
	('boom box',219.87,10),
	('bottle',341.84,3),
	('bottle cap',114.01,12),
	('bow',200.11,3),
	('bowl',465.37,19),
	('box',258.99,0),
	('bracelet',23.62,1),
	('bread',441.18,33),
	('brocolli',428.45,0),
	('buckel',202.30,25),
	('button',7.67,25),
	('camera',18.36,3),
	('candle',9.00,1),
	('candy wrapper',200.90,14),
	('canvas',51.01,21),
	('car',373.92,29),
	('carrots',468.77,0),
	('cat',328.84,6),
	('CD',446.92,33),
	('cell phone',104.01,24),
	('chair',245.12,7),
	('chalk',154.45,33),
	('chapter book',139.29,32),
	('charger',34.66,7),
	('checkbook',373.36,0),
	('chocolate',117.43,18),
	('cinder block',36.54,23),
	('clamp',229.17,0),
	('clay pot',139.26,16),
	('clock',314.80,4),
	('clothes',201.76,34),
	('coasters',457.48,8),
	('computer',43.95,30),
	('conditioner',122.45,32),
	('controller',264.16,0),
	('cookie jar',453.97,25),
	('cork',466.81,31),
	('couch',47.05,20),
	('credit card',186.05,0),
	('cup',457.11,4),
	('deodorant ',460.81,11),
	('desk',147.43,26),
	('doll',148.86,21),
	('door',14.57,11),
	('drawer',102.12,0),
	('drill press',68.29,15),
	('eraser',491.49,36),
	('eye liner',465.33,9),
	('face wash',11.91,6),
	('fake flowers',183.38,3),
	('flag',172.52,5),
	('floor',300.34,0),
	('flowers',478.96,4),
	('food',295.44,14),
	('fork',347.09,23),
	('fridge',339.68,27),
	('glass',91.41,24),
	('glasses',371.65,7),
	('glow stick',101.32,22),
	('greeting card',100.79,19),
	('grid paper',457.70,25),
	('hair brush',87.96,1),
	('hair tie',40.72,11),
	('hanger',182.99,35),
	('headphones',409.50,22),
	('helmet',404.06,9),
	('house',350.72,6),
	('ice cube tray',411.83,0),
	('ipod',40.19,16),
	('Iron Man\'s Suit - MK III',1000000000.72,10),
	('key chain',296.49,0),
	('keyboard',305.69,4),
	('keys',442.43,20),
	('knife',46.79,17),
	('lace',280.51,25),
	('lamp',474.07,0),
	('lamp shade',124.14,0),
	('leg warmers',158.36,4),
	('lip gloss',484.86,24),
	('lotion',287.48,6),
	('magnet',425.34,35),
	('milk',261.76,33),
	('mirror',231.18,5),
	('model car',70.22,0),
	('money',374.48,9),
	('monitor',389.10,26),
	('mop',299.11,14),
	('mouse pad',75.31,36),
	('mp3 player',342.88,34),
	('nail clippers',67.79,30),
	('nail file',304.24,0),
	('needle',81.50,23),
	('newspaper',269.03,0),
	('outlet',74.39,1),
	('packing peanuts',211.97,33),
	('paint brush',363.20,2),
	('pants',261.43,14),
	('paper',182.52,32),
	('pen',406.68,29),
	('pencil',98.59,17),
	('perfume',245.39,2),
	('phone',229.02,12),
	('photo album',50.29,11),
	('piano',82.65,34),
	('picture frame',347.40,5),
	('pillow',351.35,0),
	('plastic fork',301.26,0),
	('plate',219.34,33),
	('playing card',473.72,30),
	('pool stick',113.44,36),
	('puddle',123.90,23),
	('purse',479.01,3),
	('radio',157.27,0),
	('remote',442.73,25),
	('ring',63.88,7),
	('rubber band',397.44,27),
	('rubber duck',495.93,16),
	('rug',374.21,25),
	('rusty nail',315.05,8),
	('sailboat',121.76,9),
	('sand paper',394.56,0),
	('sandal',42.36,31),
	('scotch tape',359.27,34),
	('screw',302.31,0),
	('seat belt',78.00,32),
	('shampoo',44.70,16),
	('sharpie',47.23,22),
	('shawl',241.24,24),
	('shirt',328.09,9),
	('shoe lace',398.22,0),
	('shoes',242.63,3),
	('shovel',146.31,8),
	('sidewalk',139.77,21),
	('sketch pad',167.93,15),
	('slipper',165.24,24),
	('soap',278.40,4),
	('socks',137.31,6),
	('soda can',330.32,0),
	('sofa',102.11,16),
	('soy sauce packet',304.82,5),
	('speakers',174.34,13),
	('sponge',289.54,4),
	('spoon',267.71,35),
	('spring',395.36,7),
	('sticky note',355.97,28),
	('stockings',470.65,0),
	('stop sign',309.15,0),
	('street lights',426.91,14),
	('sun glasses',225.61,7),
	('table',444.47,7),
	('teddies',469.10,34),
	('television',143.92,4),
	('thermometer',272.10,3),
	('thermostat',243.69,0),
	('thread',105.19,0),
	('tire swing',71.29,0),
	('tissue box',172.90,17),
	('toe ring',380.88,7),
	('toilet',336.98,0),
	('tomato',204.63,0),
	('tooth picks',405.09,19),
	('toothbrush',216.07,29),
	('toothpaste',161.12,11),
	('towel',39.89,18),
	('tree',388.96,29),
	('truck',190.63,29),
	('tv',157.25,8),
	('twezzers',36.87,29),
	('twister',467.42,30),
	('USB drive',286.36,35),
	('vase',360.04,5),
	('video games',371.30,0),
	('wagon',170.66,26),
	('wallet',475.60,23),
	('washing machine',421.59,0),
	('watch',162.91,12),
	('water bottle',61.25,0),
	('white out',84.63,0),
	('window',418.09,0),
	('zipper',293.76,1);

/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table users
# ------------------------------------------------------------

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `username`, `password`)
VALUES
	(1,'demo','password');

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
