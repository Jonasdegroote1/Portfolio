const PROJECTS = "static/data/projects.json";
(() => {
	const app = {
		initialize() {
			this.cacheElements();
			this.buildUI();
		},

		cacheElements() {
			this.$projects = document.getElementById("projects");
			this.$projectList = document.getElementById("project_list");
			this.$projectDetails = document.getElementById("project-detail");
			this.$details = document.getElementById("detail");
		},

		buildUI() {
			this.fetchProjects();
		},

		fetchProjects() {
			fetch(PROJECTS)
				.then((response) => response.json())
				.then((projects) => {
					const htmlStrForProjects = this.getHTMLForProjectsData(projects);
					this.$projectList.innerHTML = htmlStrForProjects;

					const $items = document.querySelectorAll(".cards");

					for (const $item of $items) {
						$item.addEventListener("click", (e) => {
							const id = e.currentTarget.dataset.id;
							const item = projects.find((project) => {
								return project.id === id;
							});

							const htmlStrForDetails = this.getHTMLForDetails(item);
							this.$details.innerHTML = htmlStrForDetails;

							this.$projectDetails.classList.add("open");
							this.$projects.classList.add("small");
						});

						const $btnClose = document.getElementById("btn");
						$btnClose.addEventListener("click", (e) => {
							this.$projectDetails.classList.remove("open");
							this.$projects.classList.remove("small");
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

		getHTMLForDetails(item) {
			return `
				<div class="overlay">
					<div class="detail-top">
						<img src="${item.img}">
					</div>
					<div class="detail-bottom">
						<h2>Project ${item.name}</h2>
						<p>${item.description}</p>
							<div class="links">
							${
								item.url
									? `<a class="btn btn--primary" href="${item.url}" target="_blank">Look at the code 
									<i class="fa-solid fa-chevron-right"></i></a>`
									: ""
							}
							
							${
								item.website
									? `<a class="btn btn--primary" href="${item.website}" target="_blank">Look at the website</a>`
									: ""
							}
							</div>
					</div>
				</div>
			  `;
		},
	};
	app.initialize();
})();
