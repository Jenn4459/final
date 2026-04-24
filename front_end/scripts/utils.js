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

function toggleMenu() 
{
    const login = document.getElementById("login");
    if (login.style.display === "block") {
        return displayProfileIcon();
    }
    const dropdown = document.getElementById("profile-dropdown");
    const profile = document.getElementById("profile");
    if (profile.style.display !== "none") {
        if (dropdown.style.display === "block") {
            dropdown.style.display = "none";
        } else {
            dropdown.style.display = "block";
        }
    }
}
