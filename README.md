# Chi vuol essere Milionario?

Replica delle funzionalità del gioco "Chi vuol essere Milionario?" utilizzando il framework Vue JS e il tool Vite.

![Milionario (1)](https://github.com/user-attachments/assets/f07eed30-2576-45c6-a29c-890b751c5042)

Sulla sinistra dell'applicazione web, sono presenti il logo del gioco seguito dalla domanda e dalle quattro opzioni di risposta fra cui il giocatore potrà scegliere. Sulla base delle azioni compiute dal giocatore, in basso compariranno diversi pulsanti (per confermare la risposta, procedere alla domanda successiva o riniziare il gioco) e/o testi (record chiamata da casa, informazioni sul punteggio ottenuto in caso di perdita della partita). Sulla destra, nell'aside sono presenti in alto i possibili aiuti che vengono attivati al click del giocatore sul rispettivo pulsante, mentre più in basso è rappresentata la scalata al milione che si aggiorna automaticamente all'avanzare del giocatore al livello successivo.

## Tecnologie e librerie:
- Framework Vue.js con tool Vite
- HTML
- SCSS
- JavaScript
- Bootstrap

## Principali funzionalità:
1. Estrazione delle domande del gioco in modo random da un database sulla base del livello a cui si trova il giocatore.
2. Al click su una risposta, apparizione del pulsante di conferma per accedere la risposta e verificarne la correttezza.
3. Possibilità di avvalersi nel corso di una partita dei seguenti aiuti:
    - Chiamata da casa: al click sul pulsante, viene mostrato al giocatore un testo che     rappresenta in modo semplificato il record della risposta consigliata dalla persona chiamata a casa
    - Aiuto del pubblico: al click sul pulsante, a fianco di ogni risposta viene mostrata una percentuale che rappresenta la quota parte del pubblico che indicherebbe quella risposta come corretta
    - 50/50: al click sul pulsante, il gioco elimina in modo random due risposte non corrette
  Ogni aiuto può essere utilizzato una sola volta nel corso di una singola partita.
4. Al termine della partita, in caso di perdita viene mostrato il punteggio effettuato sulla base del livello della scalata a cui il giocatore è arrivato.
