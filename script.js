const sosBtn = document.getElementById('sosBtn');
const statusMsg = document.getElementById('statusMsg');

sosBtn.addEventListener('click', () => {
    const phoneNumber = document.getElementById('contactNum').value;

    // 1. Validation: Check if number is entered
    if (!phoneNumber) {
        alert("Please enter a phone number first!");
        return;
    }

    statusMsg.innerText = "Fetching Location...";
    statusMsg.style.color = "orange";

    // 2. Get Location
    if (!navigator.geolocation) {
        statusMsg.innerText = "Geolocation is not supported.";
        return;
    }

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const lat = position.coords.latitude;
            const long = position.coords.longitude;

            // 3. Create the Google Maps Link
            const mapLink = `https://www.google.com/maps?q=${lat},${long}`;
            
            // 4. Create the Message
            const message = `EMERGENCY! I need help. My current location is: ${mapLink}`;

            // 5. Create the SMS Link
            // Syntax: sms:NUMBER?body=MESSAGE
            // Note: We use window.location.href to trigger the system app properly
            const smsUrl = `sms:${phoneNumber}?body=${encodeURIComponent(message)}`;
            
            // Trigger the SMS app
            window.location.href = smsUrl;
            
            statusMsg.innerText = "SMS App Opened!";
            statusMsg.style.color = "green";
        },
        (error) => {
            statusMsg.innerText = "Unable to retrieve location.";
            statusMsg.style.color = "red";
            console.error(error);
        }
    );
});