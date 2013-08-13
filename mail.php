<?php
  
  $from = "contato@litoralmania.net"; // deve ser um email do dominio
 
  $to = "contato@litoralmania.net"; // qualquer email pode receber os dados
  $email_reply = $_POST['email'];
  $subject = "Contato LM.net";
 
  $body = <<<EOT
<h2>Contato LM.net</h2>
<p>
  <strong>Nome:</strong> %s<br/>
  <strong>E-mail:</strong> %s<br/>
  <strong>Telefone:</strong> %s<br/>
  <strong>Mensagem:</strong> %s
</p>
EOT;

  $body = sprintf(
    $body,
    $_POST['name'],
    $_POST['email'],
    $_POST['telephone'],
    $_POST['message']
  );

  $headers = implode (
    "\n",
    array(
      "From: $from", 
      "Reply-To: $email_reply", 
      "Subject: $subject",
      "Return-Path:  $from",
      "MIME-Version: 1.0",
      "X-Priority: 3",
      "Content-Type: text/html; charset=UTF-8" 
    ) 
  );

  $return = array();
  if (mail ($to, $subject, $body, $headers)){
    $return['error'] = false;
    $return['message'] = 'Contato enviado com sucesso! Em breve entraremos em contato.';
  } else{
    $return['error'] = true;
    $return['message'] = 'Houve um problema no envio. Tente novamente';
  }

  echo json_encode($return);