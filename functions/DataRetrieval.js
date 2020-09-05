var reference = require('./reference');
var ref = reference.assetRef;
var ref1 = reference.bmsRef;
var ref2 = reference.assetDataLimits;
var ref3 = reference.bmsDataLimits;
var ref4 = reference.bmsNodeDetails;
var ref5 = reference.assetNodeDetails;
var ref6 = reference.assettracking;
const express = require('express');
const router = express.Router();
var firebase = require('./Configuration');

ref1.on('value', gotData1, errData1);

var Gateway = [];
var Node = [];
var DateTime = [];
var Location = [];
var Machine = [];
var LocationX = [];
var LocationY = [];
var Vibration = [];
var ToolTemperature = [];

var Gateway2 = [];
var Node2 = [];
var DateTime2 = [];
var Location2 = [];
var Machine2 = [];
var LocationX2 = [];
var LocationY2 = [];


var Tooltemp_lower = [];
var Tooltemp_upper = [];
var Vibration_lower = [];
var Vibration_upper = [];
var Data_type_Machine = [];

var Data_type_BMS = [];
var Temp_lower = [];
var Temp_upper = [];
var Rh_lower = [];
var Rh_upper = [];
var Al_lower = [];
var Al_upper = [];

var BMS_Node = [];
var BMS_Node_Temp_lower = [];
var BMS_Node_Temp_upper = [];
var BMS_Node_Rh_lower = [];
var BMS_Node_Rh_upper = [];
var BMS_Node_Al_lower = [];
var BMS_Node_Al_upper = [];

var Asset_Node = [];
var Asset_Node_Tool_temp_lower = [];
var Asset_Node_Tool_temp_upper = [];
var Asset_Node_Vib_lower = [];
var Asset_Node_Vib_upper = [];

var Asset_node_array = [];
var Asset_gateway_array = [];
var AssetKeys = [];
ref.on('value', gotData, errData);
function gotData(data) {
    var j = 0;
    var q = 0;
    var a = 0;
    var b = 0;
    var assetData = data.val();
    AssetKeys = Object.keys(assetData);
    var keys = Object.keys(assetData);
    for (var i = 0; i < keys.length; i++) {
        var k = keys[i];

        if(assetData[k].Vibration !== undefined )
        {
          Gateway[a] = assetData[k].Gateway;
          Node[a] = assetData[k].Node;
          DateTime[a] = assetData[k].DateTime;
          Location[a] = assetData[k].Location;
          Machine[a] = assetData[k].Machine;
          LocationX[a] = assetData[k].LocationX;
          LocationY[a] = assetData[k].LocationY;
          Vibration[a] = assetData[k].Vibration;
          ToolTemperature[a] = assetData[k].ToolTemperature;
          var n = Asset_node_array.includes(Node[a])
          if(n === false)
          {
            Asset_node_array[j] = Node[a];
            j++;
          }
          var g = Asset_gateway_array.includes(Gateway[a])
          if(g === false)
          {
            Asset_gateway_array[q] = Gateway[a];
            q++;
          }
          a++;
        }
        else
        {
          Gateway2[b] = assetData[k].Gateway;
          Node2[b] = assetData[k].Node;
          DateTime2[b] = assetData[k].DateTime;
          Location2[b] = assetData[k].Location;
          Machine2[b] = assetData[k].Machine;
          LocationX2[b] = assetData[k].LocationX;
          LocationY2[b] = assetData[k].LocationY;
          b++;
        }

    }
}

function errData(err) {
    console.log(err);
}


ref2.on('value', gotData2, errData2);

function gotData2(data)
 {
  var assetDataLimits = data.val();
  var keys = Object.keys(assetDataLimits);
  for (var i = 0; i < keys.length; i++) {
      var k = keys[i];
      Data_type_Machine[i] = assetDataLimits[k].data;
      Tooltemp_lower[i] = assetDataLimits[k].tooltemp_lower;
      Tooltemp_upper[i] = assetDataLimits[k].tooltemp_upper;
      Vibration_lower[i] = assetDataLimits[k].vibration_lower;
      Vibration_upper[i] = assetDataLimits[k].vibration_upper;
  }
}

ref6.on('value', gotData6, errData6);
var tag = [];
var gateway = [];
var datetime = [];
var signal = [];
function gotData6(data)
 {
  var assetTrack = data.val();
  var keys = Object.keys(assetTrack);
  for (var i = 0; i < keys.length; i++) {
      var k = keys[i];
      tag[i] = assetTrack[k].Tag;
      gateway[i] = assetTrack[k].Reader;
      datetime[i] = assetTrack[k].DateTime;
      signal[i] = assetTrack[k].Signal;
  }
}
function errData6(err) {
    console.log(err);
}

var assettrackdata = {
  gateway: gateway,
  tag: tag,
  datetime: datetime,
  signal: signal
}

ref3.on('value', gotData3, errData3);

function gotData3(data)
 {
  var bmsDataLimits = data.val();
  var keys = Object.keys(bmsDataLimits);
  for (var i = 0; i < keys.length; i++) {
      var k = keys[i];
      Data_type_BMS[i] = bmsDataLimits[k].data;
      Al_lower[i] = bmsDataLimits[k].al_lower;
      Al_upper[i] = bmsDataLimits[k].al_upper;
      Rh_lower[i] = bmsDataLimits[k].rh_lower;
      Rh_upper[i] = bmsDataLimits[k].rh_upper;
      Temp_lower[i] = bmsDataLimits[k].temp_lower;
      Temp_upper[i] = bmsDataLimits[k].temp_upper;
  }
}

function errData2(err) {
    console.log(err);
}


function errData3(err) {
    console.log(err);
}

var Gateway1 = [];
var Node1 = [];
var DateTime1 = [];
var Temperature1 = [];
var RelativeHumidity1 = [];
var AmbientLight1 = [];

var Bms_node_array = [];
var Bms_gateway_array = [];
var BmsKeys = [];
function gotData1(data) {
    var j = 0;
    var q = 0;
    var nodedata = data.val();
    var keys = Object.keys(nodedata);
    BmsKeys = Object.keys(nodedata);
    for (var i = 0; i < keys.length; i++) {
        var k = keys[i];
        Gateway1[i] = nodedata[k].Gateway;
        Node1[i] = nodedata[k].Node;
        DateTime1[i] = nodedata[k].DateTime;
        Temperature1[i] = nodedata[k].Temperature;
        RelativeHumidity1[i] = nodedata[k].RelativeHumidity;
        AmbientLight1[i] = nodedata[k].AmbientLight;
        var n = Bms_node_array.includes(Node1[i])
      	if(n === false)
      	{
      	  Bms_node_array[j] = Node1[i];
      	  j++;
      	}
        var g = Bms_gateway_array.includes(Gateway1[i])
      	if(g === false)
      	{
      	  Bms_gateway_array[q] = Gateway1[i];
      	  q++;
      	}
    }
}
function errData1(err) {
    console.log(err);
}
var BMS_NodeLimits = [];
var bmsNodeDetailsKeys = [];
ref4.on('value', gotData4, errData4);
var bmsNodeLength = [];
function gotData4(data)
 {
  var bmsNodeDetails = data.val();
  if(bmsNodeDetails !== undefined && bmsNodeDetails !== null){
  var keys = Object.keys(bmsNodeDetails);
  bmsNodeDetailsKeys = Object.keys(bmsNodeDetails);
  bmsNodeLength[0] = keys.length;
  for (var i = 0; i < keys.length; i++) {
      var k = keys[i];
      BMS_Node[i] = bmsNodeDetails[k].node;
      BMS_Node_Temp_lower[i] = bmsNodeDetails[k].temp_lower;
      BMS_Node_Temp_upper[i] = bmsNodeDetails[k].temp_upper;
      BMS_Node_Rh_lower[i] = bmsNodeDetails[k].rh_lower;
      BMS_Node_Rh_upper[i] = bmsNodeDetails[k].rh_upper;
      BMS_Node_Al_lower[i] = bmsNodeDetails[k].al_lower;
      BMS_Node_Al_upper[i] = bmsNodeDetails[k].al_upper;
  }
}
}
function errData4(err) {
    console.log(err);
}
var AssetNodeDetailsKeys = [];
var Asset_NodeLimits = [];
ref5.on('value', gotData5, errData5);
var assetNodeLength = [];
function gotData5(data)
 {
  var assetNodeDetails = data.val();
  if(assetNodeDetails !== undefined && assetNodeDetails !== null){
  var keys = Object.keys(assetNodeDetails);
  AssetNodeDetailsKeys = Object.keys(assetNodeDetails);
  assetNodeLength[0] = keys.length;
  for (var i = 0; i < keys.length; i++) {
      var k = keys[i];
      Asset_Node[i] = assetNodeDetails[k].node;
      Asset_Node_Tool_temp_lower[i] = assetNodeDetails[k].Tool_temp_lower;
      Asset_Node_Tool_temp_upper[i] = assetNodeDetails[k].Tool_temp_upper;
      Asset_Node_Vib_lower[i] = assetNodeDetails[k].Vib_lower;
      Asset_Node_Vib_upper[i] = assetNodeDetails[k].Vib_upper;
    }
  }
}
function errData5(err) {
    console.log(err);
}

var assetData = {
    gateway: Gateway,
    node: Node,
    dateTime: DateTime,
    location: Location,
    machine: Machine,
    locationX: LocationX,
    locationY: LocationY,
    vibration: Vibration,
    tooltemperature: ToolTemperature,
    data: Data_type_Machine,
    tooltemp_lower: Tooltemp_lower,
    tooltemp_upper: Tooltemp_upper,
    vibration_lower: Vibration_lower,
    vibration_upper: Vibration_upper,
    node_arr: Asset_node_array,
    gateway_arr: Asset_gateway_array
}

var assetData2 = {
    gateway: Gateway2,
    node: Node2,
    dateTime: DateTime2,
    location: Location2,
    machine: Machine2,
    locationX: LocationX2,
    locationY: LocationY2,
}


var bmsData = {
    gateway: Gateway1,
    node: Node1,
    dateTime: DateTime1,
    temperature: Temperature1,
    relativeHumidity: RelativeHumidity1,
    ambientLight: AmbientLight1,
    data: Data_type_BMS,
    temp_lower: Temp_lower,
    temp_upper: Temp_upper,
    rh_lower: Rh_lower,
    rh_upper: Rh_upper,
    al_lower: Al_lower,
    al_upper: Al_upper,
    node_arr: Bms_node_array,
    gateway_arr: Bms_gateway_array
}

var Gatewayx = [];
var Nodex = [];
var DateTimex = [];
var Locationx = [];
var Machinex = [];
var LocationXx = [];
var LocationYx = [];
var Vibrationx = [];
var ToolTemperaturex = [];


var Gateway1y = [];
var Node1y = [];
var DateTime1y = [];
var Temperature1y = [];
var RelativeHumidity1y = [];
var AmbientLight1y = [];


var x = [];
var y = [];
var l = 0;
var k = 0;
var chartt;
var graphdata = [];

router.post('/showgraphs', (req, res) => {
  firebase.auth().onAuthStateChanged(function (user) {

    if (user) {

          const { fieldType , date, fromTime , toTime , chartType } = req.body;
          chartt = chartType;
            k = 0;
              Gatewayx = [];
              Nodex = [];
              DateTimex = [];
              Locationx = [];
              Machinex = [];
              LocationXx = [];
              LocationYx = [];
              Vibrationx = [];
              ToolTemperaturex = [];
            for(var i = 0; i < DateTime.length;i++){
              if((JSON.stringify(assetData.dateTime[i]).substring(1,11) === date) && ((JSON.stringify(assetData.dateTime[i]).substring(12,17) >= fromTime) && (JSON.stringify(assetData.dateTime[i]).substring(12,17) <= toTime))){
                Gatewayx[k] = assetData.gateway[i];
                Nodex[k] = assetData.node[i];
                DateTimex[k] = assetData.dateTime[i];
                Locationx[k] = assetData.location[i];
                Machinex[k] = assetData.machine[i];
                LocationXx[k] = assetData.locationX[i];
                LocationYx[k] = assetData.locationY[i];
                Vibrationx[k] = assetData.vibration[i];
                ToolTemperaturex[k] = assetData.tooltemperature[i];
                k++;
                console.log(k);
            }
            if(fieldType === "vibration")
            {
              graphdata = Vibrationx;
            }

            else
            {
              graphdata = ToolTemperaturex;
            }
          }
          var x = {
              gateway: Gatewayx,
              node: Nodex,
              dateTime: DateTimex,
              location: Locationx,
              machine: Machinex,
              locationX: LocationXx,
              locationY: LocationYx,
              vibration: Vibrationx,
              tooltemperature: ToolTemperaturex,
              chart: chartt,
              fieldtype: fieldType,
              graphdata: graphdata,
              date: date,
              fromTime: fromTime ,
              toTime: toTime ,
              chartType: chartType
          }
          console.log(x);
            res.render('./dategraph', {
              x
            });
          }
          else {
            console.log("User not present");
            res.redirect('../')
          }
        });
});

router.post('/displaynode1tooltemp',(req,res) => {
  firebase.auth().onAuthStateChanged(function (user) {

    if (user)
    {

          const { LowerLimitTooltemp, UpperLimitTTooltemp } = req.body;
          ref2.child('-LcwmcI9gIa8l9RGD37E').update({'tooltemp_lower': LowerLimitTooltemp, 'tooltemp_upper': UpperLimitTTooltemp});
          assetData.tooltemp_lower[0] = LowerLimitTooltemp;
          assetData.tooltemp_upper[0] = UpperLimitTTooltemp;
          res.render('./displaynode1', {
            assetData
          });
    }
    else
    {
      console.log("User not present");
      res.redirect('../')
    }
  });
});


router.post('/displaynode1vibration',(req,res) => {
  firebase.auth().onAuthStateChanged(function (user) {

    if (user)
    {

          const { LowerLimitVibration, UpperLimitVibration } = req.body;
          ref2.child('-LcwmcI9gIa8l9RGD37E').update({'vibration_lower': LowerLimitVibration, 'vibration_upper': UpperLimitVibration});
          assetData.vibration_lower[0] = LowerLimitVibration;
          assetData.vibration_upper[0] = UpperLimitVibration;
          res.render('./displaynode1', {
            assetData
          });
    }
    else
    {
      console.log("User not present");
      res.redirect('../')
    }
  });
});


router.post('/bmsTemperature',(req,res) => {
  firebase.auth().onAuthStateChanged(function (user) {

    if (user)
    {

          const { LowerLimitTemperature, UpperLimitTemperature } = req.body;
          ref3.child('-LcwY-s-cRdTRN5p_ZWl').update({'temp_lower': LowerLimitTemperature, 'temp_upper': UpperLimitTemperature});
          bmsData.temp_lower[0] = LowerLimitTemperature;
          bmsData.temp_upper[0] = UpperLimitTemperature;
          res.render('./bms', {
            bmsData
          });
    }
    else
    {
      console.log("User not present");
      res.redirect('../')
    }
  });
});

router.post('/bmsRelativeHumidity',(req,res) => {
  firebase.auth().onAuthStateChanged(function (user) {

    if (user)
    {

          const { LowerLimitRelativeHumidity, UpperLimitRelativeHumidity } = req.body;
          ref3.child('-LcwY-s-cRdTRN5p_ZWl').update({'rh_lower': LowerLimitRelativeHumidity, 'rh_upper': UpperLimitRelativeHumidity});
          bmsData.rh_lower[0] = LowerLimitRelativeHumidity;
          bmsData.rh_upper[0] = UpperLimitRelativeHumidity;
          res.render('./bms', {
            bmsData
          });
    }
    else
    {
      console.log("User not present");
      res.redirect('../')
    }
  });
});

router.post('/bmsAmbientLight',(req,res) => {
  firebase.auth().onAuthStateChanged(function (user) {

    if (user)
    {

          const { LowerLimitAmbientLight, UpperLimitAmbientLight } = req.body;
          ref3.child('-LcwY-s-cRdTRN5p_ZWl').update({'al_lower': LowerLimitAmbientLight, 'al_upper': UpperLimitAmbientLight});
          bmsData.al_lower[0] = LowerLimitAmbientLight;
          bmsData.al_upper[0] = UpperLimitAmbientLight;
          res.render('./bms', {
            bmsData
          });
    }
    else
    {
      console.log("User not present");
      res.redirect('../')
    }
  });
});
var s = 0;
router.post('/bmsnode',(req,res) => {
  firebase.auth().onAuthStateChanged(function (user) {

    if (user)
    {

          const { Node, LLTemperature, ULTemperature, LLRelativeHumidity, ULRelativeHumidity,LLAmbientLight, ULAmbientLight, Save, Remove } = req.body;
          console.log(Save);
          console.log(Remove);
          if(Save !== undefined)
          {
                ref4.push({'node': Node, 'al_lower': LLAmbientLight, 'al_upper': ULAmbientLight, 'rh_lower': LLRelativeHumidity, 'rh_upper': ULRelativeHumidity, 'temp_lower': LLTemperature, 'temp_upper': ULTemperature});
                bmsData.temp_lower = [];
                bmsData.temp_upper = [];
                bmsData.rh_lower = [];
                bmsData.rh_upper = [];
                bmsData.al_lower = [];
                bmsData.al_upper = [];
                bmsData.al_lower[0] = Al_lower[0];
                bmsData.al_upper[0] = Al_upper[0];
                bmsData.rh_lower[0] = Rh_lower[0];
                bmsData.rh_upper[0] = Rh_upper[0];
                bmsData.temp_lower[0] = Temp_lower[0];
                bmsData.temp_upper[0] = Temp_upper[0];
                for(var i in Bms_node_array){
                  var n = BMS_Node.includes(Bms_node_array[i])
                  if(n === true)
                  {
                    BMS_NodeLimits[s] = Bms_node_array[i];
                    s++;
                  }
                }
                i = 0;
                var l = 1;
                for(i in Bms_node_array){
                  if(Bms_node_array[i] === Node){
                    bmsData.temp_lower[l] = LLTemperature;
                    bmsData.temp_upper[l] = ULTemperature;
                    bmsData.rh_lower[l] = LLRelativeHumidity;
                    bmsData.rh_upper[l] = ULRelativeHumidity;
                    bmsData.al_lower[l] = LLAmbientLight;
                    bmsData.al_upper[l] = ULAmbientLight;
                  }
                  else{
                    for(var k = 0; k < BMS_NodeLimits.length; k++){
                      if(Bms_node_array[i] === BMS_NodeLimits[k]){
                        for(var r = (bmsNodeLength[0] - 1) ; r >= 0; r--){
                          if(Bms_node_array[i] === BMS_Node[r])
                          {
                            bmsData.temp_lower[l] = BMS_Node_Temp_lower[r];
                            bmsData.temp_upper[l] = BMS_Node_Temp_upper[r];
                            bmsData.rh_lower[l] = BMS_Node_Rh_lower[r];
                            bmsData.rh_upper[l] = BMS_Node_Rh_upper[r];
                            bmsData.al_lower[l] = BMS_Node_Al_lower[r];
                            bmsData.al_upper[l] = BMS_Node_Al_upper[r];
                            break;
                          }
                        }
                        l++;
                        break;
                      }
                      else{
                        bmsData.temp_lower[l] = Temp_lower[0];
                        bmsData.temp_upper[l] = Temp_upper[0];
                        bmsData.rh_lower[l] = Rh_lower[0];
                        bmsData.rh_upper[l] = Rh_upper[0];
                        bmsData.al_lower[l] = Al_lower[0];
                        bmsData.al_upper[l] = Al_upper[0];
                      }
                    }
                  }
                }

                	res.render('./bms',
                  {bmsData}
                );

          }
          else{
            for(var t = 0; t < bmsNodeDetailsKeys.length; t++)
            {
              if(BMS_Node[t] === Node)
              {
                ref4.child(bmsNodeDetailsKeys[t]).remove();
              }
            }
            bmsData.temp_lower = [];
            bmsData.temp_upper = [];
            bmsData.rh_lower = [];
            bmsData.rh_upper = [];
            bmsData.al_lower = [];
            bmsData.al_upper = [];
            bmsData.al_lower[0] = Al_lower[0];
            bmsData.al_upper[0] = Al_upper[0];
            bmsData.rh_lower[0] = Rh_lower[0];
            bmsData.rh_upper[0] = Rh_upper[0];
            bmsData.temp_lower[0] = Temp_lower[0];
            bmsData.temp_upper[0] = Temp_upper[0];
            for(var u in Bms_node_array){
              var p = BMS_Node.includes(Bms_node_array[u])
              if(p === true)
              {
                BMS_NodeLimits[s] = Bms_node_array[u];
                s++;
              }
            }
            u = 0;
            var v = 1;
            for(u in Bms_node_array){
              if(Bms_node_array[u] === Node){
                bmsData.temp_lower[v] = LLTemperature;
                bmsData.temp_upper[v] = ULTemperature;
                bmsData.rh_lower[v] = LLRelativeHumidity;
                bmsData.rh_upper[v] = ULRelativeHumidity;
                bmsData.al_lower[v] = LLAmbientLight;
                bmsData.al_upper[v] = ULAmbientLight;
              }
              else{
                for(var w = 0; w < BMS_NodeLimits.length; w++){
                  if(Bms_node_array[u] === BMS_NodeLimits[w]){
                    for(var y = (bmsNodeLength[0] - 1) ; y >= 0; y--){
                      if(Bms_node_array[u] === BMS_Node[v])
                      {
                        bmsData.temp_lower[v] = BMS_Node_Temp_lower[y];
                        bmsData.temp_upper[v] = BMS_Node_Temp_upper[y];
                        bmsData.rh_lower[v] = BMS_Node_Rh_lower[y];
                        bmsData.rh_upper[v] = BMS_Node_Rh_upper[y];
                        bmsData.al_lower[v] = BMS_Node_Al_lower[y];
                        bmsData.al_upper[v] = BMS_Node_Al_upper[y];
                        break;
                      }
                    }
                    v++;
                    break;
                  }
                  else{
                    bmsData.temp_lower[v] = Temp_lower[0];
                    bmsData.temp_upper[v] = Temp_upper[0];
                    bmsData.rh_lower[v] = Rh_lower[0];
                    bmsData.rh_upper[v] = Rh_upper[0];
                    bmsData.al_lower[v] = Al_lower[0];
                    bmsData.al_upper[v] = Al_upper[0];
                  }
                }
              }
            }

              res.render('./bms',
              {bmsData}
            );
          }
        }
          else
          {
            console.log("User not present");
            res.redirect('../')
          }
  });
});

router.post('/assetnode',(req,res) => {
  firebase.auth().onAuthStateChanged(function (user) {

    if (user)
    {

          const { Node, LLToolTemperature, ULToolTemperature, LLVibration, ULVibration, Save, Remove } = req.body;
          if(Save !== undefined)
          {
            ref5.push({'node': Node, 'Vib_lower': LLVibration, 'Vib_upper': ULVibration, 'Tool_temp_lower': LLToolTemperature, 'Tool_temp_upper': ULToolTemperature});
            s = 0;
            assetData.tooltemp_lower = [];
            assetData.tooltemp_upper = [];
            assetData.vibration_lower = [];
            assetData.vibration_upper = [];
            assetData.vibration_lower[0] = Vibration_lower[0];
            assetData.vibration_upper[0] = Vibration_upper[0];
            assetData.tooltemp_lower[0] = Tooltemp_lower[0];
            assetData.tooltemp_upper[0] = Tooltemp_upper[0];
            for(var i in Asset_node_array){
              var n = Asset_Node.includes(Asset_node_array[i])
              if(n === true)
              {
                Asset_NodeLimits[s] = Asset_node_array[i];
                s++;
              }
            }
            var l = 1;
            i = 0;
            for(i in Asset_node_array){
              if(Asset_NodeLimits.length !== 0){
                for(var k = 0; k < Asset_NodeLimits.length; k++){
                  if(Asset_node_array[i] === Asset_NodeLimits[k]){
                    for(var r = (assetNodeLength[0] - 1) ; r >= 0; r--){
                      if(Asset_node_array[i] === Asset_Node[r])
                      {
                        assetData.tooltemp_lower[l] = Asset_Node_Tool_temp_lower[r];
                        assetData.tooltemp_upper[l] = Asset_Node_Tool_temp_upper[r];
                        assetData.vibration_lower[l] = Asset_Node_Vib_lower[r];
                        assetData.vibration_upper[l] = Asset_Node_Vib_upper[r];
                        break;
                      }
                    }
                    l++;
                    break;
                  }
                  else{
                    assetData.tooltemp_lower[l] = Tooltemp_lower[0];
                    assetData.tooltemp_upper[l] = Tooltemp_upper[0];
                    assetData.vibration_lower[l] = Vibration_lower[0];
                    assetData.vibration_upper[l] = Vibration_upper[0];
                  }
                }
            }
            else{
              assetData.tooltemp_lower[l] = Tooltemp_lower[0];
              assetData.tooltemp_upper[l] = Tooltemp_upper[0];
              assetData.vibration_lower[l] = Vibration_lower[0];
              assetData.vibration_upper[l] = Vibration_upper[0];
            }
          }
            	res.render('./displaynode1',
              {assetData}
            );
        }
        else {
          for(var t = 0; t < AssetNodeDetailsKeys.length; t++)
          {
            if(Asset_Node[t] === Node)
            {
              ref5.child(AssetNodeDetailsKeys[t]).remove();
            }
          }
          s = 0;
          assetData.tooltemp_lower = [];
          assetData.tooltemp_upper = [];
          assetData.vibration_lower = [];
          assetData.vibration_upper = [];
          assetData.vibration_lower[0] = Vibration_lower[0];
          assetData.vibration_upper[0] = Vibration_upper[0];
          assetData.tooltemp_lower[0] = Tooltemp_lower[0];
          assetData.tooltemp_upper[0] = Tooltemp_upper[0];
          for(i in Asset_node_array){
            n = Asset_Node.includes(Asset_node_array[i])
            if(n === true)
            {
              Asset_NodeLimits[s] = Asset_node_array[i];
              s++;
            }
          }
          l = 1;
          i = 0;
          for(i in Asset_node_array){
            if(Asset_NodeLimits.length !== 0){
              for(k = 0; k < Asset_NodeLimits.length; k++){
                if(Asset_node_array[i] === Asset_NodeLimits[k]){
                  for(r = (assetNodeLength[0] - 1) ; r >= 0; r--){
                    if(Asset_node_array[i] === Asset_Node[r])
                    {
                      assetData.tooltemp_lower[l] = Asset_Node_Tool_temp_lower[r];
                      assetData.tooltemp_upper[l] = Asset_Node_Tool_temp_upper[r];
                      assetData.vibration_lower[l] = Asset_Node_Vib_lower[r];
                      assetData.vibration_upper[l] = Asset_Node_Vib_upper[r];
                      break;
                    }
                  }
                  l++;
                  break;
                }
                else{
                  assetData.tooltemp_lower[l] = Tooltemp_lower[0];
                  assetData.tooltemp_upper[l] = Tooltemp_upper[0];
                  assetData.vibration_lower[l] = Vibration_lower[0];
                  assetData.vibration_upper[l] = Vibration_upper[0];
                }
              }
          }
          else{
            assetData.tooltemp_lower[l] = Tooltemp_lower[0];
            assetData.tooltemp_upper[l] = Tooltemp_upper[0];
            assetData.vibration_lower[l] = Vibration_lower[0];
            assetData.vibration_upper[l] = Vibration_upper[0];
          }
        }
            res.render('./displaynode1',
            {assetData}
          );
        }
    }
    else
    {
      console.log("User not present");
      res.redirect('../')
    }
  });
});

router.get('/bms',(req,res) => {
  firebase.auth().onAuthStateChanged(function (user) {

    if (user) {
      s = 0;
      BMS_NodeLimits = [];
      bmsData.temp_lower = [];
      bmsData.temp_upper = [];
      bmsData.rh_lower = [];
      bmsData.rh_upper = [];
      bmsData.al_lower = [];
      bmsData.al_upper = [];
      bmsData.al_lower[0] = Al_lower[0];
      bmsData.al_upper[0] = Al_upper[0];
      bmsData.rh_lower[0] = Rh_lower[0];
      bmsData.rh_upper[0] = Rh_upper[0];
      bmsData.temp_lower[0] = Temp_lower[0];
      bmsData.temp_upper[0] = Temp_upper[0];
      for(var i in Bms_node_array){
        var n = BMS_Node.includes(Bms_node_array[i])
        if(n === true)
        {
          BMS_NodeLimits[s] = Bms_node_array[i];
          s++;
        }
      }
      i = 0;
      var l = 1;
      for(i in Bms_node_array){
        if(BMS_NodeLimits.length !== 0){
          for(var k = 0; k < BMS_NodeLimits.length; k++){
            if(Bms_node_array[i] === BMS_NodeLimits[k]){
              for(var r = (bmsNodeLength[0] - 1) ; r >= 0; r--){
                if(Bms_node_array[i] === BMS_Node[r])
                {
                  bmsData.temp_lower[l] = BMS_Node_Temp_lower[r];
                  bmsData.temp_upper[l] = BMS_Node_Temp_upper[r];
                  bmsData.rh_lower[l] = BMS_Node_Rh_lower[r];
                  bmsData.rh_upper[l] = BMS_Node_Rh_upper[r];
                  bmsData.al_lower[l] = BMS_Node_Al_lower[r];
                  bmsData.al_upper[l] = BMS_Node_Al_upper[r];
                  break;
                }
              }
              l++;
              break;
            }
            else{
              bmsData.temp_lower[l] = Temp_lower[0];
              bmsData.temp_upper[l] = Temp_upper[0];
              bmsData.rh_lower[l] = Rh_lower[0];
              bmsData.rh_upper[l] = Rh_upper[0];
              bmsData.al_lower[l] = Al_lower[0];
              bmsData.al_upper[l] = Al_upper[0];
            }
          }
      }
      else{
        bmsData.temp_lower[l] = Temp_lower[0];
        bmsData.temp_upper[l] = Temp_upper[0];
        bmsData.rh_lower[l] = Rh_lower[0];
        bmsData.rh_upper[l] = Rh_upper[0];
        bmsData.al_lower[l] = Al_lower[0];
        bmsData.al_upper[l] = Al_upper[0];
      }
    }

      res.render('./bms',{bmsData});

      console.log("User present");

    } else {
      console.log("User not present");
      res.redirect('../')
    }
  });
});

router.get('/bmsNodeManagement',(req,res) => {
  firebase.auth().onAuthStateChanged(function (user) {

    if (user) {

      res.render('./bmsNodeManagement',{bmsData});

      console.log("User present");

    } else {
      console.log("User not present");
      res.redirect('../')
    }
  });
});


router.get('/assettrack',(req,res) => {
  firebase.auth().onAuthStateChanged(function (user) {

    if (user) {

      res.render('./assettrack',{assettrackdata});

      console.log("User present");

    } else {
      console.log("User not present");
      res.redirect('../')
    }
  });
});

router.get('/dategraph', (req, res) => {
  firebase.auth().onAuthStateChanged(function (user) {

    if (user) {

      res.render('./', {
        x
      });
      console.log("User present");

    } else {
      console.log("User not present");
      res.redirect('../')
    }
  });
});


router.get('/displaynode1', (req, res) => {
  firebase.auth().onAuthStateChanged(function (user) {

    if (user) {
      s = 0;
      Asset_NodeLimits = [];
      assetData.tooltemp_lower = [];
      assetData.tooltemp_upper = [];
      assetData.vibration_lower = [];
      assetData.vibration_upper = [];
      assetData.vibration_lower[0] = Vibration_lower[0];
      assetData.vibration_upper[0] = Vibration_upper[0];
      assetData.tooltemp_lower[0] = Tooltemp_lower[0];
      assetData.tooltemp_upper[0] = Tooltemp_upper[0];
      for(var i in Asset_node_array){
        var n = Asset_Node.includes(Asset_node_array[i])
        if(n === true)
        {
          Asset_NodeLimits[s] = Asset_node_array[i];
          s++;
        }
      }
      var l = 1;
      i = 0;
      for(i in Asset_node_array){
        if(Asset_NodeLimits.length !== 0){
          for(var k = 0; k < Asset_NodeLimits.length; k++){
            if(Asset_node_array[i] === Asset_NodeLimits[k]){
              for(var r = (assetNodeLength[0] - 1) ; r >= 0; r--){
                if(Asset_node_array[i] === Asset_Node[r])
                {
                  assetData.tooltemp_lower[l] = Asset_Node_Tool_temp_lower[r];
                  assetData.tooltemp_upper[l] = Asset_Node_Tool_temp_upper[r];
                  assetData.vibration_lower[l] = Asset_Node_Vib_lower[r];
                  assetData.vibration_upper[l] = Asset_Node_Vib_upper[r];
                  break;
                }
              }
              l++;
              break;
            }
            else{
              assetData.tooltemp_lower[l] = Tooltemp_lower[0];
              assetData.tooltemp_upper[l] = Tooltemp_upper[0];
              assetData.vibration_lower[l] = Vibration_lower[0];
              assetData.vibration_upper[l] = Vibration_upper[0];
            }
          }
      }
      else{
        assetData.tooltemp_lower[l] = Tooltemp_lower[0];
        assetData.tooltemp_upper[l] = Tooltemp_upper[0];
        assetData.vibration_lower[l] = Vibration_lower[0];
        assetData.vibration_upper[l] = Vibration_upper[0];
      }
    }
      res.render('./displaynode1', {
        assetData
      });
      console.log("User present");

    } else {
      console.log("User not present");
      res.redirect('../')
    }
  });
});


router.get('/bmsGraphs', (req, res) => {
  firebase.auth().onAuthStateChanged(function (user) {

    if (user) {

      res.render('./bmsGraphs', {
        bmsData
      });
      console.log("User present");

    } else {
      console.log("User not present");
      res.redirect('../')
    }
  });
});


router.get('/assetGraphs', (req, res) => {
  firebase.auth().onAuthStateChanged(function (user) {

    if (user) {

      k = 0;
        DateTimex = [];
        ToolTemperaturex = [];
      for(var i = 0; i < DateTime.length;i++){
        if((JSON.stringify(assetData.dateTime[i]).substring(1,11) === "2019-02-07") && ((JSON.stringify(assetData.dateTime[i]).substring(12,17) >= "19:00") && (JSON.stringify(assetData.dateTime[i]).substring(12,17) <= "21:00"))){
          DateTimex[k] = assetData.dateTime[i];
          ToolTemperaturex[k] = assetData.tooltemperature[i];
          k++;
          console.log(k);
      }
    }
    var x = {
        dateTime: DateTimex,
        tooltemperature: ToolTemperaturex,
        date: "2019-02-07",
        fromTime: "19:00" ,
        toTime: "21:00"
    }

      res.render('./assetGraphs', {
        x
      });
      console.log("User present");

    } else {
      console.log("User not present");
      res.redirect('../')
    }
  });
});

router.post('/assetGraphs', (req, res) => {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      k = 0;
        DateTimex = [];
        ToolTemperaturex = [];
      for(var i = 0; i < DateTime.length;i++){
        if((JSON.stringify(assetData.dateTime[i]).substring(1,11) === "07:02:2019") && ((JSON.stringify(assetData.dateTime[i]).substring(12,17) >= "19:00") && (JSON.stringify(assetData.dateTime[i]).substring(12,17) <= "21:00"))){
          DateTimex[k] = assetData.dateTime[i];
          ToolTemperaturex[k] = assetData.tooltemperature[i];
          k++;
          console.log(k);
      }
    }
    var x = {
        dateTime: DateTimex,
        tooltemperature: ToolTemperaturex,
        date: "07:02:2019",
        fromTime: "19:00" ,
        toTime: "21:00"
    }

      res.render('./assetGraphs', {
        x
      });
      console.log("User present");

    } else {
      console.log("User not present");
      res.redirect('../')
    }
  });
});

router.get('/displaygraphs', (req, res) => {
  firebase.auth().onAuthStateChanged(function (user) {

    if (user) {

      res.render('./displaygraphs', {
        assetData
      });
      console.log("User present");

    } else {
      console.log("User not present");
      res.redirect('../')
    }
  });
});

router.post('/showBMSgraphs', (req, res) => {
  firebase.auth().onAuthStateChanged(function (user) {

    if (user) {

          const { fieldType , date, fromTime , toTime , chartType } = req.body;
          l = 0;
          Gateway1y = [];
          Node1y = [];
          DateTime1y = [];
          Temperature1y = [];
          RelativeHumidity1y = [];
          AmbientLight1y = [];

          chartt = chartType;
          console.log(chartt);
          console.log(fieldType);


            for(var i = 0; i < DateTime1.length;i++){
              if((JSON.stringify(bmsData.dateTime[i]).substring(1,11) === date) && ((JSON.stringify(bmsData.dateTime[i]).substring(12,17) >= fromTime) && (JSON.stringify(bmsData.dateTime[i]).substring(12,17) <= toTime))){

                Gateway1y[l] = bmsData.gateway[i];
                Node1y[l] = bmsData.node[i];
                DateTime1y[l] = bmsData.dateTime[i];
                Temperature1y[l] = bmsData.temperature[i];
                RelativeHumidity1y[l] = bmsData.relativeHumidity[i];
                AmbientLight1y[l] = bmsData.ambientLight[i];
                l++;
                console.log(l);
            }
          }


         if(fieldType === "relativeHumidity")
         {
           graphdata = RelativeHumidity1y;
         }

         else
         {
           graphdata = AmbientLight1y;
         }
          var y = {
              gateway: Gateway1y,
              node: Node1y,
              dateTime: DateTime1y,
              temperature: Temperature1y,
              relativeHumidity: RelativeHumidity1y,
              ambientLight: AmbientLight1y,
              chart: chartt,
              fieldtype: fieldType,
              graphdata: graphdata,
              date: date,
              fromTime: fromTime ,
              toTime: toTime ,
              chartType: chartType
          }
          console.log(y);
            res.render('./bmsdategraph', {
            y
            });
          }
          else {
            console.log("User not present");
            res.redirect('../')
          }
        });
});

router.get('/bmsdategraph', (req, res) => {
  firebase.auth().onAuthStateChanged(function (user) {

    if (user) {

      res.render('./bmsdategraph', {
        y
      });
      console.log("User present");

    } else {
      console.log("User not present");
      res.redirect('../')
    }
  });
});

router.get('/nodeParams', (req, res) => {
  firebase.auth().onAuthStateChanged(function (user) {

    if (user)
    {
          s = 0;
          BMS_NodeLimits = [];
          var id = req.query.id;
          bmsData.temp_lower = [];
          bmsData.temp_upper = [];
          bmsData.rh_lower = [];
          bmsData.rh_upper = [];
          bmsData.al_lower = [];
          bmsData.al_upper = [];
          bmsData.al_lower[0] = Al_lower[0];
          bmsData.al_upper[0] = Al_upper[0];
          bmsData.rh_lower[0] = Rh_lower[0];
          bmsData.rh_upper[0] = Rh_upper[0];
          bmsData.temp_lower[0] = Temp_lower[0];
          bmsData.temp_upper[0] = Temp_upper[0];
          console.log(bmsData.temp_upper);
          for(var i in Bms_node_array){
            var n = BMS_Node.includes(Bms_node_array[i])
            if(n === true)
            {
              BMS_NodeLimits[s] = Bms_node_array[i];
              s++;
            }
          }
          var l = 1;
          i = 0;
          for(i in Bms_node_array){
            if(BMS_NodeLimits.length !== 0){
              for(var k = 0; k < BMS_NodeLimits.length; k++){
                if(Bms_node_array[i] === BMS_NodeLimits[k]){
                  for(var r = (bmsNodeLength[0] - 1) ; r >= 0; r--){
                    if(Bms_node_array[i] === BMS_Node[r])
                    {
                      bmsData.temp_lower[l] = BMS_Node_Temp_lower[r];
                      bmsData.temp_upper[l] = BMS_Node_Temp_upper[r];
                      bmsData.rh_lower[l] = BMS_Node_Rh_lower[r];
                      bmsData.rh_upper[l] = BMS_Node_Rh_upper[r];
                      bmsData.al_lower[l] = BMS_Node_Al_lower[r];
                      bmsData.al_upper[l] = BMS_Node_Al_upper[r];
                      break;
                    }
                  }
                  l++;
                  break;
                }
                else{
                  bmsData.temp_lower[l] = Temp_lower[0];
                  bmsData.temp_upper[l] = Temp_upper[0];
                  bmsData.rh_lower[l] = Rh_lower[0];
                  bmsData.rh_upper[l] = Rh_upper[0];
                  bmsData.al_lower[l] = Al_lower[0];
                  bmsData.al_upper[l] = Al_upper[0];
                }
              }
          }
          else{
            bmsData.temp_lower[l] = Temp_lower[0];
            bmsData.temp_upper[l] = Temp_upper[0];
            bmsData.rh_lower[l] = Rh_lower[0];
            bmsData.rh_upper[l] = Rh_upper[0];
            bmsData.al_lower[l] = Al_lower[0];
            bmsData.al_upper[l] = Al_upper[0];
          }
        }
            res.render('./bmsNodeConfig',
            {bmsData,id}
          );

    }
    else
    {
      console.log("User not present");
      res.redirect('../')
    }
    });
});

router.get('/assetnodeParams', (req, res) => {
  firebase.auth().onAuthStateChanged(function (user) {

    if (user)
    {
          s = 0;
          Asset_NodeLimits = [];
          var id = req.query.id;
          assetData.tooltemp_lower = [];
          assetData.tooltemp_upper = [];
          assetData.vibration_lower = [];
          assetData.vibration_upper = [];
          assetData.vibration_lower[0] = Vibration_lower[0];
          assetData.vibration_upper[0] = Vibration_upper[0];
          assetData.tooltemp_lower[0] = Tooltemp_lower[0];
          assetData.tooltemp_upper[0] = Tooltemp_upper[0];
          for(var i in Asset_node_array){
            var n = Asset_Node.includes(Asset_node_array[i])
            if(n === true)
            {
              Asset_NodeLimits[s] = Asset_node_array[i];
              s++;
            }
          }
          var l = 1;
          i = 0;
          console.log(Asset_NodeLimits.length);
          for(i in Asset_node_array){
            if(Asset_NodeLimits.length !== 0){
              for(var k = 0; k < Asset_NodeLimits.length; k++){
                if(Asset_node_array[i] === Asset_NodeLimits[k]){
                  for(var r = (assetNodeLength[0] - 1) ; r >= 0; r--){
                    if(Asset_node_array[i] === Asset_Node[r])
                    {
                      assetData.tooltemp_lower[l] = Asset_Node_Tool_temp_lower[r];
                      assetData.tooltemp_upper[l] = Asset_Node_Tool_temp_upper[r];
                      assetData.vibration_lower[l] = Asset_Node_Vib_lower[r];
                      assetData.vibration_upper[l] = Asset_Node_Vib_upper[r];
                      break;
                    }
                  }
                  l++;
                  break;
                }
                else{
                  assetData.tooltemp_lower[l] = Tooltemp_lower[0];
                  assetData.tooltemp_upper[l] = Tooltemp_upper[0];
                  assetData.vibration_lower[l] = Vibration_lower[0];
                  assetData.vibration_upper[l] = Vibration_upper[0];
                }
              }
          }
          else{
            assetData.tooltemp_lower[l] = Tooltemp_lower[0];
            assetData.tooltemp_upper[l] = Tooltemp_upper[0];
            assetData.vibration_lower[l] = Vibration_lower[0];
            assetData.vibration_upper[l] = Vibration_upper[0];
          }
        }
            res.render('./assetNodeConfig',
            {assetData,id}
          );

    }
    else
    {
      console.log("User not present");
      res.redirect('../')
    }
    });
});

router.get('/gatewayParams', (req, res) => {
  firebase.auth().onAuthStateChanged(function (user) {

    if (user)
    {

          var id = req.query.id;
          res.render('./bmsGatewayConfig',
          {bmsData,id}
        );

    }
    else
    {
      console.log("User not present");
      res.redirect('../')
    }
    });
});

router.post('/bmsgateway',(req,res) => {
  firebase.auth().onAuthStateChanged(function (user) {

    if (user)
    {

          const { gatewayName, oldGateway } = req.body;
          console.log("OldGatewayName: "+oldGateway);
          i = 0;
          for(i in BmsKeys){
            if(Gateway1[i] === oldGateway){
              ref1.child(BmsKeys[i]).update({'Gateway': gatewayName});
            }

          }
          q=0;
          Bms_gateway_array = [];
          i = 0;
          for(i in BmsKeys){
            var g = Bms_gateway_array.includes(Gateway1[i])
          	if(g === false)
          	{
          	  Bms_gateway_array[q] = Gateway1[i];
          	  q++;
          	}
          }
          bmsData.gateway_arr = Bms_gateway_array;
          res.render('./bms',
            {bmsData}
          );

    }
    else
    {
      console.log("User not present");
      res.redirect('../')
    }
  });
});


router.get('/assetgatewayParams', (req, res) => {
  firebase.auth().onAuthStateChanged(function (user) {

    if (user)
    {

          var id = req.query.id;
          res.render('./assetGatewayConfig',
          {assetData,id}
        );

    }
    else
    {
      console.log("User not present");
      res.redirect('../')
    }
    });
});

router.post('/assetgateway',(req,res) => {
  firebase.auth().onAuthStateChanged(function (user) {

    if (user)
    {
      var r = 0;
          const { gatewayName, oldGateway } = req.body;
          console.log(gatewayName);
          console.log(AssetKeys.length);
          i = 0;
          for(i in AssetKeys){
            if(assetData.gateway[i] === oldGateway){
              ref.child(AssetKeys[i]).update({'Gateway': gatewayName});
              r++;
            }
          }
          console.log("R" + r);
          q=0;
          Asset_gateway_array = [];
          i = 0;
          for(i in AssetKeys){
            var g = Asset_gateway_array.includes(Gateway[i])
          	if(g === false)
          	{
          	  Asset_gateway_array[q] = Gateway[i];
          	  q++;
          	}
          }
          assetData.gateway_arr = Asset_gateway_array;
          res.render('./displaynode1',
            {assetData}
          );

    }
    else
    {
      console.log("User not present");
      res.redirect('../')
    }
  });
});
module.exports = router;
