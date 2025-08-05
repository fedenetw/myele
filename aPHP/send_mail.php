<?php
// Imposta un livello di report degli errori per la produzione
error_reporting(0);
ini_set('display_errors', 0);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // 1. Recupera e pulisce i dati dal form
    // Usa FILTER_SANITIZE_FULL_SPECIAL_CHARS per una migliore sanificazione
    $quantita = filter_input(INPUT_POST, 'quantita', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $nome = filter_input(INPUT_POST, 'nome', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $contatto_cliente_input = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);

    // 2. Validazione dei dati
    if (empty($quantita) || empty($nome) || empty($contatto_cliente_input)) {
        die("Errore: Per favore, compila tutti i campi obbligatori.");
    }

    // Validazione email più rigorosa: controlla se è un'email valida.
    // Se non lo è, lo tratta come un testo normale (es. numero di telefono) ma lo valida.
    $is_email = filter_var($contatto_cliente_input, FILTER_VALIDATE_EMAIL);
    if ($is_email === false && !preg_match('/^[0-9\s\+\-\(\)]+$/', $contatto_cliente_input)) {
         die("Errore: Il campo 'Email o Telefono' contiene caratteri non validi.");
    }
    
    // Prevenzione Header Injection: rimuove i caratteri newline
    $nome = str_replace(array("", "\n"), '', $nome);
    $contatto_cliente = str_replace(array("", "\n"), '', $contatto_cliente_input);

    // 3. Prepara i dettagli dell'email
    $destinatario = "mariorossi.mr.rossi@gmail.com"; // <-- INSERISCI QUI LA TUA EMAIL
    $oggetto = "Nuova Prenotazione Miele - da " . $nome;

    $prezzoSingolo = 12;
    $prezzoTotale = $prezzoSingolo * intval($quantita);
    $quantitaTesto = $quantita == '1' ? '1 vasetto' : $quantita . ' vasetti';

    // 4. Costruisce il corpo dell'email in modo sicuro
    $corpo_email = "
    <html>
    <body style='font-family: Arial, sans-serif; line-height: 1.6;'>
        <h2>Nuova prenotazione ricevuta dal sito web:</h2>
        <p><strong>Prodotto:</strong> Miele Millefiori Artigianale</p>
        <p><strong>Quantità:</strong> " . htmlspecialchars($quantitaTesto) . "</p>
        <p><strong>Prezzo Totale:</strong> CHF " . htmlspecialchars($prezzoTotale) . "</p>
        <hr>
        <h3>Dettagli Cliente:</h3>
        <p><strong>Nome:</strong> " . htmlspecialchars($nome) . "</p>
        <p><strong>Email o Telefono di contatto:</strong> " . htmlspecialchars($contatto_cliente) . "</p>
    </body>
    </html>
    ";

    // 5. Prepara gli header dell'email in modo sicuro
    $headers = "MIME-Version: 1.0" . "\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\n";
    $headers .= 'From: "Miele di Contra" <noreply@miedicontra.com>' . "\n"; // Un mittente più professionale
    
    // Aggiunge il Reply-To solo se è un'email valida
    if ($is_email) {
        $headers .= 'Reply-To: ' . $contatto_cliente . "\n";
    }

    // 6. Invia l'email
    if (mail($destinatario, $oggetto, $corpo_email, $headers)) {
        // Se l'invio ha successo, reindirizza alla pagina di successo
        header("Location: success.html");
        exit;
    } else {
        // Se c'è un errore
        die("Si è verificato un errore critico durante l'invio della prenotazione. Per favore, riprova.");
    }
} else {
    // Se qualcuno prova ad accedere al file direttamente
    die("Accesso non consentito.");
}
?>
