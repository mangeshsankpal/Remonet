var firebase = require('firebase')

var config = {
	apiKey: "DummyKey",
	authDomain: "DummyDomain",
	databaseURL: "DummyDatabseUrl",
	projectId: "Dummy",
	storageBucket: "DummyBucket",
	messagingSenderId: "DummyNumId"
}
var configuration = firebase.initializeApp(config);

module.exports = configuration;
