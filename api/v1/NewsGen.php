<?php
/**
 *  Author:   Davood Najafi
 *  Description:
 *   - This is a fairly simple PHP API that returns a JSON response of news articles. 
 */

require_once '../lib/NewsAPI.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: *');


$response = NewsApi::getNews($_GET['q'], $_GET['limit'], $_GET['skip']);

header('Content-Type: application/json');
echo $response;