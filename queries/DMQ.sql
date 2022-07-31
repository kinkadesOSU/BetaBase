-- This file contains a sample of the queries used in our website. See line 24 in app.js for a full list.

-------- Sample INSERT Queries--------------------------------------
-- Areas
INSERT INTO areas (name, latitude, longitude, stateID)
VALUES
   ('Black Bear Buttress','40.741', '73.989','1'),
   ('Lower Tier','41.741', '75.989', '2');

-- Gyms
INSERT INTO gyms (name, city, stateID, address, cost)
VALUES
    ('Climb to the Top','Madison', '3','123 Cheese Circle', '14.00'),
    ('Rocks and Ropes','Tucson', '2','330 S Toole Ave', '16.00'),
    ('Inner Peaks','Charlotte', '1','532 N Rocky Road', '20.25');


-- Routes
INSERT INTO routes (name, grade, description, areaID)
VALUES
    ('TestName', 'TestTown', 'TestDescription', 'Lower Tier');

-- Routes-Styles
INSERT INTO routes_styles(routeID, styleID)
VALUES
    (1, 4);

-- States
INSERT INTO states (stateName)
VALUES
('North Carolina'),
('Arizona');

-- Styles
INSERT INTO styles (type)
VALUES
    ('Ice');

-------- Select Queries--------------------------------------

-- Areas
SELECT * FROM areas;

-- Gyms
SELECT * FROM gyms;

-- Routes
SELECT * FROM routes;

-- Routes-styles
SELECT * FROM routes_styles;

-- States
SELECT * FROM states;

-- Styles
SELECT * FROM styles;

-------- Delete Query--------------------------------------
-- Routes
DELETE FROM routes WHERE id=2;

-------- Update Query--------------------------------------
-- Routes
UPDATE routes
SET name = 'test', grade = '5.14', description = "test route", areaID = 3
WHERE id = 4;

-------- 1->M Delete Query--------------------------------------
DELETE FROM routes_styles WHERE id=2

