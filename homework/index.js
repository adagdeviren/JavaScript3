'use strict';

{
  async function getData(url, cb) {
    try {
      const res = await axios.get(url);
      const Data = res.data;
      cb(null, Data);
      console.log(Data);

    } catch (err) {
      // ...The error that has been created will now be inserted into `err`
      cb(new Error(`Network request failed!!`));
    }
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

  function renderRepoDetails(repo, select, repoSection, contrSection) {
    // adding options to the select element
    createAndAppend('option', select, { text: repo.name, value: 'test-value' });
    // adding repo details
  }

  function loadRepo(repoSection, contrSection, selectedRepo) {
    // clearing previous content
    repoSection.innerHTML = ' ';
    contrSection.innerHTML = ' ';
    // adding title again
    createAndAppend('h4', repoSection, { text: 'Repo Details' });
    createAndAppend('h4', contrSection, { text: 'Contributors' });

    // repo details
    createAndAppend('a', repoSection, { text: selectedRepo.name, href: selectedRepo.html_url, target: '_blank' });
    createAndAppend('p', repoSection, { text: "Description:", class: 'title' });
    createAndAppend('span', repoSection, { text: selectedRepo.description });
    createAndAppend('p', repoSection, { text: "Forks:", class: 'title' });
    createAndAppend('span', repoSection, { text: selectedRepo.forks });
    createAndAppend('p', repoSection, { text: "Updated:", class: 'title' });
    createAndAppend('span', repoSection, { text: selectedRepo.updated_at });

    //contributor details
    function getContrDetails(selectedRepo, contrSection) {
      getData(selectedRepo.contributors_url, (err, contributor) => {
        const ul = createAndAppend('ul', contrSection);

        contributor
          .sort((cont1, cont2) => cont1.login.localeCompare(cont2.login))
          .forEach(contributor => {
            const li = createAndAppend('li', ul, { class: 'cont-li' });
            createAndAppend('img', li, {
              src: contributor.avatar_url,
              class: 'cont-avatar'
            });

            createAndAppend('a', li, {
              text: contributor.login,
              href: contributor.html_url,
              class: 'cont-name'
            });

            createAndAppend('span', li, {
              text: contributor.contributions,
              class: 'cont-contNumber'
            });

          });

      });

    }
    getContrDetails(selectedRepo, contrSection);

  }


  function main(url) {
    getData(url, (err, repos) => {
      const root = document.getElementById('root');
      if (err) {
        createAndAppend('div', root, {
          text: "HYF REPOSITORIES",
          class: 'header'
        })
        createAndAppend('div', root, {
          text: err.message,
          class: 'alert-error',
        });
        return;
      }
      // adding header
      const header = createAndAppend('header', root, { text: "HYF REPOSITORIES  ", class: 'header' });
      const main = createAndAppend('main', root, { class: 'main' });
      const select = createAndAppend('select', header, { class: 'options' });
      const repoSection = createAndAppend('section', main, { id: 'repo-section' });
      createAndAppend('h4', repoSection, { text: 'Repo Details' });
      const contrSection = createAndAppend('section', main, { id: 'cont-section' });
      createAndAppend('h4', contrSection, { text: 'Contributors' });

      repos
        .sort((repo1, repo2) => repo1.name.localeCompare(repo2.name, 'en', { ignorePunctuation: true }))
        .forEach(repo => renderRepoDetails(repo, select));

      select.addEventListener('change', () => {
        // things to do when repo changes
        loadRepo(repoSection, contrSection, repos[select.selectedIndex])
      });
      loadRepo(repoSection, contrSection, repos[select.selectedIndex]);

    });

  }
  const HYF_REPOS_URL =
    'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';
  window.onload = () => main(HYF_REPOS_URL);
}
