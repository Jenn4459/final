/************************** isLoggedIn() *************************
 *
 * This function gets the googleID from local storage. It's used
 * to determine if a user is logged in between different pages
 *
 * Parameters:
 *      nothing, gets ID from localStorage
 *
 * Return: true if logged in, false otherwise
 *
 * Expects:
 *      
 * Notes: 
 ******************************************************************/
function isLoggedIn()
{
    if (localStorage.getItem("googleID") !== null) {
        return true;
    } else {
        return false;
    }
}

/************************** displayProfileIcon() *************************
 *
 * This function checks if a user is logged in and displays the proper
 * button (login or profile buttons)
 *
 * Parameters:
 *      nothing, data in localStorage
 *
 * Return: nothing, displays either login button or profile picture
 *
 * Expects:
 *      
 * Notes: grabs the profile picture stored in localStorage when
 *        a user logs in, photo is provided from Google Sign in
 *************************************************************************/
function displayProfileIcon()
{
    if (isLoggedIn()) {
        document.getElementById("profile").style.display = "block";
        const profilePicture = localStorage.getItem("picture");
        document.getElementById("profileImg").src = profilePicture;
    } else {
        document.getElementById("login").style.display = "block";
    }
}

/************************** logout() *************************
 *
 * Logs out the user (removes googleID, username, and profile 
 * picture) and goes to homepage
 *
 * Parameters:
 *      nothing only removes data from localStorage
 *
 * Return: nothing
 *
 * Expects:
 *      
 * Notes: 
 ******************************************************************/
function logout() 
{
    localStorage.removeItem("googleID");
    localStorage.removeItem("userName");
    localStorage.removeItem("picture");
    window.location.href = "/index.html";
}

/************************** logout() *************************
 *
 * This function toggles the profile icon menu when the icon 
 * is clicked
 *
 * Parameters: nothing
 *
 * Return: nothing
 *
 * Expects:
 *      
 * Notes:
 ******************************************************************/
function toggleMenu() 
{
    const dropdown = document.getElementById("profile-dropdown");
    if (dropdown.style.display === "block") {
        dropdown.style.display = "none";
    } else {
        dropdown.style.display = "block";
    }
}
