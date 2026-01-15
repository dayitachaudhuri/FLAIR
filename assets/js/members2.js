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
                const memberImage = member.image_filename
                    ? `<img src="assets/imgs/team/${member.image_filename}" alt="${member.name}">`
                    : `<div style="width: 100px; height: 100px; border-radius: 50%; background: #e0e0e0; display: flex; align-items: center; justify-content: center; margin: 0 auto 10px;"><i class="ti-user" style="font-size: 40px; color: #999;"></i></div>`;
                
                const memberName = member.website && member.website.trim() !== ''
                    ? `<a href="${member.website}" target="_blank"><h6>${member.name}</h6></a>`
                    : `<h6>${member.name}</h6>`;
                
                return `
                    <div class="col-md-3 col-sm-4 col-6 mb-4">
                        <div class="person-simple">
                            ${memberImage}
                            ${memberName}
                            <p>${member.role}</p>
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
