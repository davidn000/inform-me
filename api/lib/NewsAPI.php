<?php declare(strict_types=1);


/**
 *  @property const API_HOST
 *  @property const API_KEY
 */
class NewsApi 
{
    private const API_KEY = '21eb8eabcamshdc6423e08ff4be9p194436jsn9552cfba4be6';


    static function getNews($query = null, $limit = 10, $skip = 0)
    {
        $url = "https://newsx.p.rapidapi.com/search?limit={$limit}&skip={$skip}";
        if ($query) {
            $url = "https://newsx.p.rapidapi.com/search?q={$query}&limit={$limit}&skip={$skip}";
        }
        $curl = curl_init();
        curl_setopt_array($curl, [
            CURLOPT_URL => $url,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "GET",
            CURLOPT_HTTPHEADER => [
                "X-RapidAPI-Host: newsx.p.rapidapi.com",
                "X-RapidAPI-Key: " . self::API_KEY
            ],
        ]);
        $response = curl_exec($curl);
        $err = curl_error($curl);
        curl_close($curl);
        if ($err) {
            echo "cURL Error #:" . $err;
        } else {
            return $response;
        }
    }
}