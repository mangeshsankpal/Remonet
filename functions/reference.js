var config = require('./Configuration');

const MQTT_DATABASE_URL = 'https://***.com'
const MQTT_SERVICE_ACC_KEY_PATH = './ServiceAccountKey.json'
const FIREBASE_DB_REFERENCE_ASSET = 'asset-track/mqtt'												//Document Name which stores data
const FIREBASE_DB_REFERENCE_BMS = 'BMS/mqtt'
const FIREBASE_DB_REFERENCE_ASSET_DATALIMITS = 'asset-track/dataLimits'
const FIREBASE_DB_REFERENCE_BMS_DATALIMITS = 'BMS/bmsLimits'
const FIREBASE_DB_REFERENCE_BMS_NODELIMITS = 'BMS/nodeDetails'
const FIREBASE_DB_REFERENCE_ASSET_NODELIMITS = 'asset-track/nodeDetails'
const FIREBASE_DB_REFERENCE_ASSET_TRACK = 'asset-track/trackingData/mqtt'
var admin = require('firebase-admin');
var serviceAccount = require(MQTT_SERVICE_ACC_KEY_PATH);

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: MQTT_DATABASE_URL
});

var db = admin.database()
var dbRef = db.ref("BMS");
var assetDataLimits = db.ref(FIREBASE_DB_REFERENCE_ASSET_DATALIMITS);
var bmsDataLimits = db.ref(FIREBASE_DB_REFERENCE_BMS_DATALIMITS);
var bmsRef = db.ref(FIREBASE_DB_REFERENCE_BMS);
var assetRef = db.ref(FIREBASE_DB_REFERENCE_ASSET);
var bmsNodeDetails = db.ref(FIREBASE_DB_REFERENCE_BMS_NODELIMITS);
var assetNodeDetails = db.ref(FIREBASE_DB_REFERENCE_ASSET_NODELIMITS);
var assettracking = db.ref(FIREBASE_DB_REFERENCE_ASSET_TRACK);
var usersRef = db.ref("UserDetails");
var references = {
	assetDataLimits,
	bmsDataLimits,
	bmsNodeDetails,
	usersRef,
	bmsRef,
	assetRef,
	assetNodeDetails,
	assettracking
}


module.exports = references;
