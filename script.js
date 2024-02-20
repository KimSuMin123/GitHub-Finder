class GitHub{
    constructor(){
        this.start_url = 'https://api.github.com/users/';
    }

    async userInfo(username){
        const getProfile =  await fetch(`${this.start_url}${username}`);
        const profile = await getProfile.json();

        const getRepos = await fetch(`${this.start_url}${username}/repos`);
        const repos = await getRepos.json();
        return {profile, repos};
    }
}

class UI {
    showProfile(user) { 
        const profileHTML = `
            <section class= "profilesection">
                <img id="userImg" src="${user.avatar_url}">
                <br>
                <a href="${user.html_url}" id="userURL">View Profile</a>
            </section>
            <sidebar class="profiletop">
                <p id ="profiletop1">Public Repos: ${user.public_repos}</p>
                <p id ="profiletop2">Public Gists: ${user.public_gists}</p>
                <p id ="profiletop3">Followers: ${user.followers}</p>
                <p id ="profiletop4">Following: ${user.following}</p>
            </sidebar>
            <sidebar class="profiledown">
                <li>Company: ${user.company}</li>
                <li>Website/Blog: ${user.blog}</li>
                <li>Location: ${user.location}</li>
                <li>Member Since: ${user.created_at}</li>
            </sidebar>
        `;
        document.getElementById('profile1').innerHTML = profileHTML;
    }

    showRepos(repos) {
        let reposHTML = '<h3>Latest Repos</h3>';
        repos.forEach(repo => {
            reposHTML += `
                <div class="repos">
                    <a href = "${repo.html_url}">${repo.name}</a>
                    <p id = "star">Stars: ${repo.stargazers_count}</p>
                    <p id = "watcher">Watchers: ${repo.watchers_count}</p>
                    <p id = "fork">Forks: ${repo.forks_count}</p>
                    <br>
                </div>
            `
        })
        document.getElementById('profile2').innerHTML += reposHTML;
    }
    
}

const github = new GitHub();
const ui = new UI(); 

const searchButton = document.getElementById('searchbtn');

document.getElementById('searchbtn').addEventListener('click', () => {
    const userText = document.getElementById('searchuser').value;
    
    if (userText === '') {
        alert("GitHub 사용자 이름을 입력하세요.");
        return; 
    }
    
    github.userInfo(userText)
        .then(data => {
            ui.showProfile(data.profile);
            ui.showRepos(data.repos);  
            searchButton.style.display = 'none'; 
        });
});
