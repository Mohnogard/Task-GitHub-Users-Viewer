    const usersDiv = document.getElementById('users');
    const loadingDiv = document.getElementById('loading users');
    const searchBars = document.getElementById('searchbar');

    let usernames = []
    fetch('https://api.github.com/users')
      .then(res => res.json())
      .then(users => {
        loadingDiv.style.display = 'none';
        usernames.push(...users)
        users.slice(0,10).forEach(user => {
          const div = document.createElement('div');
          div.className = 'name';
          div.innerHTML = `
            <img src='${user.avatar_url}'' width='80px' style="border-radius:100px"><br>
            <div style="font-weight:bold; margin-top:5px; margin-bottom:-10px">${user.login}</div><br>
            <a href="https://github.com/${user.html_url}" target="_blank">View profile</a>
          `;
          usersDiv.appendChild(div);
        });
      })

      .catch(err => {
        loadingDiv.textContent = 'Failed to load users.';
        console.error(err);
      });

searchBars.addEventListener("input", (event) => {
  usersDiv.innerHTML=''
  let searchValue = event.target.value;

  usernames.slice(0,10).forEach((user) => {
    if (user.login.includes(searchValue)) {
      let userDiv = document.createElement("div");
      userDiv.className = "name";
      userDiv.innerHTML = `
            <img src=${user.avatar_url}' width='80px' style="border-radius:100px">
            <div>${user.login}</div>
            <a href=${user.html_url} target="_blank">View Profile</a>
            `;
      users.appendChild(userDiv);
    }
  });

});