CREATE TABLE SecurityQuestions
(
    Id VARCHAR(50) NOT NULL PRIMARY KEY,
    Question VARCHAR(255) NOT NULL UNIQUE,
);

INSERT INTO SecurityQuestions
VALUES
    ((SELECT NEWID()), 'What is your mom''s maiden name?'),
    ((SELECT NEWID()), 'What is your grandmother''s maiden name?'),
    ((SELECT NEWID()), 'What was the name of your first childhood friend?'),
    ((SELECT NEWID()), 'What is your first pet''s name?'),
    ((SELECT NEWID()), 'What is your favorite teacher''s name?'),
    ((SELECT NEWID()), 'What Brand was your first car?'),
    ((SELECT NEWID()), 'What is your neighbour''s last name?'),
    ((SELECT NEWID()), 'What month was your first child born?');

CREATE TABLE Users
(
    Id VARCHAR(50) NOT NULL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Email VARCHAR(50) NOT NULL UNIQUE,
    Password VARCHAR(255) NOT NULL,
    Verified BIT NOT NULL DEFAULT(0),
    SecurityQuestionId VARCHAR(50) NOT NULL,
    SecurityAnswer VARCHAR(255) NOT NULL,
);

CREATE TABLE Brands
(
    Id VARCHAR(50) NOT NULL PRIMARY KEY,
    Name VARCHAR(60) NOT NULL UNIQUE,
    Slogan VARCHAR(255) NOT NULL,
    logoUri VARCHAR(255),
);

INSERT INTO Brands
VALUES
    ((SELECT NEWID()), 'Zentrox', 'Elevate Innovation', 'Zentrox.png'),
    ((SELECT NEWID()), 'Luxora', 'Elegance Redefubed', 'Luxora.png'),
    ((SELECT NEWID()), 'QuikPlus', 'Smart Living, Swiftly Delivered', 'QuikPlus.png'),
    ((SELECT NEWID()), 'Fizzix', 'Fueled by Fizzix: Powering your Play', 'Fizzix.png'),
    ((SELECT NEWID()), 'ElEgance', 'Dress the story', 'ElEgance.png'),
    ((SELECT NEWID()), 'VerdeHaven', 'Nurturing Homes, Cultivating Gardens', 'VerdeHaven.png'),
    ((SELECT NEWID()), 'TasteHub', 'Explore, Indulge, Delight.', 'TasteHub.png'),
    ((SELECT NEWID()), 'TruWave', 'Fashion in Motion, Tech in Tune', 'TruWave.png');

CREATE TABLE Categories
(
    Id VARCHAR(50) NOT NULL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL UNIQUE,
);

INSERT INTO Categories
VALUES
    ((SELECT NEWID()), ('Sports & Outdoors')),
    ((SELECT NEWID()), ('Electronics')),
    ((SELECT NEWID()), ('Home & Garden')),
    ((SELECT NEWID()), ('Food & Snacks')),
    ((SELECT NEWID()), ('Fashion & Accessories'));

CREATE TABLE Currencies
(
    Id VARCHAR(50) NOT NULL PRIMARY KEY,
    Name VARCHAR(60) UNIQUE,
    Symbol VARCHAR(5),
    ShortName VARCHAR(30) UNIQUE,
);

INSERT INTO Currencies
VALUES
    ((SELECT NEWID()), 'US Dollar', '$', 'USD')

CREATE TABLE Availabilities
(
    Id VARCHAR(50) NOT NULL PRIMARY KEY,
    Name VARCHAR(60) UNIQUE,
)

INSERT INTO Availabilities
VALUES
    ((SELECT NEWID()), 'https://schema.org/InStock'),
    ((SELECT NEWID()), 'https://schema.org/OutOfStock'),
    ((SELECT NEWID()), 'https://schema.org/Discontinued');

CREATE TABLE Sales
(
    Id VARCHAR(50) NOT NULL PRIMARY KEY,
    ProductId VARCHAR(50) NOT NULL UNIQUE,
    Number INT NOT NULL DEFAULT(0)
);

CREATE TABLE Products
(
    Id VARCHAR(50) NOT NULL PRIMARY KEY,
    BrandId VARCHAR(50) NOT NULL,
    CategoryId VARCHAR(50) NOT NULL,
    ProductName VARCHAR(255) NOT NULL UNIQUE,
    Description VARCHAR(255) NOT NULL,
);

INSERT INTO Products
VALUES
        -- ((SELECT NEWID()), (SELECT Id FROM Brands b WHERE b.Name = 'Zentrox'), (SELECT Id FROM Categories c WHERE c.Name = 'Electronics'), 'Smart Home Security System', 'Protect your home with our advanced Smart Home Security System'),
        ((SELECT NEWID()), (SELECT Id FROM Brands b WHERE b.Name = 'Luxora'), (SELECT Id FROM Categories c WHERE c.Name = 'Fashion & Accessories'), 'Premium Leather Handbag', 'Elevate your style with our luxurious Premium Leather Handbag'),
        ((SELECT NEWID()), (SELECT Id FROM Brands b WHERE b.Name = 'QuikPlus'), (SELECT Id FROM Categories c WHERE c.Name = 'Home & Garden'), 'High-Performance Blender', 'Blend with ease using our powerful High-Performance Blender'),
        ((SELECT NEWID()), (SELECT Id FROM Brands b WHERE b.Name = 'Fizzix'), (SELECT Id FROM Categories c WHERE c.Name = 'Electronics'), 'Pro Gaming Mouse', 'Take your gaming to the next level with our Pro Gaming Mouse'),
        ((SELECT NEWID()), (SELECT Id FROM Brands b WHERE b.Name = 'TruWave'), (SELECT Id FROM Categories c WHERE c.Name = 'Sports & Outdoors'), 'Fitness Tracker Watch', 'Stay on top of your fitness goals with our Fitness Tracker Watch'),
        ((SELECT NEWID()), (SELECT Id FROM Brands b WHERE b.Name = 'Zentrox'), (SELECT Id FROM Categories c WHERE c.Name = 'Electronics'), 'Wireless Noise-Canceling Headphones', 'Immerse yourself in music with our Wireless Noise-Canceling Headphones'),
        ((SELECT NEWID()), (SELECT Id FROM Brands b WHERE b.Name = 'Luxora'), (SELECT Id FROM Categories c WHERE c.Name = 'Fashion & Accessories'), 'Classic Aviator Sunglasses', 'Make a fashion statement with our Classic Aviator Sunglasses'),
        ((SELECT NEWID()), (SELECT Id FROM Brands b WHERE b.Name = 'QuikPlus'), (SELECT Id FROM Categories c WHERE c.Name = 'Home & Garden'), 'Stainless Steel Cookware Set', 'Upgrade your kitchen with our durable Stainless Steel Cookware Set'),
        ((SELECT NEWID()), (SELECT Id FROM Brands b WHERE b.Name = 'Fizzix'), (SELECT Id FROM Categories c WHERE c.Name = 'Electronics'), 'Mechanical Gaming Keyboard', 'Enhance your gaming experience with our Mechanical Gaming Keyboard'),
        ((SELECT NEWID()), (SELECT Id FROM Brands b WHERE b.Name = 'TruWave'), (SELECT Id FROM Categories c WHERE c.Name = 'Sports & Outdoors'), 'Portable Camping Hammock', 'Relax and unwind in nature with our Portable Camping Hammock'),
        ((SELECT NEWID()), (SELECT Id FROM Brands b WHERE b.Name = 'QuikPlus'), (SELECT Id FROM Categories c WHERE c.Name = 'Home & Garden'), 'Smart Home Thermostat', 'Control your home''s temperature with our Smart Home Thermostat'),
        ((SELECT NEWID()), (SELECT Id FROM Brands b WHERE b.Name = 'Zentrox'), (SELECT Id FROM Categories c WHERE c.Name = 'Electronics'), 'Wireless Charging Pad', 'Charge your devices wirelessly with our convenient Wireless Charging Pad'),
        ((SELECT NEWID()), (SELECT Id FROM Brands b WHERE b.Name = 'Luxora'), (SELECT Id FROM Categories c WHERE c.Name = 'Fashion & Accessories'), 'Designer Leather Wallet', 'Organize your essentials with our stylish Designer Leather Wallet'),
        ((SELECT NEWID()), (SELECT Id FROM Brands b WHERE b.Name = 'Fizzix'), (SELECT Id FROM Categories c WHERE c.Name = 'Electronics'), '4K Ultra HD Smart TV', 'Experience stunning visuals with our 4K Ultra HD Smart TV'),
        ((SELECT NEWID()), (SELECT Id FROM Brands b WHERE b.Name = 'TruWave'), (SELECT Id FROM Categories c WHERE c.Name = 'Sports & Outdoors'), 'Waterproof Fitness Shoes', 'Enhance your fitness experience with our Waterproof Fitness Shoes'),
        ((SELECT NEWID()), (SELECT Id FROM Brands b WHERE b.Name = 'Zentrox'), (SELECT Id FROM Categories c WHERE c.Name = 'Electronics'), 'Smart Home Security Camera', 'Monitor your home remotely with our Smart Home Security Camera'),
        ((SELECT NEWID()), (SELECT Id FROM Brands b WHERE b.Name = 'Luxora'), (SELECT Id FROM Categories c WHERE c.Name = 'Fashion & Accessories'), 'Designer Men''s Watch', 'Make a statement with our sophisticated Designer Men''s Watch'),
        ((SELECT NEWID()), (SELECT Id FROM Brands b WHERE b.Name = 'QuikPlus'), (SELECT Id FROM Categories c WHERE c.Name = 'Home & Garden'), 'Bio Recycled Plastic Casserole Set', 'Store meals with our Bio Recycled Plastic Casserole Set'),
        ((SELECT NEWID()), (SELECT Id FROM Brands b WHERE b.Name = 'Fizzix'), (SELECT Id FROM Categories c WHERE c.Name = 'Electronics'), 'Wireless Gaming Controller', 'Game without limits with our Wireless Gaming Controller'),
        ((SELECT NEWID()), (SELECT Id FROM Brands b WHERE b.Name = 'TruWave'), (SELECT Id FROM Categories c WHERE c.Name = 'Sports & Outdoors'), 'Foldable Camping Chair', 'Relax in comfort during your camping trips with our Foldable Camping Chair'),
        ((SELECT NEWID()), (SELECT Id FROM Brands b WHERE b.Name = 'Luxora'), (SELECT Id FROM Categories c WHERE c.Name = 'Fashion & Accessories'), 'Fashionable Women''s Handbag', 'Complete your look with our Fashionable Women''s Handbag'),
        ((SELECT NEWID()), (SELECT Id FROM Brands b WHERE b.Name = 'TruWave'), (SELECT Id FROM Categories c WHERE c.Name = 'Sports & Outdoors'), 'Running Shoes', 'Enhance your running experience with our high-performance Running Shoes'),
        ((SELECT NEWID()), (SELECT Id FROM Brands b WHERE b.Name = 'QuikPlus'), (SELECT Id FROM Categories c WHERE c.Name = 'Home & Garden'), 'Smart Home Assistant', 'Control your smart home with our Smart Home Assistant'),
        ((SELECT NEWID()), (SELECT Id FROM Brands b WHERE b.Name = 'Zentrox'), (SELECT Id FROM Categories c WHERE c.Name = 'Electronics'), 'Super Phone Charger', 'Charge your devices with our convenient Super Phone Charger'),
        ((SELECT NEWID()), (SELECT Id FROM Brands b WHERE b.Name = 'Luxora'), (SELECT Id FROM Categories c WHERE c.Name = 'Fashion & Accessories'), 'Designer Checkered Tie', 'Be sure to tie up your outfit with our stylish Designer Checkered Tie'),
        ((SELECT NEWID()), (SELECT Id FROM Brands b WHERE b.Name = 'TruWave'), (SELECT Id FROM Categories c WHERE c.Name = 'Sports & Outdoors'), 'Cool Sunglasses', 'Be Kenough with our Cool Sunglasses during your workouts'),
        ((SELECT NEWID()), (SELECT Id FROM Brands b WHERE b.Name = 'TruWave'), (SELECT Id FROM Categories c WHERE c.Name = 'Sports & Outdoors'), 'New Era Electrical Bike', 'Relax and train your stamina in comfort during your fitness workouts with our New Era Electrical Bike'),
        ((SELECT NEWID()), (SELECT Id FROM Brands b WHERE b.Name = 'TruWave'), (SELECT Id FROM Categories c WHERE c.Name = 'Sports & Outdoors'), 'Dumbbell Set', 'Build strength and tone muscles with our Dumbbell Set'),
        ((SELECT NEWID()), (SELECT Id FROM Brands b WHERE b.Name = 'ElEgance'), (SELECT Id FROM Categories c WHERE c.Name = 'Fashion & Accessories'), 'Summer Floral Dress', 'Experience stunning looks with our Floral Summer Dress'),
        ((SELECT NEWID()), (SELECT Id FROM Brands b WHERE b.Name = 'TruWave'), (SELECT Id FROM Categories c WHERE c.Name = 'Sports & Outdoors'), 'Resistance Bands Set', 'Workout anywhere with our versatile Resistance Bands Set'),
        ((SELECT NEWID()), (SELECT Id FROM Brands b WHERE b.Name = 'TruWave'), (SELECT Id FROM Categories c WHERE c.Name = 'Sports & Outdoors'), 'Yoga Mat', 'Improve your yoga practice with our comfortable and non-slip Yoga Mat'),
        ((SELECT NEWID()), (SELECT Id FROM Brands b WHERE b.Name = 'Zentrox'), (SELECT Id FROM Categories c WHERE c.Name = 'Electronics'), 'Smart Doorbell Camera', 'See who''s at your door from anywhere with our Smart Doorbell Camera'),
        ((SELECT NEWID()), (SELECT Id FROM Brands b WHERE b.Name = 'QuikPlus'), (SELECT Id FROM Categories c WHERE c.Name = 'Home & Garden'), 'Ceramic Non-Stick Cookware Set', 'Cook healthier meals with our Ceramic Non-Stick Cookware Set'),
        ((SELECT NEWID()), (SELECT Id FROM Brands b WHERE b.Name = 'Zentrox'), (SELECT Id FROM Categories c WHERE c.Name = 'Electronics'), 'Bluetooth Wireless Earbuds', 'Enjoy your music on the go with our Bluetooth Wireless Earbuds'),
        ((SELECT NEWID()), (SELECT Id FROM Brands b WHERE b.Name = 'Luxora'), (SELECT Id FROM Categories c WHERE c.Name = 'Fashion & Accessories'), 'Leather Messenger Bag', 'Carry your essentials in style with our Leather Messenger Bag'),
        ((SELECT NEWID()), (SELECT Id FROM Brands b WHERE b.Name = 'VerdeHaven'), (SELECT Id FROM Categories c WHERE c.Name = 'Home & Garden'), 'Automatic Garden Sprinkler', 'Keep your garden watered with our Automatic Garden Sprinkler'),
        ((SELECT NEWID()), (SELECT Id FROM Brands b WHERE b.Name = 'QuikPlus'), (SELECT Id FROM Categories c WHERE c.Name = 'Home & Garden'), 'Robot Vacuum Cleaner', 'Keep your floors clean effortlessly with our Robot Vacuum Cleaner'),
        ((SELECT NEWID()), (SELECT Id FROM Brands b WHERE b.Name = 'QuikPlus'), (SELECT Id FROM Categories c WHERE c.Name = 'Home & Garden'), 'Countertop Blender', 'Blend smoothies and more with our powerful Countertop Blender'),
        ((SELECT NEWID()), (SELECT Id FROM Brands b WHERE b.Name = 'QuikPlus'), (SELECT Id FROM Categories c WHERE c.Name = 'Home & Garden'), 'Air Fryer', 'Cook healthier meals with our efficient Air Fryer'),
        ((SELECT NEWID()), (SELECT Id FROM Brands b WHERE b.Name = 'VerdeHaven'), (SELECT Id FROM Categories c WHERE c.Name = 'Home & Garden'), 'Ergonomic Garden Hose', 'Be always ready to water your garden with our Ergonomic Garden Hose'),
        ((SELECT NEWID()), (SELECT Id FROM Brands b WHERE b.Name = 'ElEgance'), (SELECT Id FROM Categories c WHERE c.Name = 'Fashion & Accessories'), 'Tie Dye Tee', 'Support the environment with cool tied and dyed shades'),
        ((SELECT NEWID()), (SELECT Id FROM Brands b WHERE b.Name = 'ElEgance'), (SELECT Id FROM Categories c WHERE c.Name = 'Fashion & Accessories'), 'Female Summer Hat', 'Be the center of attention with our Female Summer Hat'),
        ((SELECT NEWID()), (SELECT Id FROM Brands b WHERE b.Name = 'ElEgance'), (SELECT Id FROM Categories c WHERE c.Name = 'Fashion & Accessories'), 'Elegant Suit', 'Make sure you suit up with the new Elegant Suit'),
        ((SELECT NEWID()), (SELECT Id FROM Brands b WHERE b.Name = 'Fizzix'), (SELECT Id FROM Categories c WHERE c.Name = 'Electronics'), 'Virtual Reality Headset', 'Step into virtual worlds with our immersive Virtual Reality Headset'),
        ((SELECT NEWID()), (SELECT Id FROM Brands b WHERE b.Name = 'QuikPlus'), (SELECT Id FROM Categories c WHERE c.Name = 'Electronics'), 'Wireless Keyboard and Mouse Combo', 'Stay productive with our Wireless Keyboard and Mouse Combo'),
        ((SELECT NEWID()), (SELECT Id FROM Brands b WHERE b.Name = 'Luxora'), (SELECT Id FROM Categories c WHERE c.Name = 'Fashion & Accessories'), 'Leather Wallet with RFID Blocking', 'Protect your cards with our Leather Wallet featuring RFID blocking'),
        ((SELECT NEWID()), (SELECT Id FROM Brands b WHERE b.Name = 'QuikPlus'), (SELECT Id FROM Categories c WHERE c.Name = 'Home & Garden'), 'Stainless Steel Cutlery', 'Control your devices remotely with our Smart Wi-Fi Plug'),
        ((SELECT NEWID()), (SELECT Id FROM Brands b WHERE b.Name = 'Fizzix'), (SELECT Id FROM Categories c WHERE c.Name = 'Electronics'), 'Portable Bluetooth Speaker', 'Enjoy your favorite music on the go with our Portable Bluetooth Speaker'),
        ((SELECT NEWID()), (SELECT Id FROM Brands b WHERE b.Name = 'Zentrox'), (SELECT Id FROM Categories c WHERE c.Name = 'Electronics'), 'Smart LED Light Bulb', 'Illuminate your home with our Smart LED Light Bulb'),
        ((SELECT NEWID()), (SELECT Id FROM Brands b WHERE b.Name = 'Luxora'), (SELECT Id FROM Categories c WHERE c.Name = 'Fashion & Accessories'), 'Stylish Sunglasses', 'Protect your eyes in style with our Trendy Sunglasses'),
        ((SELECT NEWID()), (SELECT Id FROM Brands b WHERE b.Name = 'TasteHub'), (SELECT Id FROM Categories c WHERE c.Name = 'Food & Snacks'), 'Instant Ramen', 'Explore a new world of tastes in seconds with our Instant Ramen'),
        ((SELECT NEWID()), (SELECT Id FROM Brands b WHERE b.Name = 'TasteHub'), (SELECT Id FROM Categories c WHERE c.Name = 'Food & Snacks'), 'Happy Gummy Bear Party', 'Start a flavourful party with our Happy Gummy Bear Party'),
        ((SELECT NEWID()), (SELECT Id FROM Brands b WHERE b.Name = 'TasteHub'), (SELECT Id FROM Categories c WHERE c.Name = 'Food & Snacks'), 'Pop Rocks Candy', 'Get your tastebuds rocked with our Pop Rocks Candy');

CREATE TABLE Variations
(
    Id VARCHAR(50) NOT NULL PRIMARY KEY,
    ProductId VARCHAR(50) NOT NULL,
    Name VARCHAR(50) NULL,
    Sku VARCHAR(60) NOT NULL UNIQUE,
    Price FLOAT,
    CurrencyId VARCHAR(50),
    AvailabilityId VARCHAR(50) NOT NULL,
    InventoryLevel INT NOT NULL DEFAULT(0),
    [HasImage]       BIT          DEFAULT ((0)) NOT NULL,
);

INSERT INTO Variations
VALUES
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Smart Home Security System'), NULL, 'ZEN456789', '199.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '83', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Premium Leather Handbag'), 'Zebra', 'LUX345678', '149.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '52', '0'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Premium Leather Handbag'), 'Leopard', 'LUX345677', '149.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '32', '0'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Premium Leather Handbag'), 'Puma', 'LUX345676', '149.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '18', '0'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'High-Performance Blender'), 'Gold', 'QU+012344', '89.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '37', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'High-Performance Blender'), 'Silver', 'QU+012343', '89.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '12', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'High-Performance Blender'), 'Metallic', 'QU+012342', '89.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '50', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'High-Performance Blender'), 'Copper', 'QU+012341', '89.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '34', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'High-Performance Blender'), 'Blue', 'QU+012340', '89.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '30', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Pro Gaming Mouse'), NULL, 'ZIX234764', '69.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '4', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Fitness Tracker Watch'), 'White', 'TRW845679', '79.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '92', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Fitness Tracker Watch'), 'Black', 'TRW845678', '79.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '92', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Fitness Tracker Watch'), 'Pink', 'TRW845677', '79.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '92', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Wireless Noise-Canceling Headphones'), 'White', 'ZEN567890', '129.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '98', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Wireless Noise-Canceling Headphones'), 'Black', 'ZEN567891', '129.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '98', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Wireless Noise-Canceling Headphones'), 'Pink', 'ZEN567892', '129.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '98', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Classic Aviator Sunglasses'), NULL, 'LUX678901', '59.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '72', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Stainless Steel Cookware Set'), NULL, 'QU+789012', '199.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '7', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Mechanical Gaming Keyboard'), NULL, 'ZIX490123', '89.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '91', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Portable Camping Hammock'), 'White', 'TRW012345', '39.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '33', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Portable Camping Hammock'), 'Orange', 'TRW012346', '39.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '33', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Portable Camping Hammock'), 'Blue', 'TRW012347', '39.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '33', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Portable Camping Hammock'), 'Red', 'TRW012348', '39.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '33', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Portable Camping Hammock'), 'Green', 'TRW012349', '39.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '33', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Portable Camping Hammock'), 'Camo', 'TRW012350', '39.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '33', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Portable Camping Hammock'), 'Camo Winter', 'TRW012351', '39.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '33', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Smart Home Thermostat'), NULL, 'QU+589067', '129.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '83', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Wireless Charging Pad'), 'White', 'ZEN167890', '39.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '59', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Wireless Charging Pad'), 'Black', 'ZEN167891', '39.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '59', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Wireless Charging Pad'), 'Pink', 'ZEN167892', '39.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '59', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Designer Leather Wallet'), 'Brown', 'LUX97801', '79.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '46', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Designer Leather Wallet'), 'Black', 'LUX978013', '79.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/OutOfStock'), '0', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Designer Leather Wallet'), 'Zebra', 'LUX978014', '79.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '46', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = '4K Ultra HD Smart TV'), '32"', 'ZIX901234', '499.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '18', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = '4K Ultra HD Smart TV'), '55"', 'ZIX901235', '699.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/OutOfStock'), '0', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = '4K Ultra HD Smart TV'), '75"', 'ZIX901236', '999.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/OutOfStock'), '0', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Waterproof Fitness Shoes'), 'White', 'TRW812390', '89.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '28', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Waterproof Fitness Shoes'), 'Blue', 'TRW812391', '89.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '28', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Waterproof Fitness Shoes'), 'Red', 'TRW812392', '89.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '28', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Waterproof Fitness Shoes'), 'Gray', 'TRW812393', '89.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '28', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Smart Home Security Camera'), NULL, 'ZEN012345', '79.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '77', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Designer Men''s Watch'), NULL, 'LUX345672', '199.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '17', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Bio Recycled Plastic Casserole Set'), NULL, 'QU+347568', '129.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '54', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Wireless Gaming Controller'), NULL, 'ZIX894567', '49.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '76', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Foldable Camping Chair'), 'White', 'TRW781290', '29.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '37', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Foldable Camping Chair'), 'Orange', 'TRW781291', '29.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '37', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Foldable Camping Chair'), 'Blue', 'TRW781292', '29.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '37', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Foldable Camping Chair'), 'Red', 'TRW781293', '29.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '37', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Foldable Camping Chair'), 'Green', 'TRW781294', '29.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '37', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Foldable Camping Chair'), 'Camo', 'TRW781295', '29.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '37', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Foldable Camping Chair'), 'Camo Winter', 'TRW781296', '29.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '37', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Fashionable Women''s Handbag'), 'Zebra', 'LUX890127', '69.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '69', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Fashionable Women''s Handbag'), 'Leopard', 'LUX890126', '69.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '69', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Fashionable Women''s Handbag'), 'Puma', 'LUX890125', '69.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '69', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Running Shoes'), 'White', 'TRW590678', '79.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '77', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Running Shoes'), 'Orange', 'TRW590677', '79.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '77', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Running Shoes'), 'Blue', 'TRW590676', '79.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '77', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Running Shoes'), 'Red', 'TRW590675', '79.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '77', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Running Shoes'), 'Green', 'TRW590674', '79.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '77', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Smart Home Assistant'), NULL, 'QU+567890', '129.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '96', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Super Phone Charger'), 'Gray', 'ZEN689016', '39.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/OutOfStock'), '0', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Super Phone Charger'), 'White', 'ZEN689015', '39.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/OutOfStock'), '0', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Designer Checkered Tie'), 'Ruby', 'LUX701289', '79.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '10', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Designer Checkered Tie'), 'Topaz', 'LUX701288', '79.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '10', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Designer Checkered Tie'), 'Saphire', 'LUX701287', '79.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '10', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Designer Checkered Tie'), 'Emerald', 'LUX701286', '79.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '10', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Cool Sunglasses'), NULL, 'TRW890123', '89.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/OutOfStock'), '0', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'New Era Electrical Bike'), NULL, 'TRW701289', '29.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/Discontinued'), '0', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Dumbbell Set'), NULL, 'TRW567890', '99.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '49', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Summer Floral Dress'), 'Dusk', 'CTH901234', '69.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '38', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Summer Floral Dress'), 'Dawn', 'CTH901235', '69.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '38', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Summer Floral Dress'), 'Watermelon', 'CTH901236', '69.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '38', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Summer Floral Dress'), 'Strawberry', 'CTH901237', '69.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '38', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Summer Floral Dress'), 'Blueberry', 'CTH901238', '69.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '38', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Resistance Bands Set'), 'White', 'TRW456789', '24.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '23', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Resistance Bands Set'), 'Blue', 'TRW456788', '24.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '23', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Resistance Bands Set'), 'Red', 'TRW456787', '24.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/OutOfStock'), '0', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Resistance Bands Set'), 'Green', 'TRW456786', '24.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/OutOfStock'), '0', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Yoga Mat'), 'White', 'TRW789012', '29.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '47', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Yoga Mat'), 'Blue', 'TRW789013', '29.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '47', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Yoga Mat'), 'Red', 'TRW789014', '29.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '47', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Yoga Mat'), 'Green', 'TRW789015', '29.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '47', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Smart Doorbell Camera'), NULL, 'ZEN789012', '139.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '40', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Ceramic Non-Stick Cookware Set'), NULL, 'QU+367845', '129.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/OutOfStock'), '0', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Bluetooth Wireless Earbuds'), 'White', 'ZEN678901', '59.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '11', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Bluetooth Wireless Earbuds'), 'Pink', 'ZEN678902', '59.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '11', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Bluetooth Wireless Earbuds'), 'Black', 'ZEN678903', '59.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '11', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Leather Messenger Bag'), 'Puma', 'LUX789012', '119.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '82', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Leather Messenger Bag'), 'Camel', 'LUX789013', '119.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '82', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Automatic Garden Sprinkler'), NULL, 'VER678901', '59.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '15', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Robot Vacuum Cleaner'), NULL, 'QU+901234', '249.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '80', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Countertop Blender'), 'Gold', 'QU+456789', '49.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '58', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Countertop Blender'), 'Silver', 'QU+456788', '49.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '58', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Countertop Blender'), 'Metallic', 'QU+456787', '49.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '58', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Countertop Blender'), 'Copper', 'QU+456786', '49.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '58', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Countertop Blender'), 'Blue', 'QU+456785', '49.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '58', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Air Fryer'), 'Gold', 'QU+347854', '129.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '63', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Air Fryer'), 'Silver', 'QU+347853', '129.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '63', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Air Fryer'), 'Metallic', 'QU+347852', '129.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '63', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Air Fryer'), 'Copper', 'QU+347851', '129.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '63', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Air Fryer'), 'Blue', 'QU+347850', '129.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '63', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Ergonomic Garden Hose'), '10m', 'VER234567', '44.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/OutOfStock'), '0', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Ergonomic Garden Hose'), '20m', 'VER234568', '89.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '12', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Ergonomic Garden Hose'), '50m', 'VER234569', '169.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '46', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Tie Dye Tee'), 'Dusk', 'CTH012345', '79.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/OutOfStock'), '0', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Tie Dye Tee'), 'Dawn', 'CTH012346', '79.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/OutOfStock'), '0', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Tie Dye Tee'), 'Watermelon', 'CTH012347', '79.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '38', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Tie Dye Tee'), 'Strawberry', 'CTH012348', '79.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '24', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Tie Dye Tee'), 'Blueberry', 'CTH012349', '79.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '19', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Female Summer Hat'), NULL, 'CTH234567', '199.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/Discontinued'), '0', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Elegant Suit'), 'Watermelon', 'CTH456789', '49.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '15', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Elegant Suit'), 'Strawberry', 'CTH456788', '49.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '13', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Elegant Suit'), 'Blueberry', 'CTH456787', '49.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '15', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Elegant Suit'), 'Cranberry', 'CTH456786', '49.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '15', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Elegant Suit'), 'Snow', 'CTH456785', '49.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '21', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Elegant Suit'), 'Desert', 'CTH456784', '49.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '3', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Virtual Reality Headset'), NULL, 'ZIX456789', '159.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '43', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Wireless Keyboard and Mouse Combo'), NULL, 'QU+378456', '49.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '56', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Leather Wallet with RFID Blocking'), NULL, 'LUX890123', '39.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/OutOfStock'), '0', '0'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Stainless Steel Cutlery'), '1 set(s)', 'QU+345678', '4.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '14', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Stainless Steel Cutlery'), '2 set(s)', 'QU+345677', '9.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '14', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Stainless Steel Cutlery'), '5 set(s)', 'QU+345676', '19.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '14', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Portable Bluetooth Speaker'), NULL, 'ZIX234567', '29.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '9', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Smart LED Light Bulb'), NULL, 'ZEN901234', '19.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '3', '0'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Stylish Sunglasses'), NULL, 'LUX234567', '49.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '64', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Instant Ramen'), NULL, 'HUB670189', '59.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '15', '0'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Happy Gummy Bear Party'), '1 pack(s)', 'HUB671890', '0.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '15', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Happy Gummy Bear Party'), '5 pack(s)', 'HUB671891', '4.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '15', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Happy Gummy Bear Party'), '10 pack(s)', 'HUB671892', '8.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '15', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Happy Gummy Bear Party'), '50 pack(s)', 'HUB671893', '34.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '15', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Pop Rocks Candy'), '1 pack(s)', 'HUB678901', '0.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '15', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Pop Rocks Candy'), '5 pack(s)', 'HUB678902', '3.99', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '15', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Pop Rocks Candy'), '10 pack(s)', 'HUB678903', '7.49', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '15', '1'),
        ((SELECT NEWID()), (SELECT Id FROM Products p WHERE p.ProductName = 'Pop Rocks Candy'), '50 pack(s)', 'HUB678904', '25.19', (SELECT Id FROM Currencies cr WHERE cr.ShortName = 'USD'), (SELECT Id FROM Availabilities a WHERE a.Name = 'https://schema.org/InStock'), '15', '1');

CREATE TABLE Reviews
(
    Id VARCHAR(50) NOT NULL PRIMARY KEY,
    ProductId VARCHAR(50) NOT NULL,
    AuthorId VARCHAR(50) NOT NULL,
    ReviewBody VARCHAR(255) NOT NULL,
    ReviewTitle VARCHAR(255) NOT NULL,
    RatingSourceValue INT NOT NULL
);

CREATE TABLE Roles
(
    Id VARCHAR(50) NOT NULL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    ViewAdmin BIT NOT NULL DEFAULT(0),
    EditAdmin BIT NOT NULL DEFAULT(0),
    EditSellerAccount BIT NOT NULL DEFAULT(0),
    EditAccount BIT NOT NULL DEFAULT(0),
    ViewAccess BIT NOT NULL DEFAULT(0),
    ChangeAccountType BIT NOT NULL DEFAULT(0)
);

INSERT INTO Roles
VALUES
    ((SELECT NEWID()), 'Admin', 1, 1, 0, 1, 0, 1),
    ((SELECT NEWID()), 'Supervisor', 1, 0, 0, 1, 0, 0),
    ((SELECT NEWID()), 'User', 0, 0, 0, 1, 0, 0),
    ((SELECT NEWID()), 'Guest', 0, 0, 0, 0, 1, 0),
    ((SELECT NEWID()), 'Seller', 0, 0, 1, 1, 0, 0);


/*
Description |admin dashboard|admin dashboard|   seller dashboard    | personal acc details |  logged off to see | preview page from other role  |
    Role    |   ViewAdmin   |   EditAdmin   |   EditSellerAccount   |      EditAccount     |      ViewAccess    |       ChangeAccountType       |
    User    |       x       |       x       |           x           |           o          |          x         |               x               |
    Guest   |       x       |       x       |           x           |           x          |          o         |               x               |
    Admin   |       o       |       o       |           x           |           o          |          x         |               o               |
  Supervisor|       o       |       x       |           x           |           o          |          x         |               x               |
    Seller  |       x       |       x       |           o           |           o          |          x         |               x               |
*/