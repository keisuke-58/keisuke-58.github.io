<?php
// サイトキーとシークレットキーを記述したファイルの読み込み
require 'libs/recaptcha_vars.php';
const V3_SITEKEY = '6Ley3ssZAAAAAC-8d2CKf5r4cOionPxLAnIRjtK1';
const V3_SECRETKEY = '6Ley3ssZAAAAAIMXp1JzTysurVzzEpbUkvfyJXWt';
// reCAPTCHA サイトキー
$siteKey = V3_SITEKEY;
// reCAPTCHA シークレットキー
$secretKey = V3_SECRETKEY;
//reCAPTCHA トークン
$token = isset( $_POST[ 'g-recaptcha-response' ] ) ? $_POST[ 'g-recaptcha-response' ] : NULL;
//reCAPTCHA アクション名 
$action = isset( $_POST[ 'action' ] ) ? $_POST[ 'action' ] : NULL;
 
$result_status = ''; // 結果を表示する文字列を初期化
 
// トークンとアクション名が取得できれば
if ( $token && $action) {
 
  //cURL セッションを初期化（API のレスポンスの取得）
  $ch = curl_init();
  // curl_setopt() により転送時のオプションを設定
  //URL の指定
  curl_setopt($ch, CURLOPT_URL,"https://www.google.com/recaptcha/api/siteverify");
  //HTTP POST メソッドを使う
  curl_setopt($ch, CURLOPT_POST, true );
  //API パラメータの指定
  curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query(array(
    'secret' => $secretKey, 
    'response' => $token
  )));
  //curl_execの返り値を文字列にする
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  //転送を実行してレスポンスを $api_response に格納
  $api_response = curl_exec($ch);
  //セッションを終了
  curl_close($ch);
  
  //レスポンスの $json（JSON形式）をデコード
  $result = json_decode( $api_response );
  
  //判定
  if ( $result->success && $result->action === $action && $result->score >= 0.5) {
    //success が true でアクション名が一致し、スコアが 0.5 以上の場合は合格
    $result_status = '合格： $result->score : ' . $result->score;
    // 合格した場合の処理（メールの送信など）を実行（または結果を変数に入れて、その変数を使って処理を分岐するなど）
  } else {
    // 上記以外の場合は 不合格
    $result_status = '不合格';
    // 不合格の場合の処理（エラーを表示するなど）を実行
  }
}
?>
<!DOCTYPE html>
<html lang="ja">
<head>
<title>PHP を使った検証（reCAPTCHA v3）1</title>
</head>
<body>
  <h1>PHP を使った検証（reCAPTCHA v3）1</h1>
  <form id="rc_form" method="post">
    <button type="submit">送信</button>
  </form>
  <div>
    <p>［検証結果］</p>
    <p><?php echo $result_status; ?></p>
  </div>
<script src="https://www.google.com/recaptcha/api.js?render=<?php echo $siteKey; ?>"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script>
jQuery(function($){
  $('#rc_form').submit(function(event) {
    event.preventDefault();
    var action_name = 'contact'; //アクション名 
    grecaptcha.ready(function() {
      grecaptcha.execute('<?php echo $siteKey; ?>', { action: action_name }).then(function(token) {
        $('#rc_form').prepend('<input type="hidden" name="g-recaptcha-response" value="' + token + '">');
        $('#rc_form').prepend('<input type="hidden" name="action" value="' + action_name + '">');
        $('#rc_form').unbind('submit').submit();
      });;
    });
  });
})
</script>
</body>
</html>