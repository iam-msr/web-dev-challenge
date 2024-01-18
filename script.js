function getInfo() 
{
  const usernameInput = document.getElementById("username");
  const username = usernameInput.value.trim();

  if (!username) {
    alert("Please enter a valid GitHub username.");
    return;
  }
  else 
  {
    getUserdetails(username);
    getRepos(username);
  }
  
}

async function getUserdetails(username) {
    try {
      const apiUrlDetails = `https://api.github.com/users/${username}`;
  
      // Fetch user details
      const response = await fetch(apiUrlDetails);
  
      if (!response.ok) {
        if (response.status === 404) {
          throw { message: "User not found", statusCode: 404 };
        } else {
          throw { message: `HTTP error! Status: ${response.status}`, statusCode: response.status };
        }
      }
  
  
      const userData = await response.json();
  
  
      // Display user details
      const userDetailsElement = document.getElementById('userDetails');
      userDetailsElement.innerHTML = `
        <div style="display: flex; align-items: center; margin-right:15px">
          <div id="user-photo">
            <img style="width: 45%; border: 1px solid #e5e5e5;" src="${userData.avatar_url}" alt="${userData.name}" />
          </div>
    
          <div id="details" style="margin-left: 16px;">
            <p style="font-weight:bold;font-size:xx-large">${userData.name}</p>
            <p>${userData.bio}</p>
            <p><strong>Twitter ID:</strong> ${userData.twitter_username}</p>
            <p><strong>Location:</strong> ${userData.location}</p>
            <p><strong>GitHub Link:</strong> ${userData.html_url}</p>
          </div>
        </div>`;
    } catch (error) {
      // Handle the error, e.g., display a message to the user
      hideUserLoader();
      console.error('Error fetching user details: ', error);
  
      const userDetailsElement = document.getElementById('userDetails');
      
      if (error.statusCode === 404) {
        userDetailsElement.innerHTML = `<p style="color:red; font-weight:bold;font-size:xx-large;">User not found. Please enter a valid GitHub username.</p>`;
      } else if (error.statusCode === 403) {
        userDetailsElement.innerHTML = `<p style="color:red; font-weight:bold;font-size:xx-large;">API rate limit exceeded. Please try again later.</p>`;
      } else {
        userDetailsElement.innerHTML = `<p style="color:red; font-weight:bold;font-size:xx-large;">Something went wrong ${error.statusCode}.</p>`;
      }
    }
  }