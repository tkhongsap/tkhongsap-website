document.addEventListener('DOMContentLoaded', function() {
    // Try to get token from URL
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get('token');

    if (tokenFromUrl) {
        document.getElementById('token').value = tokenFromUrl;
    }

    document.getElementById('confirm-btn').addEventListener('click', async function() {
        const token = document.getElementById('token').value.trim();
        const resultDiv = document.getElementById('result');

        if (!token) {
            resultDiv.className = 'result error';
            resultDiv.style.display = 'block';
            resultDiv.innerHTML = '<strong>Error:</strong> Please enter a confirmation token.';
            return;
        }

        try {
            const apiUrl = `/api/newsletter/confirm?token=${encodeURIComponent(token)}`;
            console.log('Calling API:', apiUrl);

            const response = await fetch(apiUrl);
            const data = await response.json();

            resultDiv.style.display = 'block';

            if (data.success) {
                resultDiv.className = 'result success';
                resultDiv.innerHTML = `
                    <strong>Success!</strong>
                    <p>${data.message || 'Your subscription has been confirmed successfully!'}</p>
                `;
            } else {
                resultDiv.className = 'result error';
                resultDiv.innerHTML = `
                    <strong>Error:</strong>
                    <p>${data.message || 'Failed to confirm your subscription.'}</p>
                `;
            }

            console.log('API Response:', data);

        } catch (error) {
            console.error('Error confirming subscription:', error);
            resultDiv.className = 'result error';
            resultDiv.style.display = 'block';
            resultDiv.innerHTML = `
                <strong>Error:</strong>
                <p>An error occurred while trying to confirm your subscription.</p>
                <pre>${error.message}</pre>
            `;
        }
    });
});
