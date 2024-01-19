

function showUserLoader() {
    document.getElementById("UserLoader").style.display = "block";
  }
  
  function hideUserLoader() {
    document.getElementById("UserLoader").style.display = "none";
  }
  
  function showRepoLoader() {
    document.getElementById("RepoLoader").style.display = "block";
  }
  
  function hideRepoLoader() {
    document.getElementById("RepoLoader").style.display = "none";
  }


function getInfo() 
{
    showUserLoader();
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
  
        // Hide loader
        hideUserLoader();
      const userData = await response.json();
      
      // Update totalRepos
    totalRepos = userData.public_repos;
 
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

  async function getRepos(username) {
    try {
      // Show Repo loader
      showRepoLoader();
  
      const apiUrlRepos = `https://api.github.com/users/${username}/repos?page=${currentPage}&per_page=${itemsPerPage}`;
  
      // Fetch repositories
      const response = await fetch(apiUrlRepos);
  
      if (!response.ok) {
        if (response.status === 404) {
          throw { message: "User not found", statusCode: 404 };
        } else {
          throw { message: `HTTP error! Status: ${response.status}`, statusCode: response.status };
        }
      }
  
      // Hide loader
      hideRepoLoader();
  
      const data = await response.json();
  
      displayRepos(data);
    } catch (error) {
      // Hide loader
      hideRepoLoader();
  
      console.error("Error fetching repositories:\n", error);
  
      const paginationElement = document.getElementById("paginationPage");
      paginationElement.style.display = "none";
  
      if (error.statusCode === 404) {
        const repoListElement = document.getElementById("repoList");
        repoListElement.innerHTML = `<p style="color:red; font-weight:bold;font-size:xx-large;text-align:center;margin:auto;margin-bottom:40px">No repositories found.</p>`;
      }
    }
  }

  function displayRepos(repos) {}