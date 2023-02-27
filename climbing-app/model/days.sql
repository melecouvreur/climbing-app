"TABLE creation commands - NB: Not needed if you ran npm migrate"
DROP TABLE IF EXISTS days;

CREATE TABLE days (
dID INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
day VARCHAR(20),
uID INT REFERENCES user_info(uID)
SET CONNECTION TO user_info TABLE
);

"TABLE population commands.
Copy & paste commands directly in mySQL to poplate table" 

INSERT INTO days (uID, day) 
VALUES 
(1, "Saturday"),(1, "Sunday"), (1, "Monday"), (1, "Tuesday"),
(2, "Saturday"),(2, "Sunday"), (2, "Monday"), (2, "Tuesday"),
(3, "Saturday"),(3, "Sunday"), (3, "Monday"), (3, "Tuesday"), 
(4, "Saturday"),(4, "Sunday"), (4, "Monday"), (4, "Tuesday"),
(5, "Saturday"),(5, "Sunday"), (5, "Monday"), (5, "Tuesday"), (5,"Friday"),
(6, "Saturday"),(6, "Sunday"), (6, "Monday"), (6, "Tuesday"), (6,"Friday"),
(7, "Saturday"),(7, "Sunday"), (7, "Wednesday"), (7, "Thursday"), (7,"Friday"),
(8, "Saturday"),(8, "Sunday"), (8, "Wednesday"), (8, "Thursday"),
(9, "Saturday"),(9, "Sunday"), (9, "Wednesay"), (9, "Thursday");