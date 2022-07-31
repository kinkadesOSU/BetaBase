const express = require("express");
const app = express();
// const axios = require('axios')

const methodOverride = require('method-override');
app.set('port', process.argv[2]);

app.use(express.json())
app.use(express.static(__dirname + '/public'));

// Form data
app.use(express.urlencoded({ extended: true })); 

// Method override
app.use(methodOverride('_method')); 

// EJS view engine
app.set('view engine', 'ejs');

// Database
const db = require('./db-connector')

//Queries
const addState = `INSERT INTO states SET ?`
const getStates= 'SELECT * FROM states;';
const getGyms= 'SELECT * FROM gyms;';
const getGym= `SELECT * FROM gyms WHERE id=?;`;
const addGym = `INSERT INTO gyms SET ?`
const deleteGym = `DELETE FROM gyms WHERE id=?`
const states_select = 'SELECT * FROM states'

const getArea= `SELECT * FROM areas WHERE id=?;`;
const deleteArea = `DELETE FROM areas WHERE id=?`
const areas_select = 'SELECT name FROM areas'
const getAreas= 'SELECT * FROM areas;';
const addArea = `INSERT INTO areas SET ?`

const deleteRoute = `DELETE FROM routes WHERE id=?`
const deleteRoutesStyles_Route = `DELETE FROM routes_styles WHERE routeID=?`
const deleteRoutesStyles_Style = `DELETE FROM routes_styles WHERE styleID=?`
const routes_select = 'SELECT * FROM routes;';
const addRoute = `INSERT INTO routes SET ?;`
const add_route_style = `INSERT INTO routes_styles SET ?;`
const deleteRouteStyle = `DELETE FROM routes_styles WHERE id=?`
const filterRoutes = `SELECT * FROM routes WHERE grade=?`

const styles_select = 'SELECT * FROM styles;';
const routes_styles_select = 'SELECT * FROM routes_styles'
const addStyle = `INSERT INTO styles SET ?`
const deleteStyle = `DELETE FROM styles WHERE id=?`


//Routes
app.get('/', (req, res) => {
    res.render('index')
});

//// -------------------------------------------State routes---------------------------------------------------------------

// SELECT all states
app.get('/states', (req, res) => {

    db.pool.query(getStates, function(err, results, fields){
        const states =  results
        res.render('states', { states });
    });
});

//Insert a new state
app.post('/states/add', (req, res) => {

    // Left side of colon must match names from database
    var data = {
        stateName: req.body.state
        }

    db.pool.query(addState, data, function(err, result){
        if(err){
            next(err);
        return;
        }
    });
    res.redirect('/states')
});

// ----------------------------------------------------------------------------------------------------------


//// -------------------------------------------Gym routes---------------------------------------------------------------
//Get all gyms
app.get('/gyms', (req, res) => {
    let data = []
    db.pool.query(getGyms, function(err, results, fields){
        const gyms =  results
        data.push(gyms)
        db.pool.query(states_select, function(err, results, fields) {
            const states = results
            data.push(states)
            res.render('gyms', {gyms: data[0], states: data[1]})
        });       
    });
});

//Get gym that is to be updated
app.get('/gyms/edit', (req, res) => {
    db.pool.query(getGym,[req.query.id], function(err, results, fields){
        const gym = results
        res.send(gym)
    });
});

//Add new gym
app.post('/gyms', (req, res, next) => {
    let state_id = req.body.stateID

    if (req.body.stateID == 'null') {
        state_id = null
    }

    // Left side of colon must match names from database
    var data = {
        name: req.body.name,
        city: req.body.city,
        stateID: state_id,
        address: req.body.address, 
        cost: req.body.cost
    }
    console.log(data)

    var data = {
        name: req.body.name,
        city: req.body.city,
        stateID: state_id,
        address: req.body.address, 
        cost: req.body.cost
    }
    
    console.log(data)
    db.pool.query(addGym, data, function(err, result){
        if(err){
            next(err);
        return;
        }
    });
    res.redirect('/gyms')
})

//Update gym
app.put('/gyms/edit', (req, res) => {
    // console.log(req.body)
    db.pool.query(getGym,[req.body.id], function(err, result){
        if(err){
            next(err);
        return;
        }
        
        if(result.length == 1)
        {
            var curVals = result[0];
            // console.log(req.body.city)
            db.pool.query("UPDATE gyms SET name=?, city=?, stateID=?, address=?, cost=? WHERE id=? ",
            [req.body.name || curVals.name, req.body.city|| curVals.city, req.body.stateID || curVals.stateID, 
                req.body.address || curVals.address, req.body.cost || curVals.cost, req.body.id],
            function(err, result)
            {
                if(err)
                {
                    next(err);
                    return;
                }
            });
        };
        res.redirect('/gyms')
    });
});

//Delete gym
app.delete('/gyms/:id', (req, res) => {
    db.pool.query(deleteGym, [req.params.id], function(err, result){
        if(err){
            next(err);
        return;
        }
    });
    res.redirect('/gyms')
})

// ----------------------------------------------------------------------------------------------------------


//// -------------------------------------------Areas routes---------------------------------------------------------------
//Get all areas
app.get('/areas', (req, res) => {
    let data = []
    db.pool.query(getAreas, function(err, results, fields){
        const areas =  results
        data.push(areas)
        db.pool.query(states_select, function(err, results, fields) {
            const states = results
            data.push(states)
            res.render('areas', {areas: data[0], states: data[1]})
        });       
    });   
});

//Add new area
app.post('/areas/add', (req, res, next) => {

    // Left side of colon must match names from database
    var data = {
        name: req.body.areaname,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        stateID: req.body.state 
        }

    db.pool.query(addArea, data, function(err, result){
        if(err){
            next(err);
        return;
        }
    });
    res.redirect('/areas')
});

//Get area to edit
app.get('/areas/:id/edit', (req, res) => {
    db.pool.query(getArea,[req.params.id], function(err, results, fields){
        const areas = results
        res.render('editArea', { areas });
    });
});

//Update area
app.put('/editArea/:id', (req, res) => {
    db.pool.query(getArea,[req.params.id], function(err, result){
        if(err){
            next(err);
        return;
        }
        console.log(result)
        if(result.length == 1)
        {
            var curVals = result[0];

            console.log(curVals)
            db.pool.query("UPDATE areas SET name=?, latitude=?, longitude=?, stateID=? WHERE id=? ",
            [req.body.name || curVals.name, req.body.latitude || curVals.latitude, req.body.longitude || curVals.longitude, 
                req.body.stateID || curVals.stateID, req.params.id],
            function(err, result)
            {
                if(err)
                {
                    next(err);
                    return;
                }
            });
        };
        res.redirect('/areas')
    });
});

//Delete area
app.delete('/areas/:id', (req, res) => {
    // execute the query
    db.pool.query(deleteArea, [req.params.id], function(err, result){
        if(err){
            next(err);
        return;
        }
    });
    res.redirect('/areas')
});

// --------------------------------------Route Routes--------------------------------------------------------------------
//Delete route
app.delete('/routes/:id', (req, res) => {
    // delete entries in routes_styles first
    db.pool.query(deleteRoutesStyles_Route, [req.params.id], function(err, result){
        if(err){
            console.log(err)
            next(err);
        return;
        }

        db.pool.query(deleteRoute, [req.params.id], function(err, result){
            if(err){
                console.log(err)
                next(err);
            return;
            }
        });
    });
    res.redirect('/routes')
});

//Get all routes
app.get('/routes', (req, res) => {
    let data = []
    db.pool.query(routes_select, function(err, results, fields){

        const routes = results
        data.push(routes)
    
        db.pool.query(styles_select, function(err, results, fields){
            const styles = results
            data.push(styles)
            
            db.pool.query(routes_styles_select, function(err, results, fields){
                const routes_styles = results
                data.push(routes_styles)
                db.pool.query(areas_select, function(err, results, fields) {
                    const area_names = results
                    data.push(area_names)
                    res.render('routes', {routes: data[0], styles: data[1], routes_styles: data[2], area_names: data[3]})
                });
            });
        });
    });
    
});

// Add new route
app.post('/routes/standalone/add', (req, res, next) => {
    get_area_id = `SELECT id from areas WHERE name = "${req.body.area_name}";`  
    get_route_id = `SELECT id from routes WHERE name = "${req.body.route_name}"`

    // get the area_id to be used in the addRoute query
    db.pool.query(get_area_id, function(err, results, fields){
        const area_id = results[0].id

        // build data to be passed into addRoute query
        let data = {
            name: req.body.route_name,
            grade: req.body.grade,
            description: req.body.description,
            areaID: area_id, 
        }

        // add the route to the database
        db.pool.query(addRoute, data, function(err, results, fields) {
            if(err){
                next(err);
            return;
            }
        });
    
});

    res.redirect('/routes')
});

//test route for adding a route
app.post('/routes/add', (req, res, next) => {
    get_area_id = `SELECT id from areas WHERE name = "${req.body.area_name}";`
    get_style_id = `SELECT id from styles WHERE type = "${req.body.style}";`
    get_route_id = `SELECT id from routes WHERE name = "${req.body.route_name}"`

    // get the area_id to be used in the addRoute query
    db.pool.query(get_area_id, function(err, results, fields){
        const area_id = results[0].id

        // get the style id to be used in the add_route_style query
        db.pool.query(get_style_id, function(err, results, fields) {
            const style_id = results[0].id

            // build data to be passed into addRoute query
            let data = {
                name: req.body.route_name,
                grade: req.body.grade,
                description: req.body.description,
                areaID: area_id, 
            }

            // add the route to the database
            db.pool.query(addRoute, data, function(err, results, fields) {
                if(err){
                    next(err);
                return;
                }

                // get the id of the newly added route
                db.pool.query(get_route_id, function(err, results, fields) {

                    const route_id = results[0].id

                    // build data to be passed into routes_styles query
                    let data = {
                        routeID: route_id,
                        styleID: style_id
                    }

                    // add the route_style entry for the many-to-many relationship
                    db.pool.query(add_route_style, data, function(err, results, fields) {
                        if(err){
                            next(err);
                        return;
                        }
                    });
                });
            });
        });
    });

    res.redirect('/routes-styles')
});

//route to search for particular routes
app.use('/routes/filter/', (req, res) => {
    console.log(req.body.filter)
    db.pool.query(filterRoutes,[req.body.filter], function(err, results, fields){
        const routes = results
        console.log(routes)
        
        res.render('filtered_routes', { routes });
    });
    
});
//// -------------------------------------------Styles routes---------------------------------------------------------------

// Select all styles
app.get('/styles', (req, res) => {
    // Select all routes query
    const styles_select = 'SELECT * FROM styles;';

    db.pool.query(styles_select, function(err, results, fields){

        const styles = results

        res.render('styles', {styles});

    });
});

//Add new style
app.post('/styles/add', (req, res, next) => {
    // Left side of colon must match names from database
    var data = {
        type: req.body.style_name
        }

    db.pool.query(addStyle, data, function(err, result){
        if(err){
            next(err);
        return;
        }
    });
    res.redirect('/routes-styles')
})

// Post new style
app.post('/styles/standalone/add', (req, res, next) => {

    // Left side of colon must match names from database
    var data = {
        type: req.body.style_name
        }

    db.pool.query(addStyle, data, function(err, result){
        if(err){
            next(err);
        return;
        }
    });
    res.redirect('/styles')
})

// Delete style
app.delete('/styles/:id', (req, res) => {
    // execute the query
    db.pool.query(deleteRoutesStyles_Style, [req.params.id], function(err, result){
        if(err){
            console.log(err)
            next(err);
        return;
        }

        db.pool.query(deleteStyle, [req.params.id], function(err, result){
            if(err){
                console.log(err)
                next(err);
            return;
            }
        });
    });
    res.redirect('/styles')
})

//// -------------------------------------------Routes-Styles routes---------------------------------------------------------------
// Get all routes-styles
app.get('/routes-styles', (req, res) => {

    let data = []
    const routes_select = 'SELECT * FROM routes;';
    const styles_select = 'SELECT * FROM styles;';
    const routes_styles_select = 'SELECT * FROM routes_styles'
    const areas_select = 'SELECT name FROM areas'

    const new_routes_styles_select = 'SELECT routes_styles.id, routes.name, styles.type FROM routes_styles INNER JOIN routes ON routes.id = routes_styles.routeID INNER JOIN styles ON styles.id = routes_styles.styleID '

    db.pool.query(routes_select, function(err, results, fields){

        const routes = results

        data.push(routes)
        
        db.pool.query(styles_select, function(err, results, fields){

            const styles = results
    
            data.push(styles)
            
            db.pool.query(new_routes_styles_select, function(err, results, fields){

                const routes_styles = results
        
                data.push(routes_styles)
                
                db.pool.query(areas_select, function(err, results, fields) {
                    
                    const area_names = results

                    data.push(area_names)

                    res.render('routes-styles', {routes: data[0], styles: data[1], routes_styles: data[2], area_names: data[3]})

                });

                    
            });
        });
    });   
});

//add new route style
app.post('/routes-styles/add', (req, res, next) => {

    addRouteStyle = `INSERT INTO routes_styles SET
    routeID = (SELECT id from routes WHERE name = ?),
    styleID = (SELECT id from styles WHERE type = ?);`

    console.log(req.body.route_name)
    console.log(req.body.style_name_test)
    
    db.pool.query(addRouteStyle, [req.body.route_name, req.body.style_name_test], function(err, results, fields) {
        if(err){
            next(err);
        return;
        }
    });

    res.redirect('/routes-styles')
});


//delete a route/style
app.delete('/routes-styles/:id', (req, res) => { 
    // execute the query
    db.pool.query(deleteRouteStyle, [req.params.id], function(err, result){
        console.log(req.params.id)
        if(err){
            next(err);
        return;
        }
    });
    res.redirect('/routes-styles')
});

// error routes
app.use(function(req,res){
    res.status(404);
    // res.render('404');
  });
  
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.type('plain/text');
    res.status(500);
    // res.render('500');
});

// listen on port specified with node index.js XXXX
app.listen(app.get('port'), () => {
    console.log(`Express started on port ${app.get('port')}`);
});
