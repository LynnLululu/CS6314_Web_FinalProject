INSERT INTO ADMIN (AccountID, Fname, Lname, DateOfBirth, Email, UserName, Password)
	VALUES (0, 'Charles', 'Lee', STR_TO_DATE('01/01/1997','%m/%d/%Y'), 'chalee@gmail.com', 'adminL', '123450');
INSERT INTO ADMIN (AccountID, Fname, Lname, DateOfBirth, Email, UserName, Password)
	VALUES (1, 'Maya', 'Mitchell', STR_TO_DATE('04/05/2000','%m/%d/%Y'), 'mayamit@outlook.com', 'adminM', '123451');
INSERT INTO ADMIN (AccountID, Fname, Lname, DateOfBirth, Email, UserName, Password)
	VALUES (2, 'Yale', 'Holmes', STR_TO_DATE('06/08/2000','%m/%d/%Y'), 'yalhol@gmail.com', 'adminH', '123452');

INSERT INTO CUSTOMER (AccountID, Fname, Lname, DateOfBirth, Email, UserName, Password, Payment, MailAddr, BillAddr, Phone)
	VALUES (100, 'Medhurst', 'Tess', STR_TO_DATE('01/29/1991','%m/%d/%Y'), 'medtes@gmail.com', 'medtes', '6789321469', '4829571662449868', '4494 Wilson Avenue Plano TX 75023', '4494 Wilson Avenue Plano TX 75023', '7112659193');
INSERT INTO CUSTOMER (AccountID, Fname, Lname, DateOfBirth, Email, UserName, Password, Payment, MailAddr, BillAddr, Phone)
	VALUES (101, 'Hayes', 'Mitchel', STR_TO_DATE('07/17/1972','%m/%d/%Y'), 'haymit@gmail.com', 'haymit', '1234', '5487744475243527', '932 Worthington Drive Plano TX 75074', '932 Worthington Drive Plano TX 75074', '6758447400');
INSERT INTO CUSTOMER (AccountID, Fname, Lname, DateOfBirth, Email, UserName, Password, Payment, MailAddr, BillAddr, Phone)
	VALUES (102, 'Hegmann', 'Louie', STR_TO_DATE('12/28/1994','%m/%d/%Y'), 'heglou@outlook.com', 'heglou', '341152341', '5132304934743739', '4223 Jones Street Plano TX 75074', '848 Liberty Street Plano TX 75074', '2668550710');
INSERT INTO CUSTOMER (AccountID, Fname, Lname, DateOfBirth, Email, UserName, Password, Payment, MailAddr, BillAddr, Phone)
	VALUES (103, 'Nitzsche', 'Peter', STR_TO_DATE('04/27/1976','%m/%d/%Y'), 'nitpet@gmail.com', 'nitpet', '411244', '4282707503474943', '3276 Bew Street Plano TX 75023', '3276 Bew Street Plano TX 75023', '5145318471');
INSERT INTO CUSTOMER (AccountID, Fname, Lname, DateOfBirth, Email, UserName, Password, Payment, MailAddr, BillAddr, Phone)
	VALUES (104, 'Feest', 'Mac', STR_TO_DATE('02/23/1985','%m/%d/%Y'), 'feemac@gmail.com', 'feemac', '46432343', '5363611860216070', '3344 Giraffe Hill Drive Plano TX 75074', '3344 Giraffe Hill Drive Plano TX 75074', '9662915045');
INSERT INTO CUSTOMER (AccountID, Fname, Lname, DateOfBirth, Email, UserName, Password, Payment, MailAddr, BillAddr, Phone)
	VALUES (105, 'Schimmel', 'Josue', STR_TO_DATE('07/19/1970','%m/%d/%Y'), 'schjos@gmail.com', 'schjos', '123214634', '4785356083460880', '681 Ersel Street Plano TX 75024', '681 Ersel Street Plano TX 75024', '5199784733');
INSERT INTO CUSTOMER (AccountID, Fname, Lname, DateOfBirth, Email, UserName, Password, Payment, MailAddr, BillAddr, Phone)
	VALUES (106, 'Cassin', 'Mohammad', STR_TO_DATE('03/23/1995','%m/%d/%Y'), 'casmoh@gmail.com', 'casmoh', '1234435', '4544744072628934', '625 Pike Street Plano TX 75023', '625 Pike Street Plano TX 75023', '9955654039');
INSERT INTO CUSTOMER (AccountID, Fname, Lname, DateOfBirth, Email, UserName, Password, Payment, MailAddr, BillAddr, Phone)
	VALUES (107, 'Hand', 'Pierce', STR_TO_DATE('06/21/1984','%m/%d/%Y'), 'handpie@outlook.com', 'handpie', '3126343', '5147150343069577', '855 Whispering Pines Circle Plano 75074', '4793 Worthington Drive TX 75074', '6204541799');
INSERT INTO CUSTOMER (AccountID, Fname, Lname, DateOfBirth, Email, UserName, Password, Payment, MailAddr, BillAddr, Phone)
	VALUES (108, 'Jast', 'Winton', STR_TO_DATE('05/07/1978','%m/%d/%Y'), 'jastwin@outlook.com', 'jastwin', '123153213', '4428127299245099', '3627 Wilson avenue Richardson TX 75081', '3627 Wilson avenue Richardson TX 75081', '5476014382');
INSERT INTO CUSTOMER (AccountID, Fname, Lname, DateOfBirth, Email, UserName, Password, Payment, MailAddr, BillAddr, Phone)
	VALUES (109, 'Satterfield', 'Amie', STR_TO_DATE('11/29/1983','%m/%d/%Y'), 'satamie@gmail.com', 'satamie', '4533123', '4314861869792679', '2757 Lightning Point Drive Richardson TX 75080', '4891 Liberty Street Plano TX 75074', '8888729366');

INSERT INTO PRODUCT(ProductID, Name, Price, Description, Image, Num, Visible)
	VALUES(1001, 'Coconut Bread', 3.5, 'A soft bread with coconut and cheese filling, topped with sliced cashew.', 'CoconutBread.jpg', 20, 1);
INSERT INTO PRODUCT(ProductID, Name, Price, Description, Image, Num, Visible)
	VALUES(1002, 'Garlic Cheese', 2.8, 'A soft bread topped with special garlic spread, mozzarella cheese, and sprinkled with chopped chives.', 'GarlicCheese.jpg', 20, 1);
INSERT INTO PRODUCT(ProductID, Name, Price, Description, Image, Num, Visible)
	VALUES(1003, 'Coffee Bread', 3.7, 'A coffee flavored bread filled with special cream cheese.', 'CoffeeBread.jpg', 20, 0);
INSERT INTO PRODUCT(ProductID, Name, Price, Description, Image, Num, Visible)
	VALUES(1004, 'Whole Milk Bread', 5.2, 'A soft, moist Japanese style bread with buttery and milky flavor.', 'WholeMilkBread.jpg', 20, 1);
INSERT INTO PRODUCT(ProductID, Name, Price, Description, Image, Num, Visible)
	VALUES(1005, 'Berry Fairy', 3.4, 'Sweet bread with fresh strawberry and special cream.', 'BerryFairy.jpg', 20, 1);
INSERT INTO PRODUCT(ProductID, Name, Price, Description, Image, Num, Visible)
	VALUES(1006, 'Taro Taro', 3.7, 'Sweet bread made with mixed grains and filled with signature taro filling.', 'TaroTaro.jpg', 20, 1);
INSERT INTO PRODUCT(ProductID, Name, Price, Description, Image, Num, Visible)
	VALUES(1007, 'Butter Bread', 2.8, 'Golden bread baked with salted butter. Sprinkled with sea salt to make it simply delicious.', 'ButterBread.jpg', 20, 1);
INSERT INTO PRODUCT(ProductID, Name, Price, Description, Image, Num, Visible)
	VALUES(2001, 'Blueberry Cheesecake', 4.3, 'Moist and rich cheesecake with blueberry jam based with a cookie crumble bottom.', 'BlueberryCheesecake.jpg', 15, 1);
INSERT INTO PRODUCT(ProductID, Name, Price, Description, Image, Num, Visible)
	VALUES(2002, 'Black Forest Slice', 3.6, 'Chocolate sponge cake with sweet cherries and fresh cream.', 'BlackForestSlice.jpg', 15, 1);
INSERT INTO PRODUCT(ProductID, Name, Price, Description, Image, Num, Visible)
	VALUES(2003, 'Red Velvet Slice', 3.7, '3-layered red velvet cake with vanilla cream cheese and red velvet crumbs. Decorated with white chocolate shavings and cherries.', 'RedVelvetSlice.jpg', 15, 1);
INSERT INTO PRODUCT(ProductID, Name, Price, Description, Image, Num, Visible)
	VALUES(2004, 'Coconut Roll', 5.2, 'Vanilla flavored sponge roll filled with fresh vanilla cream and surrounded by coconut shavings.', 'CoconutRoll.jpg', 10, 1);
INSERT INTO PRODUCT(ProductID, Name, Price, Description, Image, Num, Visible)
	VALUES(2005, 'Chocolate Roll', 5.5, 'Chocolate flavored sponge roll with fresh cream.', 'ChocolateRoll.jpg', 10, 1);
INSERT INTO PRODUCT(ProductID, Name, Price, Description, Image, Num, Visible)
	VALUES(3001, 'Americano', 2.7, 'Espresso based black coffee.', 'Americano.jpg', 10, 1);
INSERT INTO PRODUCT(ProductID, Name, Price, Description, Image, Num, Visible)
	VALUES(3002, 'Caramel Macchiato', 3.2, 'Espresso with steamed milk and caramel sauce.', 'CaramelMacchiato.jpg', 10, 1);
INSERT INTO PRODUCT(ProductID, Name, Price, Description, Image, Num, Visible)
	VALUES(3003, 'Boba Milk Tea', 3.5, 'Black tea with fresh milk, cream and boba.', 'BobaMilkTea.jpg', 10, 1);
INSERT INTO PRODUCT(ProductID, Name, Price, Description, Image, Num, Visible)
	VALUES(3004, 'Iced Fruit Tea', 3.7, 'Jasmine green tea with fresh peach pulp.', 'IcedFruitTea.jpg', 10, 1);
INSERT INTO PRODUCT(ProductID, Name, Price, Description, Image, Num, Visible)
	VALUES(3005, 'Iced Coffee', 3.2, 'Iced Sweetened Americano with sea salt cream.', 'IcedCoffee.jpg', 10, 1);


INSERT INTO CATEGORY (CategoryID, Name)
	VALUES (0, 'Bread');
INSERT INTO CATEGORY (CategoryID, Name)
	VALUES (1, 'Cake');
INSERT INTO CATEGORY (CategoryID, Name)
	VALUES (2, 'Drink');
	
INSERT INTO PRODUCT_OWN_CATEGORY(ProductID, CategoryID)
	VALUES(1001, 0);
INSERT INTO PRODUCT_OWN_CATEGORY(ProductID, CategoryID)
	VALUES(1002, 0);
INSERT INTO PRODUCT_OWN_CATEGORY(ProductID, CategoryID)
	VALUES(1003, 0);
INSERT INTO PRODUCT_OWN_CATEGORY(ProductID, CategoryID)
	VALUES(1004, 0);
INSERT INTO PRODUCT_OWN_CATEGORY(ProductID, CategoryID)
	VALUES(1005, 0);
INSERT INTO PRODUCT_OWN_CATEGORY(ProductID, CategoryID)
	VALUES(1006, 0);
INSERT INTO PRODUCT_OWN_CATEGORY(ProductID, CategoryID)
	VALUES(1007, 0);
INSERT INTO PRODUCT_OWN_CATEGORY(ProductID, CategoryID)
	VALUES(2001, 1);
INSERT INTO PRODUCT_OWN_CATEGORY(ProductID, CategoryID)
	VALUES(2002, 1);
INSERT INTO PRODUCT_OWN_CATEGORY(ProductID, CategoryID)
	VALUES(2003, 1);
INSERT INTO PRODUCT_OWN_CATEGORY(ProductID, CategoryID)
	VALUES(2004, 1);
INSERT INTO PRODUCT_OWN_CATEGORY(ProductID, CategoryID)
	VALUES(2005, 1);
INSERT INTO PRODUCT_OWN_CATEGORY(ProductID, CategoryID)
	VALUES(3001, 2);
INSERT INTO PRODUCT_OWN_CATEGORY(ProductID, CategoryID)
	VALUES(3002, 2);
INSERT INTO PRODUCT_OWN_CATEGORY(ProductID, CategoryID)
	VALUES(3003, 2);
INSERT INTO PRODUCT_OWN_CATEGORY(ProductID, CategoryID)
	VALUES(3004, 2);
INSERT INTO PRODUCT_OWN_CATEGORY(ProductID, CategoryID)
	VALUES(3005, 2);

INSERT INTO FOOD_ORDER (OrderID, AccountID, PurchaseDate, TotalPrice, Comments)
	VALUES (0, 100, STR_TO_DATE('04/25/2020','%m/%d/%Y'), 33.77, 'First purchase.');
INSERT INTO FOOD_ORDER (OrderID, AccountID, PurchaseDate, TotalPrice, Comments)
	VALUES (1, 106, STR_TO_DATE('04/25/2020','%m/%d/%Y'), 41.42, 'First purchase.');
INSERT INTO FOOD_ORDER (OrderID, AccountID, PurchaseDate, TotalPrice, Comments)
	VALUES (2, 109, STR_TO_DATE('04/25/2020','%m/%d/%Y'), 18.16, 'First purchase.');

INSERT INTO ORDER_OWN_PRODUCT (OrderID, ProductID, Num)
	VALUES (0, 1001, 2);
INSERT INTO ORDER_OWN_PRODUCT (OrderID, ProductID, Num)
	VALUES (0, 1002, 4);
INSERT INTO ORDER_OWN_PRODUCT (OrderID, ProductID, Num)
	VALUES (0, 2001, 2);
INSERT INTO ORDER_OWN_PRODUCT (OrderID, ProductID, Num)
	VALUES (1, 2005, 2);
INSERT INTO ORDER_OWN_PRODUCT (OrderID, ProductID, Num)
	VALUES (1, 3001, 10);
INSERT INTO ORDER_OWN_PRODUCT (OrderID, ProductID, Num)
	VALUES (2, 3004, 1);
INSERT INTO ORDER_OWN_PRODUCT (OrderID, ProductID, Num)
	VALUES (2, 1002, 1);
INSERT INTO ORDER_OWN_PRODUCT (OrderID, ProductID, Num)
	VALUES (2, 2003, 2);

INSERT INTO ORDER_DETAIL (OrderID, ProductID, Name, Price, Num)
	VALUES (0, 1001, 'Coconut Bread', 3.5, 2);
INSERT INTO ORDER_DETAIL (OrderID, ProductID, Name, Price, Num)
	VALUES (0, 1002, 'Garlic Cheese', 2.8, 4);
INSERT INTO ORDER_DETAIL (OrderID, ProductID, Name, Price, Num)
	VALUES (0, 2001, 'Blueberry Cheesecake', 4.3, 2);
INSERT INTO ORDER_DETAIL (OrderID, ProductID, Name, Price, Num)
	VALUES (1, 2005, 'Chocolate Roll', 5.5, 2);
INSERT INTO ORDER_DETAIL (OrderID, ProductID, Name, Price, Num)
	VALUES (1, 3001, 'Americano', 2.7, 10);
INSERT INTO ORDER_DETAIL (OrderID, ProductID, Name, Price, Num)
	VALUES (2, 3004, 'Iced Fruit Tea', 3.7, 1);
INSERT INTO ORDER_DETAIL (OrderID, ProductID, Name, Price, Num)
	VALUES (2, 1002, 'Garlic Cheese', 2.8, 1);
INSERT INTO ORDER_DETAIL (OrderID, ProductID, Name, Price, Num)
	VALUES (2, 2003, 'Red Velvet Slice', 3.7, 2);

INSERT INTO CART (AccountID)
	VALUES (101);
INSERT INTO CART (AccountID)
	VALUES (106);

INSERT INTO CART_OWN_PRODUCT (AccountID, ProductID, Num)
	VALUES (101, 1002, 2);
INSERT INTO CART_OWN_PRODUCT (AccountID, ProductID, Num)
	VALUES (101, 2001, 2);
INSERT INTO CART_OWN_PRODUCT (AccountID, ProductID, Num)
	VALUES (101, 2002, 2);
INSERT INTO CART_OWN_PRODUCT (AccountID, ProductID, Num)
	VALUES (106, 3001, 2);
INSERT INTO CART_OWN_PRODUCT (AccountID, ProductID, Num)
	VALUES (106, 1003, 10);

INSERT INTO FAVORITE (AccountID)
	VALUES (101);

INSERT INTO FAVORITE_OWN_PRODUCT (AccountID, ProductID)
	VALUES (101, 3003);
