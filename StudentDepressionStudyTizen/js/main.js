var dataId;
var sendingData = false;
var sensorDataHistory = {
		ACC: [],
		LAC:[],
		LIG:[],
		HRM:[],
		GYO:[],
		GRA:[],
		GYU:[],
		GYR:[],
		PRE:[],
		MGN:[],
		MGU:[],
		PRO:[],
		ULV: []
};
window.onload = function () {
	tizen.power.request("CPU", "CPU_AWAKE");
    // add eventListener for tizenhwkey
    document.addEventListener('tizenhwkey', function(e) {
	    if(e.keyName === "back"){
	    	try {
	    		tizen.application.getCurrentApplication().exit();
	    	} catch (ignore) {
	    	}
	        
	    }
    });
    getId();
    sensors_func();
};

const dataFreq = 1000;
function getId() {
	try {
    	dataId = tizen.preference.getValue('deviceId');
    	setTimeout(sendData, 1000 * 60);
		setData('#deviceID', 'ID: '+dataId);
    } catch (e) {
    	const url = "https://mota.technology/StudentDepression/API/REGISTER/";
    	var xhr = new XMLHttpRequest();
    	xhr.open("POST", url);
    	const data = JSON.stringify({ watch: 'hi'});
    	xhr.setRequestHeader("Content-Type", "application/json");
    	xhr.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                dataId = this.responseText;
            		tizen.preference.setValue('deviceId', dataId);
            		setTimeout(sendData, 1000 * 60);
            		console.log(dataId);
            		 setData('#deviceID', 'ID: '+dataId);
            }
        };
    	xhr.send(data);
    }
}

function IsJsonString(str) {
	try {
		var json = JSON.parse(str);
	    return (typeof json === 'object'); 
	} catch (e) {
	    return false;
	}
}

function sendData() {
	console.log('Sending...');
	sendingData = true;
	const url = "https://mota.technology/StudentDepression/API/SEND/";
	const ACC = JSON.stringify(sensorDataHistory.ACC);
	const LAC = JSON.stringify(sensorDataHistory.LAC);
	const LIG = JSON.stringify(sensorDataHistory.LIG);
	const HRM = JSON.stringify(sensorDataHistory.HRM);
	const GYO = JSON.stringify(sensorDataHistory.GYO);
	const GRA = JSON.stringify(sensorDataHistory.GRA);
	const GYU = JSON.stringify(sensorDataHistory.GYU);
	const GYR = JSON.stringify(sensorDataHistory.GYR);
	const PRE = JSON.stringify(sensorDataHistory.PRE);
	const MGN = JSON.stringify(sensorDataHistory.MGN);
	const MGU = JSON.stringify(sensorDataHistory.MGU);
	const PRO = JSON.stringify(sensorDataHistory.PRO);
	const ULV = JSON.stringify(sensorDataHistory.ULV);
	sensorDataHistory = {
			ACC: [],
			LAC:[],
			LIG:[],
			HRM:[],
			GYO:[],
			GRA:[],
			GYU:[],
			GYR:[],
			PRE:[],
			MGN:[],
			MGU:[],
			PRO:[],
			ULV: []
	};
	sendingData = false;
	var dataExists = false;
	var data = "{";
	if (IsJsonString(ACC)) {
		data += "\"ACC\":"+ACC;
		dataExists = true;
	}

	if (IsJsonString(LAC)) {
		if (dataExists) {
			data += ",";
		}
		data += "\"LAC\":"+LAC;
		dataExists = true;
	}

	if (IsJsonString(LIG)) {
		if (dataExists) {
			data += ",";
		}
		data += "\"LIG\":"+LIG;
		dataExists = true;
	}

	if (IsJsonString(HRM)) {
		if (dataExists) {
			data += ",";
		}
		data += "\"HRM\":"+HRM;
		dataExists = true;
	}

	if (IsJsonString(GYO)) {
		if (dataExists) {
			data += ",";
		}
		data += "\"GYO\":"+GYO;
		dataExists = true;
	}

	if (IsJsonString(GRA)) {
		if (dataExists) {
			data += ",";
		}
		data += "\"GRA\":"+GRA;
		dataExists = true;
	}

	if (IsJsonString(GYU)) {
		if (dataExists) {
			data += ",";
		}
		data += "\"GYU\":"+GYU;
		dataExists = true;
	}

	if (IsJsonString(GYR)) {
		if (dataExists) {
			data += ",";
		}
		data += "\"GYR\":"+GYR;
		dataExists = true;
	}

	if (IsJsonString(PRE)) {
		if (dataExists) {
			data += ",";
		}
		data += "\"PRE\":"+PRE;
		dataExists = true;
	}

	if (IsJsonString(PRO)) {
		if (dataExists) {
			data += ",";
		}
		data += "\"PRO\":"+PRO;
		dataExists = true;
	}

	if (IsJsonString(MGU)) {
		if (dataExists) {
			data += ",";
		}
		data += "\"MGU\":"+MGU;
		dataExists = true;
	}

	if (IsJsonString(MGN)) {
		if (dataExists) {
			data += ",";
		}
		data += "\"MGN\":"+MGN;
		dataExists = true;
	}

	if (IsJsonString(ULV)) {
		if (dataExists) {
			data += ",";
		}
		data += "\"ULV\":"+ULV;
		dataExists = true;
	}
	data += ",\"ID\": "+dataId;
	data += "}";
	console.log("DATA LENGTH");
	console.log(data.length);

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
        		console.log("RESPONSE: ");
            console.log(this.responseText);
        }
    };
	xhr.send(data);
	

	setTimeout(sendData, 1000 * 60);
}


function setData(text, data)
{
	var box = document.querySelector(text);
	box.innerHTML = data;
}
function onsuccessCB()
{
  console.log("Sensor start");
}
function onerrorCB()
{
  console.log('ERROR');
}

function onchangedAC(sensorData)
{	if (!sendingData) {
		var ts = Date.now();
		sensorDataHistory.ACC.push({ ts: ts, x: sensorData.x, y: sensorData.y, z: sensorData.z});
		setData('#acceleration', 'Aceleracion <br/> x:'+sensorData.x+'<br/> y:'+sensorData.y+'<br/> z:'+sensorData.z);
	}
}
function onchangedLAC(sensorData)
{
	if (!sendingData) {
		var ts = Date.now();
		sensorDataHistory.LAC.push({ ts: ts, x: sensorData.x, y: sensorData.y, z: sensorData.z});
		setData('#linearAcceleration', 'Aceleracion Lineal <br/> x:'+sensorData.x+'<br/> y:'+sensorData.y+'<br/> z:'+sensorData.z);
	}
	
}
function onchangedLG(sensorData)
{
	if (!sendingData) {
		var ts = Date.now();
		sensorDataHistory.LIG.push({ ts: ts, l: sensorData.lightLevel });
		setData('#light', 'Light: '+sensorData.lightLevel);
	}
	
}
function onchangedHRM(sensorData)
{
	if (!sendingData) {
		var ts = Date.now();
		sensorDataHistory.HRM.push({ ts: ts, l: sensorData.lightIntensity });
		setData('#hrmRaw', 'HRMRaw Light: '+sensorData.lightIntensity);
	}
	
}
function onchangedGY(sensorData)
{
	if (!sendingData) {
		var ts = Date.now();
		sensorDataHistory.GYO.push({ ts: ts, x: sensorData.x, y: sensorData.y, z: sensorData.z});
		setData('#gyroscope', 'Gyroscope <br/> x:'+sensorData.x+'<br/> y:'+sensorData.y+'<br/> z:'+sensorData.z);
	}
	
}

function onchangedGR(sensorData)
{
	if (!sendingData) {
		var ts = Date.now();
		sensorDataHistory.GRA.push({ ts: ts, x: sensorData.x, y: sensorData.y, z: sensorData.z});
		setData('#gravity', 'Gravity <br/> x:'+sensorData.x+'<br/> y:'+sensorData.y+'<br/> z:'+sensorData.z);
	}
	
}

function onchangedGYU(sensorData)
{
	if (!sendingData) {
		var ts = Date.now();
		sensorDataHistory.GYU.push({ ts: ts, x: sensorData.x, y: sensorData.y, z: sensorData.z, xd: sensorData.xAxisDrift, yd: sensorData.yAxisDrift, zd: sensorData.zAxisDrift });
		setData('#gyroscopeUncalibrated', 'GYU <br/> x:'+sensorData.x+'<br/> y:'+sensorData.y+'<br/> z:'+sensorData.z+'<br/> xd:'+sensorData.xAxisDrift+'<br/> yd:'+sensorData.yAxisDrift+'<br/> zd:'+sensorData.zAxisDrift);
	}
	
}

function onchangedGYR(sensorData)
{
	if (!sendingData) {
		var ts = Date.now();
		sensorDataHistory.GYR.push({ ts: ts, x: sensorData.x, y: sensorData.y, z: sensorData.z, w: sensorData.w });
		setData('#gyroscopeRotation', 'GYR <br/> x:'+sensorData.x+'<br/> y:'+sensorData.y+'<br/> z:'+sensorData.z+'<br/> w:'+sensorData.w);
	}
	
}

function onchangedPR(sensorData)
{
	if (!sendingData) {
		var ts = Date.now();
		sensorDataHistory.PRE.push({ ts: ts, p: sensorData.pressure });
		setData('#pressure', 'Presion:'+sensorData.pressure);
	}
	
}

function onchangedMG(sensorData)
{
	if (!sendingData) {
		var ts = Date.now();
		sensorDataHistory.MGN.push({ ts: ts, x: sensorData.x, y: sensorData.y, z: sensorData.z});
		setData('#magnetic', 'Magnetic <br/> x:'+sensorData.x+'<br/> y:'+sensorData.y+'<br/> z:'+sensorData.z);
	}
	
}

function onchangedMGU(sensorData)
{
	if (!sendingData) {
		var ts = Date.now();
		sensorDataHistory.MGU.push({ ts: ts, x: sensorData.x, y: sensorData.y, z: sensorData.z, xb: sensorData.xAxisBias, yb: sensorData.yAxisBias, zb: sensorData.zAxisBias });
		setData('#magneticUncalibrated', 'MU <br/> x:'+sensorData.x+'<br/> y:'+sensorData.y+'<br/> z:'+sensorData.z+'<br/> xd:'+sensorData.xAxisBias+'<br/> yd:'+sensorData.yAxisBias+'<br/> zd:'+sensorData.zAxisBias);
	}
	
}
function onchangedPRO(sensorData)
{
	if (!sendingData) {
		var ts = Date.now();
		sensorDataHistory.PRO.push({ ts: ts, l: sensorData.proximityState });
		setData('#proximity', 'Proximidad:'+sensorData.proximityState);
	}
	
}
function onchangedUV(sensorData)
{
	if (!sendingData) {
		var ts = Date.now();
		sensorDataHistory.ULV.push({ ts: ts, u: sensorData.ultravioletLevel });
		setData('#ultraviolet',  'UV:'+sensorData.ultravioletLevel);
	}
	
}

function sensors_func(){
    var sensors = tizen.sensorservice.getAvailableSensors();
    console.log("All Sensors: "+sensors);
	
	var acCapability= tizen.systeminfo.getCapability("http://tizen.org/feature/sensor.accelerometer");
	if (acCapability === true) {
	    /* Device supports the proximity sensor */
	    var acceleration = tizen.sensorservice.getDefaultSensor('ACCELERATION');
	    acceleration.setChangeListener(onchangedAC, dataFreq);
	    acceleration.start(onsuccessCB,onerrorCB);
	    
	}
	
	var linacCapability = tizen.systeminfo.getCapability("http://tizen.org/feature/sensor.linear_acceleration");
	if (linacCapability === true) {
	    /* Device supports the proximity sensor */
	    var linearAcceleration = tizen.sensorservice.getDefaultSensor('LINEAR_ACCELERATION');
	    linearAcceleration.setChangeListener(onchangedLAC, dataFreq);
	    linearAcceleration.start(onsuccessCB,onerrorCB);
	}
	
	var gyroscopeCapability =  tizen.systeminfo.getCapability("http://tizen.org/feature/sensor.gyroscope");
	if (gyroscopeCapability === true) {
		var gyroscope = tizen.sensorservice.getDefaultSensor('GYROSCOPE');
		gyroscope.setChangeListener(onchangedGY, dataFreq);
		gyroscope.start(onsuccessCB,onerrorCB);
	}
	
	var gravityCapability =  tizen.systeminfo.getCapability("http://tizen.org/feature/sensor.gravity");
	if (gravityCapability === true) {
		var gravity = tizen.sensorservice.getDefaultSensor('GRAVITY');
		gravity.setChangeListener(onchangedGR, dataFreq);
		gravity.start(onsuccessCB,onerrorCB);
	}
	
	var gyroscopeUncalibratedCapability = tizen.systeminfo.getCapability("http://tizen.org/feature/sensor.gyroscope.uncalibrated");
	if (gyroscopeUncalibratedCapability === true) {
		var gyroscopeUncalibrated =  tizen.sensorservice.getDefaultSensor('GYROSCOPE_UNCALIBRATED'); 
		gyroscopeUncalibrated.setChangeListener(onchangedGYU, dataFreq);
		gyroscopeUncalibrated.start(onsuccessCB,onerrorCB);
	}
	
	var gyroscopeRotationCapability =  tizen.systeminfo.getCapability("http://tizen.org/feature/sensor.gyroscope_rotation_vector");
	if (gyroscopeRotationCapability === true) {
		var gyroscopeRotation =  tizen.sensorservice.getDefaultSensor('GYROSCOPE_ROTATION_VECTOR');
		gyroscopeRotation.setChangeListener(onchangedGYR, dataFreq);
		gyroscopeRotation.start(onsuccessCB,onerrorCB);
	}
	
	var hrmGreen = tizen.systeminfo.getCapability("http://tizen.org/feature/sensor.heart_rate_monitor.led_green");
	var hrmIr = tizen.systeminfo.getCapability("http://tizen.org/feature/sensor.heart_rate_monitor.led_ir");
	var hrmRed = tizen.systeminfo.getCapability("http://tizen.org/feature/sensor.heart_rate_monitor.led_red");
	if (hrmGreen === true || hrmIr === true || hrmRed === true) {
		var hrmRaw = tizen.sensorservice.getDefaultSensor('HRM_RAW');
		hrmRaw.setChangeListener(onchangedHRM, dataFreq);
		hrmRaw.start(onsuccessCB,onerrorCB);
	}
	
	var lightCapability = tizen.systeminfo.getCapability("http://tizen.org/feature/sensor.photometer");
	if (lightCapability === true) {
		var light = tizen.sensorservice.getDefaultSensor('LIGHT');
		light.setChangeListener(onchangedLG, dataFreq);
		light.start(onsuccessCB,onerrorCB);
	}
	
	var pressureCapability = tizen.systeminfo.getCapability("http://tizen.org/feature/sensor.barometer");
	if (pressureCapability === true) {
		var pressure = tizen.sensorservice.getDefaultSensor('PRESSURE');
		pressure.setChangeListener(onchangedPR, dataFreq);
		pressure.start(onsuccessCB,onerrorCB);
	}
	
	var magneticCapability = tizen.systeminfo.getCapability("http://tizen.org/feature/sensor.magnetometer");
	if (magneticCapability === true) {
		var magnetic = tizen.sensorservice.getDefaultSensor('MAGNETIC');
		magnetic.setChangeListener(onchangedMG, dataFreq);
		magnetic.start(onsuccessCB,onerrorCB);
	}
	
	var magneticUncalibratedCapability = tizen.systeminfo.getCapability("http://tizen.org/feature/sensor.magnetometer.uncalibrated");
	if (magneticUncalibratedCapability === true) {
		var magneticUncalibrated = tizen.sensorservice.getDefaultSensor('MAGNETIC_UNCALIBRATED');
		magneticUncalibrated.setChangeListener(onchangedMGU, dataFreq);
		magneticUncalibrated.start(onsuccessCB, onerrorCB);
	}

	var proximityCapability = tizen.systeminfo.getCapability("http://tizen.org/feature/sensor.proximity");
	if (proximityCapability === true) {
		var proximity =  tizen.sensorservice.getDefaultSensor('PROXIMITY');
		proximity.setChangeListener(onchangedPRO, dataFreq);
		proximity.start(onsuccessCB, onerrorCB);
	}
	
	var ultravioletCapability = tizen.systeminfo.getCapability("http://tizen.org/feature/sensor.ultraviolet");
	if (ultravioletCapability === true) {
		var ultraviolet = tizen.sensorservice.getDefaultSensor('ULTRAVIOLET');
		ultraviolet.setChangeListener(onchangedUV, dataFreq);
		ultraviolet.start(onsuccessCB, onerrorCB);
	}
}