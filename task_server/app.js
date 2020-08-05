const path 			= require('path');
const config 		= require('config');
const express 		= require('express');
const WebSocket 	= require('ws');
const router 		= express.Router();
const cookieParser 	= require('cookie-parser');
const bodyParser 	= require('body-parser');
const controllers 	= require('./controllers');

const httpServerPort = config.get('httpServerPort');

const app = express();

app.set('view engine', 'hbs');
// get requests
router.get('/', controllers.index);
router.get('/tasks', controllers.tasks);
// post requests
router.post('/get_tasks', controllers.get_tasks);
router.post('/tasks', controllers.set_tasks);
router.post('/remove_tasks', controllers.remove_tasks);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(router)


app.listen(httpServerPort, ()=>{console.log(`http server is running on port: ${httpServerPort}`)});
