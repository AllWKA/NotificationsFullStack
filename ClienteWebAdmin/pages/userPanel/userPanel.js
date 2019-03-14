window.onload = inicializar;
var formVerUser;

function inicializar(){
    /*formVerUser = document.getElementById("form-verUsers");
    formVerUser.addEventListener("submit", listAllUsers, false);
    console.log("ale1");*/
    listAllUsers();
}


function listAllUsers(nextPageToken) {
    // List batch of users, 1000 at a time.
    firebase.auth().listUsers(1000, nextPageToken)
      .then(function(listUsersResult) {
        listUsersResult.users.forEach(function(userRecord) {
          console.log("user", userRecord.toJSON());
        });
        if (listUsersResult.pageToken) {
          // List next batch of users.
          listAllUsers(listUsersResult.pageToken)
        }
      })
      .catch(function(error) {
        console.log("Error listing users:", error);
      });
  }
  