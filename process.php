<?php
require_once __DIR__ . '/vendor/autoload.php';

// Set your API key
$apiKey = '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';

// Get the user's message from the form submission
$message = $_POST['message'];

// Send a request to the GPT API
$client = new \GuzzleHttp\Client();

try {
	$response = $client->post('https://api.openai.com/v1/engines/text-davinci-003/completions', [
		'headers' => [
			'Authorization' => 'Bearer ' . $apiKey,
			'Content-Type' => 'application/json',
		],
		'json' => [
			'prompt' => $message,
			'max_tokens' => 50,
			'n' => 1,
			'stop' => ['\n'],
		],
	]);
	$completion = json_decode($response->getBody()->getContents(), true)['choices'][0]['text'];
	echo $completion;
} catch (\GuzzleHttp\Exception\ClientException $e) {
	// Something went wrong with the request
	$errorResponse = $e->getResponse();
	$errorBody = json_decode($errorResponse->getBody(), true);
	echo 'Error: ' . $errorBody['error']['message'];
} catch (\Exception $e) {
	// Something else went wrong
	echo 'Error: ' . $e->getMessage();
}