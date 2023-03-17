async function logout(event) {
  event.preventDefault(); //#logout is a href (link). This prevents the link from following the URL when clicking on 'logout',  (https://www.w3schools.com/jsref/event_preventdefault.asp)
  const response = await fetch('/api/users/logout', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' }
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert(response.statusText);
  }
}

document.querySelector('#logout').addEventListener('click', logout);
// I'm passing 'event' argument on line 1 and adding the event.preventDefault(); to line 2 to avoid the default action of clicking on a link. 
// aka, without this, it'll work in our smart Chrome browser, but not in Firefox or Safari.