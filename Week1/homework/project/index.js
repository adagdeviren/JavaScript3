'use strict';
/* 
This application does 2 things:

  1- It makes connection to the GitHub API and retrieves all the repositories found in the HackYourFuture account.
  2-It displays those repositories in an alphabetically-oreded list. 
    When a user clicks on any of the repository names it will show more details about it.
 */

{
  function fetchJSON(url, cb) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status <= 299) {
        cb(null, xhr.response);
      } else {
        cb(new Error(`Network error: ${xhr.status} - ${xhr.statusText}`));
      }
    };
    xhr.onerror = () => cb(new Error('Network request failed'));
    xhr.send();
  }

  function createAndAppend(name, parent, options = {}) {
    const elem = document.createElement(name);
    parent.appendChild(elem);
    Object.entries(options).forEach(([key, value]) => {
      if (key === 'text') {
        elem.textContent = value;
      } else {
        elem.setAttribute(key, value);
      }
    });
    return elem;
  }

  //
  //
  //

  function renderRepoDetails(repo, ul) {
    const li = createAndAppend('li', ul, { class: "list-item" });
    // adding titles and contents
    createAndAppend('p', li, { text: "Repository:", class: 'title' });
    createAndAppend('a', li, { text: repo.name, href:repo.html_url, target:'_blank' });
    createAndAppend('p', li, { text: "Description:", class: 'title' });
    createAndAppend('span', li, { text: repo.description });
    createAndAppend('p', li, { text: "Forks:", class: 'title' });
    createAndAppend('span', li, { text: repo.forks });
    createAndAppend('p', li, { text: "Updated:", class: 'title' });
    createAndAppend('span', li, { text: repo.updated_at });


  }

  //
  //
  //
  
  function main(url) {
    fetchJSON(url, (err, repos) => {
      const root = document.getElementById('root');
      if (err) {
        createAndAppend('div',root, {
          text:"HYF REPOSITORIES",
          class:'header'})
        createAndAppend('div', root, {
          text: err.message,
          class: 'alert-error',
        });
        return;
      }
      const ul = createAndAppend('ul', root);
      // adding header
      const li = createAndAppend('li', ul);
      createAndAppend('h4', li, { text: "HYF REPOSITORIES", class: 'header' });

      repos
        .sort((repo1, repo2) => repo1.name.localeCompare(repo2.name, 'en', { ignorePunctuation: true }))
        .forEach(repo => renderRepoDetails(repo, ul));
    });
  }

  const HYF_REPOS_URL =
    'https://api.github.com/orgs/HackYourFuture/repos?per_page=10';
  window.onload = () => main(HYF_REPOS_URL);
}
