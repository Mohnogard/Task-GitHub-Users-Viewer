  const usersDiv = document.getElementById('users');
    const loadingDiv = document.getElementById('loading users');
    const searchBars = document.getElementById('searchbar');
    let usernames = []
    fetch('https://api.github.com/users')
      .then(res => res.json())
      .then(users => {
        loadingDiv.textContent="Load successful.";
        usernames.push(...users)
        users.slice(0,10).forEach(user => {
          const div = document.createElement('div');
          div.className = 'name';
          div.innerHTML = `
            <img src='${user.avatar_url}'' width='85px' style="border-radius:100px; border"><br>
            <div style="font-weight:bold; margin-top:10px; margin-bottom:-10px">${user.login}</div><br>
            <a href="https://github.com/${user.html_url}" target="_blank" style="text-decoration: none; color: rgb(127, 42, 211);"><i class="fa-solid fa-arrow-up-right-from-square" style="padding:0px 7px"></i> View profile</a>
          `;
          usersDiv.appendChild(div);
        });
      })

    
      .catch(err => {
        loadingDiv.textContent = 'Failed to load users!';
        loadingDiv.style.color="red"
        loadingDiv.style.fontWeight="bold"
        console.error(err);
        alert(err)
      });

searchBars.addEventListener("input", (event) => {
  usersDiv.innerHTML=''
  let searchValue = event.target.value;

  usernames.slice(0,10).forEach((user) => {
    if (user.login.includes(searchValue)) {
      let userDiv = document.createElement("div");
      userDiv.className = "name";
      userDiv.innerHTML = `
            <img src=${user.avatar_url}' width='85px' style="border-radius:100px">
            <div style="font-weight:bold; margin-top:10px; margin-bottom:-10px">${user.login}</div><br>
            <a href="https://github.com/${user.html_url}" target="_blank" style="text-decoration: none; color: rgb(127, 42, 211);"><i class="fa-solid fa-arrow-up-right-from-square" style="padding:0px 7px"></i> View profile</a>
            `;
      users.appendChild(userDiv);
    }
  });

});

