<?php
header('Content-Type: application/json');

$baseUrl = "https://randomuser.me/api/";
$query = $_SERVER['QUERY_STRING'];
$url = $baseUrl . ($query ? "?$query" : "");


$response = @file_get_contents($url);


if ($response === FALSE) {
    echo json_encode([
        "success" => false,
        "message" => "Erro de conexão com a API."
    ]);
    exit;
}

$dados = json_decode($response, true);


if (!$dados || !isset($dados['results'])) {
    echo json_encode([
        "success" => false,
        "message" => "Resposta inválida da API."
    ]);
    exit;
}


echo json_encode([
    "success" => true,
    "results" => $dados['results']
]);
?>