<?php

$host = '';

if(str_ends_with($_SERVER['SERVER_NAME'], 'wimme.net')) {
    $host = 'wimme.net';
}
else if(str_ends_with($_SERVER['SERVER_NAME'], 'skipdewinterdip.be')) {
    $host = 'skipdewinterdip.be';
}
else {
    header($_SERVER['SERVER_PROTOCOL'].' 400 Bad Request');
    exit;
}

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://cms.' . $host . '/sitemap/');
curl_setopt($ch, CURLOPT_BINARYTRANSFER, true);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HEADER, false);

$data = curl_exec($ch);

if(!curl_errno($ch)) {
    $info = curl_getinfo($ch);
    header('Content-Type: ' . $info['content_type']);
    echo str_replace('://cms.' . $host, '://' . $host, $data);
}

curl_close($ch);

?>
