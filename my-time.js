function dateToTimeString(dateObj){
	var hh = intToStrWithLeadingZero(dateObj.getHours());
	var mm = intToStrWithLeadingZero(dateObj.getMinutes());
	var ss = intToStrWithLeadingZero(dateObj.getSeconds());
	return hh+":"+mm+":"+ss;
}

function timeStringToDate(str){
	var tokens = str.split(":");
	var resDate = new Date(0,0,0,0,0,0);
	resDate.setSeconds( parseInt(tokens[0])*3600 + parseInt(tokens[1]) * 60 + parseInt(tokens[2]));
	return resDate;
}

function intToStrWithLeadingZero(num){
	return ("0"+num).toString().slice(-2);
}