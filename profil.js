const githubFrom = document.querySelector("#githubForm");
const userNameInput = document.querySelector("#userName")

const modal = document.querySelector("#modal"); 
const closeBtn = document.querySelector(".close-btn"); 
const profileSection = document.querySelector("#profile");

function addEventListeners() {
    githubFrom.addEventListener("submit", handleFormSubmit);
    closeBtn.addEventListener("click", closeModal); 
    window.addEventListener("click", (e)=> {
        if(e.target === modal) {
            closeModal();
        }
    }); 
}

async function handleFormSubmit(e) {
    e.preventDefault(); 

    const userName = userNameInput.value.trim();

    if(!userName) {
        displayError("please enter your username!");
        openModal();
        return; 
    }

    const apiURL = `https://api.github.com/users/${userName}`;
    await fetchUserProfile(apiURL);
    openModal(); 
}

async function fetchUserProfile(apiURL) {
    try {
        const response = await fetch(apiURL);
        if(!response.ok) {
            throw new Error("User not found!");
        }
        const data = await response.json();
        displayProfile(data);
    } catch(error) {
        displayError(error.message);
    }
}

function displayProfile(data) {
    const profile = `
        <h2>${data.name}</h2>
        <img src="${data.avatar_url}" alt="Profile picture" width="150">
        <p>Followers: ${data.followers}</p>
        <p>Following: ${data.following}</p>
        <p>Github profile: <a href="${data.html_url}" target="_blank">${data.html_url}</a></p>
    `
    profileSection.innerHTML = profile;
}

function displayError(message) {
    profileSection.innerHTML = `<p style="color: red;">${message}</p>`
}

function openModal() {
    modal.style.display = "flex"; 
}

function closeModal() {
    modal.style.display = "none"; 
    resetInput();
}

function resetInput() {
   userNameInput.value = ""
   userNameInput.focus();
   profileSection.innerHTML = '';
}

addEventListeners();
