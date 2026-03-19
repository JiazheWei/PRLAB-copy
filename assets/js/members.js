// Lab Members Renderer
// Renders grouped member sections into #members-container

function createMemberCard(member) {
    var photoPath = member.photo || './assets/img/people/default-avatar.jpg';

    var socialLinks = '';
    if (member.homepage && member.homepage.trim() !== '') {
        socialLinks += '<a href="' + member.homepage + '" target="_blank" title="Homepage"><i class="bi bi-house-fill"></i></a>';
    }
    if (member.google_scholar && member.google_scholar.trim() !== '') {
        socialLinks += '<a href="' + member.google_scholar + '" target="_blank" title="Google Scholar"><i class="bi bi-mortarboard-fill"></i></a>';
    }
    if (member.github && member.github.trim() !== '') {
        socialLinks += '<a href="' + member.github + '" target="_blank" title="GitHub"><i class="bi bi-github"></i></a>';
    }
    if (member.email && member.email.trim() !== '') {
        socialLinks += '<a href="mailto:' + member.email + '" title="Email"><i class="bi bi-envelope-fill"></i></a>';
    }

    var extra = '';
    if (member.co_supervised) {
        extra += '<p class="member-co-supervised">' + member.co_supervised + '</p>';
    }
    if (member.affiliation) {
        extra += '<p class="member-affiliation">' + member.affiliation + '</p>';
    }

    return '<div class="member-card">'
        + '<img src="' + photoPath + '" alt="' + member.name + '" class="member-photo" onerror="this.src=\'./assets/img/people/default-avatar.jpg\'">'
        + '<div class="member-info">'
        + '<div class="member-name">' + member.name + '</div>'
        + '<div class="member-title">' + member.title + '</div>'
        + '<div class="member-period">' + (member.period || '') + '</div>'
        + extra
        + (socialLinks ? '<div class="member-social">' + socialLinks + '</div>' : '')
        + '</div>'
        + '</div>';
}

function createGroup(title, members) {
    if (!members || members.length === 0) return '';

    var cards = members.map(createMemberCard).join('');
    return '<div class="members-group">'
        + '<div class="members-group-title">' + title + '</div>'
        + '<div class="members-grid">' + cards + '</div>'
        + '</div>';
}

function loadMembers() {
    var container = document.getElementById('members-container');
    if (!container) return;

    if (typeof labMembers === 'undefined') {
        console.error('labMembers data not found.');
        return;
    }

    var html = '';
    html += createGroup('PhD Students', labMembers.phd_students);
    html += createGroup('Master\'s Students', labMembers.master_students);
    html += createGroup('Research Assistants', labMembers.research_interns);
    html += createGroup('Visiting Scholars', labMembers.visiting_scholars);

    container.innerHTML = html || '<p style="text-align:center;color:#999;">Member profiles coming soon.</p>';
}

document.addEventListener('DOMContentLoaded', loadMembers);
