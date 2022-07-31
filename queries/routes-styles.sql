
DROP TABLE IF EXISTS styles;
CREATE TABLE `styles` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `type` varchar(255) NOT NULL,
    PRIMARY KEY (id)
);


DROP TABLE IF EXISTS routes;
CREATE TABLE routes (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    `grade` varchar(255) NOT NULL,
    `description` text,
    `areaID` int(11) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (areaID) REFERENCES areas(id)
);


DROP TABLE IF EXISTS routes_styles;
CREATE TABLE routes_styles (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `routeID` int(11) NOT NULL,
    `styleID` int(11) NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (routeID) REFERENCES routes(id),
    FOREIGN KEY (styleID) REFERENCES styles(id)
);
