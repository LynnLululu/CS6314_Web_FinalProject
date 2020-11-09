INSERT INTO ADMIN (AccountID, Fname, Lname, DateOfBirth, Email, UserName, Password)
	VALUES (0, 'Charles', 'Lee', STR_TO_DATE('01/01/1997','%m/%d/%Y'), 'chalee@gmail.com', 'adminL', '123450');
INSERT INTO ADMIN (AccountID, Fname, Lname, DateOfBirth, Email, UserName, Password)
	VALUES (1, 'Maya', 'Mitchell', STR_TO_DATE('04/05/2000','%m/%d/%Y'), 'mayamit@outlook.com', 'adminM', '123451');
INSERT INTO ADMIN (AccountID, Fname, Lname, DateOfBirth, Email, UserName, Password)
	VALUES (2, 'Yale', 'Holmes', STR_TO_DATE('06/08/2000','%m/%d/%Y'), 'yalhol@gmail.com', 'adminH', '123452');

INSERT INTO CUSTOMER (AccountID, Fname, Lname, DateOfBirth, Email, UserName, Password, Payment, MailAddr, BillAddr, Phone)
	VALUES (100, 'Medhurst', 'Tess', STR_TO_DATE('01/29/1991','%m/%d/%Y'), 'medtes@gmail.com', 'medtes', '6789321469', '4829571662449868', '4494 Wilson Avenue Plano TX 75023', '4494 Wilson Avenue Plano TX 75023', '7112659193');
INSERT INTO CUSTOMER (AccountID, Fname, Lname, DateOfBirth, Email, UserName, Password, Payment, MailAddr, BillAddr, Phone)
	VALUES (101, 'Hayes', 'Mitchel', STR_TO_DATE('07/17/1972','%m/%d/%Y'), 'haymit@gmail.com', 'haymit', '1289312', '5487744475243527', '932 Worthington Drive Plano TX 75074', '932 Worthington Drive Plano TX 75074', '6758447400');
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

INSERT INTO PRODUCT (ProductID, Name, Price, Description, Image, Visible, Num)
	VALUES (0, 'chef cappuccino', 6.25, 'Highly recommend!', NULL, 1, 0);
INSERT INTO PRODUCT (ProductID, Name, Price, Description, Image, Visible, Num)
	VALUES (1, 'meemaw cupcake', 2.00, 'Meemaw special!', NULL, 1, 0);	
INSERT INTO PRODUCT (ProductID, Name, Price, Description, Image, Visible, Num)
	VALUES (2, 'rocky whole-wheat bread', 3.00, 'Zero or infinite.', NULL, 1, 0);
INSERT INTO PRODUCT (ProductID, Name, Price, Description, Image, Visible, Num)
	VALUES (3, 'llet tonnac', 10.00, 'Coming soon.', NULL, 0, 0);

INSERT INTO CATAGORY (CatagoryID, Name)
	VALUES (0, 'Cake');
INSERT INTO CATAGORY (CatagoryID, Name)
	VALUES (1, 'Bread');
INSERT INTO CATAGORY (CatagoryID, Name)
	VALUES (2, 'Drink');
	
INSERT INTO PRODUCT_OWN_CATAGORY (ProductID, CatagoryID)
	VALUES (0, 2);
INSERT INTO PRODUCT_OWN_CATAGORY (ProductID, CatagoryID)
	VALUES (1, 0);
INSERT INTO PRODUCT_OWN_CATAGORY (ProductID, CatagoryID)
	VALUES (2, 1);

INSERT INTO FOOD_ORDER (OrderID, AccountID, PurchaseDate, TotalPrice, Comments)
	VALUES (0, 100, STR_TO_DATE('04/25/2020','%m/%d/%Y'), 33.77, 'First purchase.');
INSERT INTO FOOD_ORDER (OrderID, AccountID, PurchaseDate, TotalPrice, Comments)
	VALUES (1, 106, STR_TO_DATE('04/25/2020','%m/%d/%Y'), 41.42, 'First purchase.');
INSERT INTO FOOD_ORDER (OrderID, AccountID, PurchaseDate, TotalPrice, Comments)
	VALUES (2, 109, STR_TO_DATE('04/25/2020','%m/%d/%Y'), 18.16, 'First purchase.');

INSERT INTO ORDER_OWN_PRODUCT (OrderID, ProductID, Num)
	VALUES (0, 0, 2);
INSERT INTO ORDER_OWN_PRODUCT (OrderID, ProductID, Num)
	VALUES (0, 1, 4);
INSERT INTO ORDER_OWN_PRODUCT (OrderID, ProductID, Num)
	VALUES (0, 2, 2);
INSERT INTO ORDER_OWN_PRODUCT (OrderID, ProductID, Num)
	VALUES (1, 0, 2);
INSERT INTO ORDER_OWN_PRODUCT (OrderID, ProductID, Num)
	VALUES (1, 1, 10);
INSERT INTO ORDER_OWN_PRODUCT (OrderID, ProductID, Num)
	VALUES (2, 0, 1);
INSERT INTO ORDER_OWN_PRODUCT (OrderID, ProductID, Num)
	VALUES (2, 1, 1);
INSERT INTO ORDER_OWN_PRODUCT (OrderID, ProductID, Num)
	VALUES (2, 2, 2);

INSERT INTO ORDER_DETAIL (OrderID, ProductID, Name, Price, Num)
	VALUES (0, 0, 'chef cappuccino', 6.25, 2);
INSERT INTO ORDER_DETAIL (OrderID, ProductID, Name, Price, Num)
	VALUES (0, 1, 'meemaw doughnut', 2.0, 4);
INSERT INTO ORDER_DETAIL (OrderID, ProductID, Name, Price, Num)
	VALUES (0, 2, 'rocky ice cream', 3.0, 2);
INSERT INTO ORDER_DETAIL (OrderID, ProductID, Name, Price, Num)
	VALUES (1, 0, 'chef cappuccino', 6.25, 2);
INSERT INTO ORDER_DETAIL (OrderID, ProductID, Name, Price, Num)
	VALUES (1, 1, 'meemaw doughnut', 2.00, 10);
INSERT INTO ORDER_DETAIL (OrderID, ProductID, Name, Price, Num)
	VALUES (2, 0, 'chef cappuccino', 6.25, 1);
INSERT INTO ORDER_DETAIL (OrderID, ProductID, Name, Price, Num)
	VALUES (2, 1, 'meemaw doughnut', 2.00, 1);
INSERT INTO ORDER_DETAIL (OrderID, ProductID, Name, Price, Num)
	VALUES (2, 2, 'rocky ice cream', 3.00, 2);

INSERT INTO CART (AccountID)
	VALUES (101);
INSERT INTO CART (AccountID)
	VALUES (106);

INSERT INTO CART_OWN_PRODUCT (AccountID, ProductID, Num)
	VALUES (101, 0, 2);
INSERT INTO CART_OWN_PRODUCT (AccountID, ProductID, Num)
	VALUES (101, 1, 2);
INSERT INTO CART_OWN_PRODUCT (AccountID, ProductID, Num)
	VALUES (101, 2, 2);
INSERT INTO CART_OWN_PRODUCT (AccountID, ProductID, Num)
	VALUES (106, 0, 2);
INSERT INTO CART_OWN_PRODUCT (AccountID, ProductID, Num)
	VALUES (106, 1, 10);

INSERT INTO WISHLIST (AccountID)
	VALUES (105);

INSERT INTO WISHLIST_OWN_PRODUCT (AccountID, ProductID)
	VALUES (105, 3);
						
