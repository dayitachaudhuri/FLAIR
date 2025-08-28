document.addEventListener('DOMContentLoaded', function () {
    fetch('data/alumni.json')
        .then(response => response.json())
        .then(data => {
            const categories = {
                Interns: [],
                "Project Associates": [],
                "Research Assistants": [],
                "MTech Students": [],
                "PhD Students": []
            };
            data.alumni.forEach(alumni => {
                const role = alumni.former_role.toLowerCase();
                if (role.includes('intern')) {
                    categories['Interns'].push(alumni);
                } else if (role.includes('project associate')) {
                    categories['Project Associates'].push(alumni);
                } else if (role.includes('research assistant')) {
                    categories['Research Assistants'].push(alumni);
                } else if (role.includes('m tech')) {
                    categories['MTech Students'].push(alumni);
                } else if (role.includes('phd')) {
                    categories['PhD Students'].push(alumni);
                }
            });
            function createAlumniItem(alumni) {
                const alumniName = alumni.website && alumni.website.trim() !== ''
                    ? `<a href="${alumni.website}" target="_blank" class="text-decoration-none"><h6 class="font-weight-bold d-inline">${alumni.name}</h6></a>`
                    : `<h6 class="font-weight-bold d-inline">${alumni.name}</h6>`;
                const currentPosition = alumni.current_position ? ` (Currently: ${alumni.current_position})` : '';
                return `
                    <li class="mb-1">
                        <strong>${alumniName}</strong> - ${alumni.former_role} ${currentPosition}
                    </li>
                `;
            }
            function createDropdown(category, alumniList, idx) {
                if (alumniList.length === 0) return '';
                return `
                    <div class="card mb-2">
                        <div class="card-header p-0" id="heading${idx}">
                            <h6 class="mb-0">
                                <button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#collapse${idx}" aria-expanded="false" aria-controls="collapse${idx}">
                                    ${category}
                                </button>
                            </h6>
                        </div>
                        <div id="collapse${idx}" class="collapse" aria-labelledby="heading${idx}" data-parent="#alumni-dropdowns">
                            <div class="card-body p-2">
                                <ul class="text-left mb-0">
                                    ${alumniList.map(createAlumniItem).join('')}
                                </ul>
                            </div>
                        </div>
                    </div>
                `;
            }
            const dropdownHtml = [
                createDropdown('Interns', categories['Interns'], 1),
                createDropdown('Project Associates', categories['Project Associates'], 2),
                createDropdown('Research Assistants', categories['Research Assistants'], 3),
                createDropdown('MTech Students', categories['MTech Students'], 4),
                createDropdown('PhD Students', categories['PhD Students'], 5)
            ].filter(Boolean).join('');
            document.getElementById('alumni-dropdowns').innerHTML = dropdownHtml;
        })
        .catch(error => {
            console.error('Error loading alumni:', error);
        });
});
