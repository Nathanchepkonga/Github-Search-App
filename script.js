document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const query = document.getElementById('search-input').value;
    fetch(`https://api.github.com/search/users?q=${query}`, {
        headers: {
            'Accept': 'application/vnd.github.v3+json'
        }
    })
    .then(response => response.json())
    .then(data => displayUsers(data.items))
    .catch(error => console.error('Error:', error));
});

function displayUsers(users) {
    const userResults = document.getElementById('user-results');
    userResults.innerHTML = '';
    users.forEach(user => {
        const userElement = document.createElement('div');
        userElement.innerHTML = `
            <img src="${user.avatar_url}" alt="${user.login}" width="50" height="50">
            <p>${user.login}</p>
            <a href="${user.html_url}" target="_blank">Profile</a>
            <button onclick="fetchUserRepos('${user.login}')">Show Repos</button>
        `;
        userResults.appendChild(userElement);
    });
}

function fetchUserRepos(username) {
    fetch(`https://api.github.com/users/${username}/repos`, {
        headers: {
            'Accept': 'application/vnd.github.v3+json'
        }
    })
    .then(response => response.json())
    .then(data => displayRepos(data))
    .catch(error => console.error('Error:', error));
}

function displayRepos(repos) {
    const repoResults = document.getElementById('repo-results');
    repoResults.innerHTML = '';
    repos.forEach(repo => {
        const repoElement = document.createElement('div');
        repoElement.innerHTML = `
            <p>${repo.name}</p>
            <a href="${repo.html_url}" target="_blank">Repo Link</a>
        `;
        repoResults.appendChild(repoElement);
    });
}
let searchType = 'users';

document.getElementById('toggle-search').addEventListener('click', function() {
    if (searchType === 'users') {
        searchType = 'repos';
        this.textContent = 'Toggle to User Search';
    } else {
        searchType = 'users';
        this.textContent = 'Toggle to Repo Search';
    }
});

document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const query = document.getElementById('search-input').value;
    if (searchType === 'users') {
        fetch(`https://api.github.com/search/users?q=${query}`, {
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            }
        })
        .then(response => response.json())
        .then(data => displayUsers(data.items))
        .catch(error => console.error('Error:', error));
    } else {
        fetch(`https://api.github.com/search/repositories?q=${query}`, {
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            }
        })
        .then(response => response.json())
        .then(data => displayRepos(data.items))
        .catch(error => console.error('Error:', error));
    }
});
