const form = document.getElementById('github-form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    e.target.search.value
    fetch(`https://api.github.com/search/users?q=${e.target.search.value}`)
    .then(resp => resp.json())
    .then(data => (
        data.items.map(item => {
            const li = document.createElement('li');
            const h2 = document.createElement('h2');
            h2.textContent = item.login;
            h2.addEventListener('click', e => showUserRepos(item.login, e))

            const img = document.createElement('img');
            img.src= item.avatar_url;
            
            li.append(h2, img);
            
            const userList = document.getElementById('user-list');
            userList.append(li)

        })
    ))
    form.reset()
})

function showUserRepos(login, e){
    
    const repoList = document.getElementById('repo-list')
    repoList.innerHTML = ""
    e.preventDefault()
    fetch(`https://api.github.com/search/users?q=${login}/repos`)
    .then(resp => resp.json())
    .then(data => data.map(repo => {
        const li = document.createElement(li);
        const h1 = document.createElement('h1');
        h1.textContent = repo.name;
        
        li.append(h1)
        repoList.append(li);
    }))
}