
-- Query to view all states data
SELECT * FROM states;

INSERT INTO states SET
    name = :name_input


-- GYM QUERIES --

-- Gyms Select
SELECT * FROM gyms;

-- Gyms insert
INSERT INTO gyms SET 
    name = :name_input,
    city = :city_input,
    stateID = :state_input,
    address = :address_input,
    cost = :cost_input;

-- Gyms Delete
DELETE FROM gyms WHERE id= :id_input;


-- AREA QUERIES --

-- Areas Select
SELECT * FROM areas;

-- Areas insert
INSERT INTO areas SET
    name = :area_name_input,
    latitude = :latitude_input,
    longitude = :longitude_input,
    stateID = :stateID_input

-- Areas Delete
DELETE FROM areas WHERE id= :id_input;


-- ROUTES QUERIES --

-- Routes Select
SELECT * FROM routes;

-- Routes insert
INSERT INTO routes SET 
    name = :route_name_input,
    grade = :route_grade_input,
    description = :route_description_input,
    areaID = :area_id_input

-- Routes Delete
DELETE FROM routes_styles WHERE routeID= :id_input;
DELETE FROM routes WHERE id= :id_input;


-- Styles QUERIES --

-- Styles Select
SELECT * FROM styles;

-- Styles insert
INSERT INTO styles SET 
    type = :style_type_input;

-- Styles Delete
DELETE FROM routes_styles WHERE styleID= :id_input;
DELETE FROM styles WHERE id= :id_input;

-- Routes Styles QUERIES --

-- Routes Styles Select
SELECT * FROM routes_styles

-- Routes Styles insert
INSERT INTO routes_styles SET
    routeID = (SELECT id from styles WHERE type = :style_type_input),
    styleID = (SELECT id from routes WHERE name = :route_name_input);

-- Routes Styles Delete
DELETE FROM routes_styles WHERE id= :id_input;