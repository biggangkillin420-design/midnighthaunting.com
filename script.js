let currentMembership = null; // Can be 'gold', 'silver', 'bronze', or null

const selectMembershipButtons = document.querySelectorAll('.select-membership-btn');
const contentItems = document.querySelectorAll('.content-item');
const noMembershipMessage = document.getElementById('no-membership-message');

function updateContentDisplay() {
    if (!currentMembership) {
        noMembershipMessage.classList.remove('hidden');
        contentItems.forEach(item => item.classList.add('hidden'));
        return;
    }

    noMembershipMessage.classList.add('hidden');

    contentItems.forEach(item => {
        const accessLevel = item.dataset.access; // e.g., "gold", "silver-gold"

        if (!accessLevel) {
            // Content without data-access is visible to all members
            item.classList.remove('hidden');
        } else if (currentMembership === 'gold') {
            // Gold sees everything
            item.classList.remove('hidden');
        } else if (currentMembership === 'silver') {
            // Silver sees general and silver-gold exclusive content
            if (accessLevel.includes('silver-gold')) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden'); // Hides gold-only content
            }
        } else if (currentMembership === 'bronze') {
            // Bronze only sees general content (items without data-access)
            item.classList.add('hidden'); // Hides all content with data-access
        }
    });
}

selectMembershipButtons.forEach(button => {
    button.addEventListener('click', () => {
        currentMembership = button.dataset.membership;
        alert(`You have selected the ${currentMembership.toUpperCase()} membership! (This is a simulation. No actual payment or account created.)`);
        updateContentDisplay();
        // Scroll to content section
        document.getElementById('content').scrollIntoView({ behavior: 'smooth' });
    });
});

// Initial content display (no membership selected)
updateContentDisplay();

// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});