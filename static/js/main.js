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
			this.$category = document.getElementById("category");
		},

		buildUI() {
			this.fetchProjects();
			this.generateOverflow();
		},

		fetchProjects() {
			fetch(PROJECTS)
				.then((response) => response.json())
				.then((projects) => {
					let htmlStr = this.getHTMLForProjectsData(projects);
					this.$projects.innerHTML = htmlStr;
					let $items = this.$projects.querySelectorAll(".cards");

					// htmlStr = this.getHTMLForCategory(projects);
					// this.$category.innerHTML = htmlStr;

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
          <li class="cards" data-id="${project.id}">
						<div class="top_card">
							<img src="${project.img}" alt="" />
						</div>
						<div class="bottom_card">
							<h3>${project.name}</h3>
						<p>${project.type}</p>
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
							const id = e.currentTarget.dataset.id;
							const item = projects.find((project) => {
								return project.id === id;
							});
							this.$projectDetails.classList.add("open");

							this.$details.innerHTML = `
							<div class="overlay">
								<div class="left">
									<img src="${item.img}">
								</div>
								<div class="right">
									<h2>Project ${item.name}</h2>
									<p>${item.description}</p>
									${item.url ? `<a href="${item.url}" target="_blank">Visit Website</a>` : ""}
								</div>
							</div>
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
