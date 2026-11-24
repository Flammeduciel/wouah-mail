# Version web de test (validation Google)

Google refuse d'installer un APK : cette version web de Wouah Mail lui permet de tester Gmail et Google Contacts dans un navigateur. C'est la même application (mêmes écrans, même code), avec trois différences :
- Gmail uniquement (IMAP a besoin du module Android) ;
- pas de notifications ni de synchro en arrière-plan (l'onglet ouvert synchronise) ;
- connexion Google sans jeton de rafraîchissement : la session dure une heure, puis on se reconnecte.

Les mails restent dans le navigateur (IndexedDB), comme ils restent sur le téléphone dans l'app Android.

## 1. Créer l'identifiant OAuth « Application Web » (une fois)

Google Cloud Console, même projet que l'app Android :

1. **Google Auth Platform > Clients > Créer un client.**
2. Type d'application : **Application Web**. Nom : `Wouah Mail Web`.
3. **Origines JavaScript autorisées** : `https://wouah-app.flamme.work`
4. **URI de redirection autorisés** : `https://wouah-app.flamme.work/oauthredirect`
5. Créer, puis copier l'**ID client** (il finit par `.apps.googleusercontent.com`). Le code secret ne sert pas.
6. **Branding > Domaines autorisés** : `flamme.work` doit y être (c'est déjà le cas pour le site et le relais).

Remplace `wouah-app.flamme.work` partout si tu choisis un autre sous-domaine.

## 2. Déployer sur Dokploy (Docker Compose)

1. Dans ton projet Dokploy : **Create Service > Compose**.
2. Provider : GitHub, dépôt `Flammeduciel/wouah-mail`, branche `master`.
3. **Compose Path** : `./web/docker-compose.yml`
4. Onglet **Environment** : ajoute
   ```
   EXPO_PUBLIC_GMAIL_WEB_CLIENT_ID=<l'ID client de l'étape 1>
   ```
5. Onglet **Domains** : ajoute `wouah-app.flamme.work`, service `web`, port `80`, HTTPS activé (Let's Encrypt).
6. Chez ton fournisseur DNS : un enregistrement `A` pour `wouah-app` vers l'IP du serveur Dokploy (comme pour `wouah-relay`).
7. **Deploy**. La construction prend quelques minutes (installation des dépendances puis export web).

Vérification : ouvre `https://wouah-app.flamme.work`. L'écran « Ajouter un compte » s'affiche, avec Gmail et la mention « Web test version: Gmail only ».

## 3. Ce qu'on envoie à Google

- Le lien : `https://wouah-app.flamme.work`
- Les identifiants du compte de démo (validation en deux étapes et vérification par téléphone désactivées), ou leur propre compte Google.
- Les étapes de test (voir `docs/verification-google.md`, partie « Réponse au mail »).
