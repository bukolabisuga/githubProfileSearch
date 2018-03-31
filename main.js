var response = null;

document.getElementsByTagName('button')[0].addEventListener('click', function (r) {
   var list = document.getElementById("list");
   while (list.firstChild) {
       list.removeChild(list.firstChild);
   }
   getUser(document.getElementsByTagName('input')[0].value);
})

function getUser(name) {
    fetch('https://api.github.com/users/' + name)
        .then(function (r) {
            return r.json();
        })
        .then(function (j) {
            response = j;
            // console.log(response);
            assignValues()
            getFollowers(j.followers_url)
        })
}

function assignValues() {
    document.getElementById('loader').style = "display: none";

    document.getElementById('github-link').href = response.html_url
    document.getElementById('avatar').src = response.avatar_url
    document.getElementById('name').innerText = "Name: " + response.name
    document.getElementById('username').innerText = "Username: " + response.login
    document.getElementById('location').innerText = "Location: " + response.location
    document.getElementById('bio').innerText = "Bio: " + response.bio
    document.getElementById('followers').innerText = "Followers: " + response.followers
}

function getFollowers(url) {
    fetch(url)
        .then(function (r) {
            return r.json()
        })
        .then(function (f) {
            listFollowers(f)
        })
}

function listFollowers(followers) {

    followers.forEach(function (f) {
        var li = document.createElement('li')
        li.innerHTML = '<a href="' + f.html_url + '">'
            + '<img src="' + f.avatar_url + '" alt="' + f.login + '"/>'
            + '</a>';
        document.getElementById('list').appendChild(li) 
    });
}