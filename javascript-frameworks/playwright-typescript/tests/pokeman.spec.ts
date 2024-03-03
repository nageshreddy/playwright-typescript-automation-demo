import {test, expect} from '@playwright/test';
import axios from 'axios';

test('GET /api/v2/berry - Verify response status code and body', async ({page}) => {
    // Navigate to the API endpoint
    await page.goto('https://pokeapi.co/api/v2/berry');

    // Get the response status code
    const statusCode = await page.evaluate(() => {
        return window.fetch('https://pokeapi.co/api/v2/berry').then(response => response.status);
    });

    // Assert the response status code
    expect(statusCode).toBe(200);

    // Get the response body
    const responseBody = await page.evaluate(() => {
        return window.fetch('https://pokeapi.co/api/v2/berry').then(response => response.json());
    });

    // Expected payload
    const expectedPayload = {
        "count": 64,
        "next": "https://pokeapi.co/api/v2/berry?offset=20&limit=20",
        "previous": null,
        "results": [
            {"name": "cheri", "url": "https://pokeapi.co/api/v2/berry/1/"},
            {"name": "chesto", "url": "https://pokeapi.co/api/v2/berry/2/"},
            {"name": "pecha", "url": "https://pokeapi.co/api/v2/berry/3/"},
            {"name": "rawst", "url": "https://pokeapi.co/api/v2/berry/4/"},
            {"name": "aspear", "url": "https://pokeapi.co/api/v2/berry/5/"},
            {"name": "leppa", "url": "https://pokeapi.co/api/v2/berry/6/"},
            {"name": "oran", "url": "https://pokeapi.co/api/v2/berry/7/"},
            {"name": "persim", "url": "https://pokeapi.co/api/v2/berry/8/"},
            {"name": "lum", "url": "https://pokeapi.co/api/v2/berry/9/"},
            {"name": "sitrus", "url": "https://pokeapi.co/api/v2/berry/10/"},
            {"name": "figy", "url": "https://pokeapi.co/api/v2/berry/11/"},
            {"name": "wiki", "url": "https://pokeapi.co/api/v2/berry/12/"},
            {"name": "mago", "url": "https://pokeapi.co/api/v2/berry/13/"},
            {"name": "aguav", "url": "https://pokeapi.co/api/v2/berry/14/"},
            {"name": "iapapa", "url": "https://pokeapi.co/api/v2/berry/15/"},
            {"name": "razz", "url": "https://pokeapi.co/api/v2/berry/16/"},
            {"name": "bluk", "url": "https://pokeapi.co/api/v2/berry/17/"},
            {"name": "nanab", "url": "https://pokeapi.co/api/v2/berry/18/"},
            {"name": "wepear", "url": "https://pokeapi.co/api/v2/berry/19/"},
            {"name": "pinap", "url": "https://pokeapi.co/api/v2/berry/20/"}
        ]

    };

    // Assert response body
    expect(responseBody).toEqual(expectedPayload);

    // Assert the response body
    expect(responseBody).not.toBe(null);
    expect(verifyIndividualBerryData()).toBeTruthy();
    expect(verifySpecificBerryData).toBeTruthy();
    expect(verifyErrorHandling()).toBeTruthy();
    expect(verifyRateLimiting()).toBeTruthy();
    expect(containsArray).toBeTruthy();
});

// Define the function to verify individual berry data
async function verifyIndividualBerryData() {
    try {
        // Make a GET request to retrieve the list of berries
        const response = await axios.get('https://pokeapi.co/api/v2/berry');
        const berries = response.data.results;

        // Iterate through the list of berries
        for (const berry of berries) {
            // Make an individual GET request to the berry's URL
            const berryResponse = await axios.get(berry.url);
            const berryData = berryResponse.data;

            // Verify individual berry data
            console.log(`Verifying data for ${berryData.name}`);
            console.log(`Growth Time: ${berryData.growth_time}`);
            console.log(`Maximum Harvest: ${berryData.max_harvest}`);
            console.log(`Natural Gift Power: ${berryData.natural_gift_power}`);
            expect(berryData.name).toEqual(berry.name);
            expect(berryData.growth_time).toBeGreaterThan(0);
            expect(berryData.max_harvest).toBeGreaterThan(0);
            // Add more assertions to verify other fields
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}

async function verifySpecificBerryData(berryId: number) {
    try {
        // Make a GET request to retrieve data for the specific berry ID
        const response = await axios.get(`https://pokeapi.co/api/v2/berry/${berryId}`);
        const berryData = response.data;

        // Verify specific berry data
        console.log(`Verifying data for berry with ID ${berryId}:`);
        console.log(`Name: ${berryData.name}`);
        console.log(`Growth Time: ${berryData.growth_time}`);
        console.log(`Maximum Harvest: ${berryData.max_harvest}`);
        console.log(`Natural Gift Power: ${berryData.natural_gift_power}`);
        // Add more assertions as needed

        // Example assertions
        expect(berryData.id).toEqual(berryId);
        expect(typeof berryData.name).toBe('string');
        expect(berryData.growth_time).toBeGreaterThan(0);
        expect(berryData.max_harvest).toBeGreaterThan(0);
        // Add more assertions to verify other fields
    } catch (error) {
        console.error('Error:', error.message);
    }

    // Define the function to verify filtering functionality
    async function verifyFiltering() {
        try {
            // Make a GET request with query parameters to filter the response data
            const response = await axios.get('https://pokeapi.co/api/v2/berry', {
                params: {
                    limit: 10, // Limit the number of results to 10
                    offset: 20 // Start retrieving results from the 20th item
                }
            });
            const filteredData = response.data.results;

            // Verify the number of results based on the filtering criteria
            console.log('Verifying filtering functionality:');
            console.log(`Number of filtered results: ${filteredData.length}`);
            // Add assertions to verify the number of results
            expect(filteredData.length).toEqual(10); // Expecting 10 results with the specified filtering criteria
        } catch (error) {
            console.error('Error:', error.message);
        }
    }

}

// Define the function to verify error handling
async function verifyErrorHandling() {
    try {
        // Make a GET request with an invalid parameter (e.g., non-existent query parameter)
        const responseWithInvalidParam = await axios.get('https://pokeapi.co/api/v2/berry', {
            params: {
                invalidParam: 'value' // Non-existent query parameter
            }
        });

        // This assertion should fail because the invalid parameter is not recognized by the API
        console.log(`Response with invalid parameter status code: ${responseWithInvalidParam.status}`);
        expect(responseWithInvalidParam.status).toEqual(200); // This assertion will fail

    } catch (error) {
        // Verify that the error response status code is appropriate (e.g., 400 for Bad Request)
        console.log(`Error response status code: ${error.response.status}`);
        expect(error.response.status).toEqual(400); // Expecting 400 for Bad Request
    }
}

async function verifyRateLimiting() {
    try {
        // Make multiple consecutive GET requests to exceed the rate limit
        for (let i = 0; i < 11; i++) { // Send 11 requests to exceed the rate limit
            await axios.get('https://pokeapi.co/api/v2/berry');
        }

        // This assertion should fail because the rate limit should be exceeded
        console.log('Rate limiting verification: No rate limit exceeded');
        expect(true).toBe(false); // This assertion will fail

    } catch (error) {
        // Verify that the error response status code is 429 for Too Many Requests (rate limiting)
        console.log(`Error response status code: ${error.response.status}`);
        expect(error.response.status).toEqual(429); // Expecting 429 for Too Many Requests
    }
}

async function containsArray() {
    axios.get('https://pokeapi.co/api/v2/berry')
        .then(response => {
            // Check if the response body contains an array
            if (Array.isArray(response.data)) {
                console.log('Response contains an array');
            } else {
                console.log('Response does not contain an array');
            }
        })
        .catch(error => {
            console.error('Error:', error.message);
        });
}