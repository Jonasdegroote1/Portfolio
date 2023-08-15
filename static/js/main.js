const PROJECTS = "static/data/projects.json";
(() => {
	const app = {
		initialize() {
			this.cacheElements();
			this.buildUI();
		},

		cacheElements() {
			this.$projects = document.getElementById("projects");
			this.$projectDetails = document.getElementById("project-detail");
			this.$details = document.getElementById("detail");
		},

		buildUI() {
			this.fetchProjects();
			this.generateOverflow();
		},

		fetchProjects() {
			fetch(PROJECTS)
				.then((response) => response.json())
				.then((projects) => {
					const htmlStr = this.getHTMLForProjectsData(projects);
					this.$projects.innerHTML = htmlStr;

					const $items = this.$projects.querySelectorAll(".cards");

					for (const $item of $items) {
						$item.addEventListener("click", (e) => {
							const type = e.currentTarget.dataset.type;
						});
					}
				})
				.catch((error) => console.log(error));
		},

		getHTMLForProjectsData(projects) {
			return projects
				.map((project) => {
					return `
          <li class="cards" data-type="${project.type}">
						<div class="top_card">
							<img src="${project.img}" alt="" />
						</div>
						<div class="bottom_card">
							<h3>${project.name}</h3>
							
						</div>
					</li>`;
				})
				.join("");
		},

		generateOverflow() {
			fetch(PROJECTS)
				.then((response) => response.json())
				.then((projects) => {
					const $items = document.querySelectorAll(".cards");
					for (const $item of $items) {
						$item.addEventListener("click", (e) => {
							const type = e.currentTarget.dataset.type;
							const item = projects.find((project) => {
								return project.type === type;
							});
							this.$projectDetails.classList.add("open");

							this.$details.innerHTML = `
                <img src="${item.img}">
                <h2>${item.name}</h2>
                <p>${item.description}</p>
              `;
						});

						const $btnClose = document.getElementById("btn");
						$btnClose.addEventListener("click", (e) => {
							this.$projectDetails.classList.remove("open");
						});
					}
				});
		},
	};
	app.initialize();
})();
