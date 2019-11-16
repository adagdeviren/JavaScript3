'use strict';

{
  const { createAndAppend } = window.Util;

  class RepoView {
    constructor(container) {
      this.container = container;
    }

    update(state) {
      if (!state.error) {
        this.render(state.selectedRepo);
      }
    }

    /**
     * Renders the repository details.
     * @param {Object} repo A repository object.
     */
    render(repo) {
      // clearing previous content
      this.container.innerHTML = ' ';
      createAndAppend('h4', this.container, { text: 'Repo Details' });
      createAndAppend('a', this.container, { text: repo.name, href: repo.html_url, target: '_blank' });
      createAndAppend('p', this.container, { text: "Description:", class: 'title' });
      createAndAppend('span', this.container, { text: repo.description });
      createAndAppend('p', this.container, { text: "Forks:", class: 'title' });
      createAndAppend('span', this.container, { text: repo.forks });
      createAndAppend('p', this.container, { text: "Updated:", class: 'title' });
      createAndAppend('span', this.container, { text: repo.updated_at });

    }
  }

  window.RepoView = RepoView;
}
