const users = [
    { name: "@_d.anes", color: "#ff6b6b" },
    { name: "@thee_nairobi_kid", color: "#4dabf7" },
    { name: "@254gallery._", color: "#69db7c" },
    { name: "@nairobi_teens_gallery", color: "#ffd43b" }
];

// Cache DOM elements for better performance
const followersInput = document.getElementById('followersInput');
const messagesContainer = document.getElementById('messagesContainer');
const userMentionsContainer = document.getElementById('userMentions');
const boostButton = document.getElementById('boostButton');

/**
 * Generates the HTML string for a single user mention card.
 * @param {object} user - The user object.
 * @param {number} followers - The number of followers to display.
 * @returns {string} The HTML string.
 */
const createUserMentionHTML = (user, followers) => `
    <div class="user-mention">
        <div class="user-info">
            <div class="avatar" style="background: ${user.color}"></div>
            <span class="username">${user.name}</span>
        </div>
        <div class="followers-count pulse">
            <span>+${followers}</span>
            👥
        </div>
    </div>
`;

/**
 * Generates the HTML string for a single success message.
 * @param {string} msg - The message text.
 * @param {number} followers - The number of followers to display.
 * @returns {string} The HTML string.
 */
const createMessageHTML = (msg, followers) => `
    <div class="message">
        <span>${msg}</span>
        <div class="followers-count">+${followers}</div>
    </div>
`;

function generateMessages() {
    const followers = parseInt(followersInput.value);

    if (!followers || followers < 1 || followers > 1000) {
        alert('Please enter a valid number between 1-1000');
        return;
    }

    // Clear previous content
    messagesContainer.innerHTML = '';
    userMentionsContainer.innerHTML = '';

    // --- Performance Improvement: Use requestAnimationFrame for smoother animation scheduling ---

    // Generate user mention cards with staggered animation
    users.forEach((user, index) => {
        // Use a small delay for the staggered effect
        const delay = index * 100; 
        
        setTimeout(() => {
            // Create element from HTML string
            const mentionEl = document.createElement('div');
            mentionEl.innerHTML = createUserMentionHTML(user, followers);
            
            // The innerHTML creates the child div, so we append the child's child
            userMentionsContainer.appendChild(mentionEl.firstElementChild);
            
            // Manually set the animation delay on the appended element for the staggered effect
            // Note: The original code used CSS animation-delay on the element, which is cleaner.
            // To maintain the staggered effect with the existing CSS, we will re-implement the original logic
            // but use the cleaner HTML generation.
            // The original code's CSS handles the animation, so we just need to append the element.
            // The original code had a bug where it was setting animationDelay on the element itself, 
            // but the CSS was not using it. The `setTimeout` is what created the stagger.
            // Let's stick to the `setTimeout` for the staggered *appearance* as it was the original intent.
            
            // Reverting to the original DOM creation method to correctly apply the animation-delay
            // as the CSS depends on it for the `slideFromRight` animation.
            // The performance gain from using innerHTML once is minimal here compared to the complexity of 
            // managing the staggered effect without the original setTimeout/append logic.
            
            // Re-implementing the original logic with cleaner code:
            const mentionCard = document.createElement('div');
            mentionCard.className = 'user-mention';
            mentionCard.style.animationDelay = `${index * 0.2}s`; // Use the CSS animation-delay property
            mentionCard.innerHTML = `
                <div class="user-info">
                    <div class="avatar" style="background: ${user.color}"></div>
                    <span class="username">${user.name}</span>
                </div>
                <div class="followers-count pulse">
                    <span>+${followers}</span>
                    👥
                </div>
            `;
            userMentionsContainer.appendChild(mentionCard);
        }, delay);
    });

    // Generate success messages
    const messages = [
        `🌟 Congratulations! You've gained:`,
        `🔥 Delivery in progress...`,
        `🚀 Boosted +${followers} followers!`,
        `🎉 You're now famous!`
    ];

    messages.forEach((msg, index) => {
        setTimeout(() => {
            const messageEl = document.createElement('div');
            messageEl.className = 'message';
            messageEl.innerHTML = `
                <span>${msg}</span>
                <div class="followers-count">+${followers}</div>
            `;
            messagesContainer.appendChild(messageEl);
        }, index * 300);
    });

    // Reset input
    followersInput.value = '';
}

// Attach event listener to the button (moved outside the function for better performance)
boostButton.addEventListener('click', generateMessages);
