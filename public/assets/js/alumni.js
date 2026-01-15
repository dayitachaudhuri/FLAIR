document.addEventListener('DOMContentLoaded', function () {
    fetch('/data/alumni.json')
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
                    ? `<a href="${alumni.website}" target="_blank" class="text-blue-600 hover:text-blue-800 transition-colors font-semibold">${alumni.name}</a>`
                    : `<span class="font-semibold text-gray-800">${alumni.name}</span>`;
                const currentPosition = alumni.current_position ? ` (Currently: ${alumni.current_position})` : '';
                return `
                    <li class="mb-2 text-gray-700">
                        ${alumniName} - ${alumni.former_role}${currentPosition}
                    </li>
                `;
            }
            function createDropdown(category, alumniList, idx) {
                if (alumniList.length === 0) return '';
                return `
                    <div class="bg-white border border-gray-300 rounded-lg mb-3 overflow-hidden">
                        <div class="p-0" id="heading${idx}">
                            <h6 class="mb-0">
                                <button class="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors font-semibold text-gray-800 flex items-center justify-between" type="button" onclick="toggleAlumni(${idx})">
                                    <span>${category}</span>
                                    <svg id="icon${idx}" class="w-5 h-5 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                </button>
                            </h6>
                        </div>
                        <div id="collapse${idx}" class="hidden">
                            <div class="p-4">
                                <ul class="text-left mb-0 space-y-1">
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
            
            // Add toggle function
            window.toggleAlumni = function(idx) {
                const collapse = document.getElementById('collapse' + idx);
                const icon = document.getElementById('icon' + idx);
                if (collapse.classList.contains('hidden')) {
                    collapse.classList.remove('hidden');
                    icon.classList.add('rotate-180');
                } else {
                    collapse.classList.add('hidden');
                    icon.classList.remove('rotate-180');
                }
            };
        })
        .catch(error => {
            console.error('Error loading alumni:', error);
        });
});
