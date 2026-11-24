# Validation Google : guide complet (Wouah Mail)

Réponse courte à ta question : **tu fais les deux, dans cet ordre.**

1. D'abord la **Console** : tu alignes les autorisations, tu colles les nouvelles justifications et le lien de la nouvelle vidéo, puis tu renvoies la demande de validation. C'est ce que l'équipe examine.
2. Ensuite tu **réponds au mail de Google** (en répondant directement à leur mail, même fil) avec le texte de la partie 6, pour dire que tout est corrigé et où regarder.

Les textes à coller chez Google sont en **anglais** (ils sont plus bas, prêts à copier).

---

## 1. Avant tout : vérifier la Console

Google Cloud Console, projet `mailyo-514316`, menu **Google Auth Platform**.

### 1.1 Accès aux données (Data Access)

La liste doit être **exactement** celle-ci, rien de plus, rien de moins :

| Autorisation | Type |
| --- | --- |
| `https://www.googleapis.com/auth/gmail.modify` | restreinte |
| `https://www.googleapis.com/auth/contacts.readonly` | sensible |
| `https://www.googleapis.com/auth/contacts.other.readonly` | sensible |
| `https://www.googleapis.com/auth/userinfo.email` | non sensible |

- Si `https://mail.google.com/` est encore là : **supprime-la**.
- Si `contacts.other.readonly` manque : **ajoute-la**.
- C'est exactement ce que l'application demande (fichier `src/app/login.tsx`). Google l'appelle « Scope Matching ».

### 1.2 Branding (Image de marque)

- Nom : **Wouah Mail**, logo, adresse e-mail d'assistance.
- Page d'accueil : la page du site.
- Règles de confidentialité : la version anglaise `privacy.html` (elle décrit déjà gmail.modify, les contacts et le serveur relais).
- Domaine autorisé : celui du site.

### 1.3 Statut de publication

Doit rester **« En production »** (Google le rappelle dans son mail).

---

## 2. Préparer le compte de démonstration (la veille)

N'utilise **pas** ton compte personnel (YouTube avait retiré la première vidéo pour ça). Prends un compte Gmail de démo, par exemple celui de la vidéo précédente.

1. **Retirer l'accès existant** : sur myaccount.google.com/permissions avec le compte démo, supprime Wouah Mail. Ainsi l'écran de consentement réapparaîtra en entier.
2. **Désinstaller puis réinstaller** le dernier APK sur le téléphone.
3. **Mails de test** : depuis une autre adresse, envoie au compte démo 5 mails non lus, avec des sujets en anglais :
   - « Project meeting on Friday » (avec une pièce jointe PDF)
   - « Invoice November »
   - « Weekend plans »
   - « Special offer 50% » (servira pour le spam)
   - « Quick question »
4. **Un contact enregistré** : dans Google Contacts du compte démo, crée « Alex Martin » avec une adresse que tu contrôles, plus un numéro de téléphone.
5. **Un « autre contact »** : depuis le compte démo, écris une fois à une troisième adresse que tu n'enregistres **pas** (par exemple « Sam Lee »). Vérifie qu'elle apparaît dans Google Contacts > **Autres contacts**.
6. **Gmail sur le même téléphone** : installe l'app Gmail et connecte le compte démo. Tu passeras d'une app à l'autre pendant la vidéo.
7. **Téléphone propre** : mode Ne pas déranger pour les autres apps, aucune notification personnelle, batterie chargée, enregistreur d'écran prêt.

---

## 3. Le script de la vidéo

- Une seule prise : l'enregistrement de l'écran du téléphone. On passe de **Wouah Mail** à l'app **Gmail** (ou à Google Contacts) pour montrer le résultat après **chaque** action. Google a écrit que c'est la preuve qui manquait.
- **Durée visée : 6 à 8 minutes.** Pas besoin de parler : je peux ajouter les sous-titres anglais ci-dessous au montage, comme la dernière fois.
- Fais chaque geste lentement et reste 2 à 3 secondes sur chaque résultat.

### Scène 0. Présentation (10 s)
- **Montrer :** l'icône Wouah Mail sur l'écran d'accueil.
- **Sous-titre :** `Wouah Mail: an Android email client that shows Gmail as chat-style conversations.`

### Scène 1. Écran de consentement en anglais (60 s)
1. Ouvre Wouah Mail, puis sur la ligne **Gmail**, touche « Connecter ».
2. Sur l'écran de choix du compte, change la langue en bas de l'écran pour **English (United States)**.
3. Choisis le compte démo.
4. Sur l'écran de consentement, **déroule chaque autorisation** (touche chaque ligne, ou « Show all services » si ce lien apparaît). On doit pouvoir lire :
   - celle de Gmail (gmail.modify),
   - Contacts,
   - Other contacts,
   - l'adresse e-mail.
5. Reste 5 secondes dessus, puis touche « Continue » / « Allow ».

- **Sous-titres :**
  - `OAuth consent screen, in English, with every requested scope expanded.`
  - `Requested scopes: gmail.modify, contacts.readonly, contacts.other.readonly, userinfo.email. No other scope is requested.`

### Scène 2. Lire la boîte (gmail.modify, lecture) (40 s)
1. La liste des conversations s'affiche. Ouvre « Project meeting on Friday », puis touche la pièce jointe PDF.
2. Passe dans l'app Gmail : le mail apparaît maintenant **lu** (il n'est plus en gras).

- **Sous-titres :**
  - `gmail.modify: the app reads the inbox, the messages and their attachments.`
  - `Result in Gmail: opening the conversation marked the email as read.`

### Scène 3. Marquer comme non lu (30 s)
1. Dans la conversation, menu ⋮ > « Marquer comme non lu ».
2. Dans Gmail, actualise : le mail est **en gras** à nouveau.

- **Sous-titres :**
  - `Mark as unread in Wouah Mail.`
  - `Result in Gmail: the email is unread again.`

### Scène 4. Favori (30 s)
1. Ouvre « Invoice November » et touche l'étoile en haut.
2. Dans Gmail : l'étoile est jaune, et le mail est dans « Messages suivis ».

- **Sous-titres :**
  - `Star a conversation.`
  - `Result in Gmail: the email is starred.`

### Scène 5. Archiver (30 s)
1. Ouvre « Weekend plans », menu ⋮ > « Archiver ».
2. Dans Gmail : le mail n'est plus dans la boîte de réception, mais il est dans « Tous les messages ».

- **Sous-titres :**
  - `Archive.`
  - `Result in Gmail: removed from the Inbox, still in All Mail.`

### Scène 6. Corbeille puis restauration (60 s)
1. Ouvre « Quick question », menu ⋮ > « Supprimer la conversation ».
2. Dans Gmail, menu > Corbeille : le mail y est.
3. Retour dans Wouah Mail : menu de gauche > Corbeille, puis « Restaurer » sur cette conversation.
4. Dans Gmail : le mail est **revenu dans la boîte de réception**.

- **Sous-titres :**
  - `Move to Trash.`
  - `Result in Gmail: the email is in the Trash.`
  - `Restore from the Trash in Wouah Mail.`
  - `Result in Gmail: back in the Inbox. Wouah Mail never deletes mail permanently, so https://mail.google.com/ is not needed.`

### Scène 7. Spam (40 s)
1. Ouvre « Special offer 50% », menu ⋮ > « Signaler comme spam ».
2. Dans Gmail > Spam : le mail y est.
3. Optionnel : dans Wouah Mail, « Ce n'est pas du spam », et le mail revient dans la boîte Gmail.

- **Sous-titres :**
  - `Report spam.`
  - `Result in Gmail: the email is in Spam.`

### Scène 8. Répondre et brouillon (60 s)
1. Dans « Project meeting on Friday », écris « Yes, see you on Friday. » et envoie.
2. Dans Gmail > Messages envoyés : la réponse y est, dans le même fil.
3. Dans Wouah Mail, touche « Écrire », mets un sujet « Draft test », quelques mots, puis reviens en arrière.
4. Dans Gmail > Brouillons : « Draft test » y est.

- **Sous-titres :**
  - `Send a reply.`
  - `Result in Gmail: the reply is in Sent, in the same thread.`
  - `Drafts are saved to Gmail.`
  - `Result in Gmail: the draft is in Drafts.`

### Scène 9. Notification instantanée et changements faits ailleurs (60 s)
1. Avec ton autre téléphone (ou ton ordinateur), envoie un mail au compte démo : « Are you there? ».
2. Wouah Mail **fermé** : la notification arrive en quelques secondes.
3. Ouvre ce mail dans l'**app Gmail** (pas dans Wouah Mail).
4. Reviens dans Wouah Mail : le mail y est marqué lu et la notification a disparu.

- **Sous-titres :**
  - `Instant mail: Gmail push notifications (users.watch) wake the app as soon as an email arrives.`
  - `Changes made in Gmail (read, starred, trashed...) are applied in Wouah Mail through the Gmail history API.`

### Scène 10. Contacts enregistrés (contacts.readonly) (45 s)
1. « Écrire », puis dans le champ « À », tape « Alex » : la suggestion « Alex Martin » apparaît, avec son adresse.
2. Ouvre une conversation avec Alex et touche son nom : la fiche contact (nom, adresse, téléphone) s'affiche.
3. Ouvre Google Contacts : Alex Martin y est enregistré, avec les mêmes informations.

- **Sous-titres :**
  - `contacts.readonly: saved Google Contacts are suggested while typing a recipient, and shown on the contact card.`
  - `Result in Google Contacts: the same saved contact. Read only: the app never edits contacts.`

### Scène 11. Autres contacts (contacts.other.readonly) (45 s)
1. « Écrire », puis dans « À », tape « Sam » : la suggestion de Sam Lee apparaît.
2. Ouvre Google Contacts > **Autres contacts** : Sam Lee y est, mais pas dans les contacts enregistrés.

- **Sous-titres :**
  - `contacts.other.readonly: people you emailed but never saved ("Other contacts") are suggested too, like in Gmail.`
  - `Result in Google Contacts: Sam Lee is only in "Other contacts". contacts.readonly does not include them.`

### Scène 12. Adresse du compte et déconnexion (30 s)
1. Réglages : l'adresse du compte est affichée (userinfo.email).
2. Touche « Se déconnecter ».
3. Optionnel : sur myaccount.google.com/permissions, Wouah Mail n'a plus accès.

- **Sous-titres :**
  - `userinfo.email identifies the signed-in account.`
  - `Signing out revokes the access token.`

### Écran de fin (5 s)
- **Sous-titre :** `Message content stays on the device. Privacy policy: <URL of privacy.html>`

---

## 4. Publier la vidéo

- YouTube, visibilité **Non répertoriée** (pas Privée : Google doit pouvoir la voir).
- Titre : `Wouah Mail - OAuth scopes demo (gmail.modify, contacts.readonly, contacts.other.readonly)`
- Description : la liste des scènes, avec le temps de chaque scène (par exemple `0:10 Consent screen`, `1:10 Read`, etc.).
- Envoie-moi d'abord la vidéo brute : j'ajoute les sous-titres et je floute ce qui doit l'être avant que tu la mettes en ligne.

---

## 5. Textes à coller dans la Console

Où les coller : Google Auth Platform > **Accès aux données**. Sous les autorisations sensibles et restreintes, il y a un champ de justification et un champ pour le lien de la vidéo. Colle le lien YouTube dans le champ vidéo, enregistre, puis va dans le **Centre de validation** et renvoie la demande.

### 5.1 gmail.modify

```
Wouah Mail is an Android email client that shows the user's Gmail inbox as chat-style conversations. gmail.modify is used to:
1) read messages, threads and attachments to display the inbox and each conversation;
2) send replies and new messages, and save drafts;
3) change message state when the user asks: mark read/unread, star/unstar, archive, move to Trash and restore from Trash, report spam / not spam;
4) watch the inbox (users.watch) and read the change history (users.history.list) so new mail and changes made in Gmail appear instantly in the app.
Narrower scopes cannot cover these features: gmail.readonly and gmail.metadata cannot change labels, trash, send or save drafts; gmail.send and gmail.compose cannot read the inbox; gmail.labels cannot read messages. We removed https://mail.google.com/: the app never deletes mail permanently (Gmail empties its Trash after 30 days).
Message content stays on the device. Our relay server only receives Gmail's push notification (email address and history id) to wake the phone; the phone sends its access token to the relay only so the relay can check with Google's tokeninfo endpoint that the address belongs to the user, and the token is never stored.
```

### 5.2 contacts.readonly

```
Used to read the user's saved Google Contacts (name, email addresses, photo, phone number, organization) to:
1) suggest recipients while the user types in the To / Cc fields of the compose screen;
2) show the person's real name and photo in the conversation list and in the conversation header;
3) show the contact card (name, emails, phone) when the user taps a sender.
Read only: the app never creates, edits or deletes contacts. There is no narrower scope for saved contacts: contacts.other.readonly only covers "Other contacts" and directory.readonly only covers Google Workspace directories. Contact data stays on the device.
```

### 5.3 contacts.other.readonly

```
Used to read the user's "Other contacts" (people the user has emailed but never saved) so the compose screen can suggest their addresses while the user types, like Gmail's own autocomplete, and so conversations show their names instead of raw email addresses. contacts.readonly does not include Other contacts and no narrower scope exists. Read only; contact data stays on the device.
```

### 5.4 userinfo.email (non sensible, si un champ est demandé)

```
Identifies the Google account the user signed in with, shown in the app settings and used to tell the user's own messages apart in conversations.
```

---

## 6. La réponse au mail de Google

Réponds directement à leur mail (même fil), après avoir renvoyé la demande dans la Console :

```
Hello,

Thank you for the review. We have addressed every item:

1. Least privilege / scope discrepancy
- https://mail.google.com/ has been removed from the app and from the Cloud Console. The app now requests exactly these scopes, which match the Data Access configuration:
  - https://www.googleapis.com/auth/gmail.modify
  - https://www.googleapis.com/auth/contacts.readonly
  - https://www.googleapis.com/auth/contacts.other.readonly
  - https://www.googleapis.com/auth/userinfo.email
- The app never deletes mail permanently, so the full Gmail scope is not needed.

2. Scope justification
The justification of each scope has been rewritten in the Cloud Console. It lists every user-facing feature using the scope and why narrower scopes cannot be used.

3. Demo video
New video: <YOUTUBE LINK>
It shows the consent screen in English with every scope expanded, then each Gmail action (read, mark unread, star, archive, trash and restore, spam, reply, draft, instant notification) followed by the result in the Gmail app, and both contact scopes with the result in Google Contacts.

4. Test credentials
Wouah Mail has no local login: users sign in with Google only. The app can be installed from <APK LINK> and used with any Google account, without phone verification or payment.

Best regards,
<Your name>
Wouah Mail
```

---

## 7. À savoir

- `gmail.modify` est une autorisation **restreinte**. Si Google juge que des données passent par un serveur (le relais reçoit l'adresse et vérifie le jeton une fois), il peut demander une **évaluation de sécurité** (CASA) après cette étape. Ce n'est pas un refus : c'est une étape suivante qu'il décidera lui-même. Les textes ci-dessus le décrivent honnêtement.
- Pour le lien de l'APK : publie une nouvelle version sur GitHub (Releases > Draft a new release, par exemple `v1.1.0`, avec l'APK joint), une fois la PR #14 fusionnée.
- Garde la même application, le même projet et le même identifiant client que ceux de la vidéo : ce que Google voit doit être exactement ce qui est configuré.
