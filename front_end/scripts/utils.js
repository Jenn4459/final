function isLoggedIn()
{
    if (localStorage.getItem("googleID") !== null) {
        return true;
    } else {
        return false;
    }
}

function displayProfileIcon()
{
    if (isLoggedIn()) {
        document.getElementById("profile").style.display = "block";
        document.getElementById("profile-dropdown").style.display = "block";
        const profilePicture = localStorage.getItem("picture");
        document.getElementById("profileImg").src = profilePicture;
    } else {
        document.getElementById("login").style.display = "block";
    }
}

function logout() 
{
    localStorage.removeItem("googleID");
    localStorage.removeItem("userName");
    window.location.href = "/index.html";
}