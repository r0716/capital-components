// // Import the Platform Experience components
import { AdyenPlatformExperience, CapitalOffer } from '@adyen/adyen-platform-experience-web';

// import AdyenPlatformExperience from '@adyen/adyen-platform-experience-web';


// import AdyenExperience from '@adyen/adyen-platform-experience-web';
// const { CapitalOffer } = AdyenExperience;

// import * as AdyenExperience from '@adyen/adyen-platform-experience-web';
// const { AdyenPlatformExperience, CapitalOffer } = AdyenExperience;



// // Import the CSS
// import "@adyen/adyen-platform-experience-web/adyen-platform-experience-web.css";

console.log('Initializing Adyen Platform Experience');

// Log if everything works
console.log('Platform experience component initialized');

// Call  backend server to get the session ID and token
async function onSessionCreate() {
    try {
        const response = await fetch('http://localhost:3000/create-session', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
            throw new Error(`Failed to create session: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Session Created:', data);
        return {
            id: data.id,
            token: data.token
        };
    } catch (error) {
        console.error('Error creating session:', error);
        return null;
    }
}


// Initialize the core instance of AdyenPlatformExperience
const core = new AdyenPlatformExperience({
    environment: 'test',
    locale: 'en-US',
    onSessionCreate: onSessionCreate, // callback function that retrieves an authentication session token and refreshes the current session
});

console.log('Core initialized');

// Manually create an instance of CapitalOffer and mount it to the container
console.log('Mounting Capital Offer');

const capitalOffer = new CapitalOffer({ core });
 
capitalOffer.mount('#capital-offer-container');

