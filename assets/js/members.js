document.addEventListener('DOMContentLoaded', function () {
    fetch('data/members.json')
        .then(response => response.json())
        .then(data => {
            let allMembers = data.students;
            function shuffle(array) {
                for (let i = array.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [array[i], array[j]] = [array[j], array[i]];
                }
                return array;
            }
            allMembers = shuffle(allMembers);

            function createMemberCard(member) {
                const pastExperience = member.past ? `<p class="small text-muted">Previously: ${member.past}</p>` : '';
                const interests = member.interests.join(', ');
                const memberImage = member.image_filename
                    ? `<img src="assets/imgs/team/${member.image_filename}" alt="${member.name}" class="rounded-circle mb-3" style="width: 120px; height: 120px; object-fit: cover;">`
                    : `<div class="rounded-circle bg-light mx-auto mb-3 d-flex align-items-center justify-content-center" style="width: 120px; height: 120px;">
                           <i class="ti-user display-4 text-muted"></i>
                       </div>`;
                const memberName = member.website && member.website.trim() !== ''
                    ? `<a href="${member.website}" target="_blank" class="text-decoration-none"><h6 class="font-weight-bold">${member.name}</h6></a>`
                    : `<h6 class="font-weight-bold">${member.name}</h6>`;
                return `
                    <div class="col-md-4 mb-4">
                        <div class="card border h-100">
                            <div class="card-body text-center">
                                ${memberImage}
                                ${memberName}
                                <p class="text-muted small">${member.role}</p>
                                <p class="small"><strong>Research:</strong> ${interests}</p>
                                <p class="small"><strong>Education:</strong> ${member.education}</p>
                                ${pastExperience}
                            </div>
                        </div>
                    </div>
                `;
            }
            document.getElementById('all-members').innerHTML = allMembers.map(createMemberCard).join('');
        })
        .catch(error => {
            console.error('Error loading members:', error);
        });
});
