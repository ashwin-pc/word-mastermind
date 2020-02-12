<?php 

header("Access-Control-Allow-Origin: *");

$code_word = isset($_GET['codeWord']) ? $_GET['codeWord'] : '';
$test_word = isset($_GET['testWord']) ? $_GET['testWord'] : '';
$iv = isset($_GET['iv']) ? $_GET['iv'] : '';
$action = isset($_GET['action']) ? $_GET['action'] : '';

if ($action == "encode") {
    list($encryption, $iv) = encrypt($code_word);
    echo $encryption . "," . $iv; 
} else if ($action == "test") {
    $decryption = decrypt($code_word, $iv);
    $result = testGame($decryption, $test_word);

    echo $result;
}

function testGame ($code, $test_word) {
    $safe_test_word = substr($test_word, 0, strlen($code)); // Prevent long inputs from slowing search
    $test_word_array = str_split($safe_test_word);
    $code_array = str_split($code);
    $result = "";

    foreach ($test_word_array as $index => $test_char) {
        if ($code_array[$index] == $test_char) {
            $result = $result . "x";
            $code[$index] = "#";
            $test_word_array[$index] = null;
        }
    }

    foreach ($test_word_array as $index => $test_char) {
        if ($test_char !== null) {
            $searchIndex = strpos($code, $test_char);
            if ($searchIndex !== false) {
                $result = $result . "o";
                $code[$searchIndex] = "*";
            } 
        }
    }

    return str_shuffle($result);
}

function get_crypt_params () {
    // Based on https://www.geeksforgeeks.org/how-to-encrypt-and-decrypt-a-php-string/
    // Cipher method 
    $ciphering = "AES-128-CTR"; 
    $key = openssl_digest(php_uname(), 'MD5', TRUE); 
    $iv_length = openssl_cipher_iv_length($ciphering); 
    $options = 0;

    return array($ciphering, $key, $iv_length, $options);
}

function encrypt ($str) {
    list($ciphering, $key, $iv_length, $options) = get_crypt_params();

    // Use random_bytes() function which gives 
    // randomly 16 digit values 
    $iv = random_bytes($iv_length); 

    $encryption = openssl_encrypt($str, $ciphering, $key, $options, $iv); 
    return array($encryption, base64_encode(bin2hex($iv)));
}

function decrypt ($str, $iv) {
    list($ciphering, $key, $iv_length, $options) = get_crypt_params();

    $decryption = openssl_decrypt($str, $ciphering, $key, $options, hex2bin(base64_decode($iv)));
    return $decryption;
}


?>