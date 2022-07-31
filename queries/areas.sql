DROP TABLE IF EXISTS areas;
CREATE TABLE areas(
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL, 
    `latitude` float(7,4), 
    `longitude` float(7,4),
    `stateID` int(11) NOT NULL,
    PRIMARY KEY (id), 
    FOREIGN KEY (stateID)
        REFERENCES states(id)
    );


INSERT INTO areas (name, latitude, longitude, stateID)
VALUES
   ('Black Bear Buttress','40.741', '73.989','1'),
   ('Lower Tier','41.741', '75.989', '2');
