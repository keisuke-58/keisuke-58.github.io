<?php 
//cURL セッションを初期化
$ch = curl_init();
// curl_setopt() により転送時のオプションを設定
// API の URL の指定
curl_setopt($ch, CURLOPT_URL,"https://www.google.com/recaptcha/api/siteverify");
// POST メソッドを使う
curl_setopt($ch, CURLOPT_POST, true );
// API パラメータの指定
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query(array(
  'secret' => '6Ley3ssZAAAAAIMXp1JzTysurVzzEpbUkvfyJXWt',   //シークレットキー
  'response' => $_POST[ 'g-recaptcha-response' ]  //トークン
)));
// curl_execの返り値を文字列にする
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
//転送を実行してレスポンスを $api_response に格納
$api_response = curl_exec($ch);
//セッションを終了
curl_close($ch);
 
//レスポンスの $json（JSON形式）をデコード
$result = json_decode( $api_response );