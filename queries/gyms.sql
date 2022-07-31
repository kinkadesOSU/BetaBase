DROP TABLE IF EXISTS gyms;
CREATE TABLE gyms(
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL, 
    `city` VARCHAR(255) NOT NULL, 
    `stateID` int(11) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `cost` float(4,2) NOT NULL,
    PRIMARY KEY (id), 
    FOREIGN KEY (stateID)
        REFERENCES states(id)
    );


INSERT INTO gyms (name, city, stateID, address, cost)
VALUES
    ('Climb to the Top','Madison', '3','123 Cheese Circle', '14.00'),
    ('Rocks and Ropes','Tucson', '2','330 S Toole Ave', '16.00'),
    ('Inner Peaks','Charlotte', '1','532 N Rocky Road', '20.25')
