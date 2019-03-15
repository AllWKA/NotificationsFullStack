window.onload = initialize;

var notificationFrom;
var notificationMessege;
var notificationLabel;
var notificationDate;

function initialize(){
    this.notificationFrom = document.getElementById("notificationForm");
    this.notificationMessege = this.notificationFrom.namedItem("notificationMessege");
    this.notificationLabel = this.notificationFrom.namedItem("notificationLabel");
    this.notificationDate = this.notificationFrom.namedItem("deliveyDate");
    
}