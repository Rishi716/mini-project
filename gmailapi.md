The Gmail API lets you view and manage Gmail mailbox data like threads, messages, and labels.

- [REST Resource: v1.users](https://developers.google.com/workspace/gmail/api/reference/rest#v1.users)
- [REST Resource: v1.users.drafts](https://developers.google.com/workspace/gmail/api/reference/rest#v1.users.drafts)
- [REST Resource: v1.users.history](https://developers.google.com/workspace/gmail/api/reference/rest#v1.users.history)
- [REST Resource: v1.users.labels](https://developers.google.com/workspace/gmail/api/reference/rest#v1.users.labels)
- [REST Resource: v1.users.messages](https://developers.google.com/workspace/gmail/api/reference/rest#v1.users.messages)
- [REST Resource: v1.users.messages.attachments](https://developers.google.com/workspace/gmail/api/reference/rest#v1.users.messages.attachments)
- [REST Resource: v1.users.settings](https://developers.google.com/workspace/gmail/api/reference/rest#v1.users.settings)
- [REST Resource: v1.users.settings.cse.identities](https://developers.google.com/workspace/gmail/api/reference/rest#v1.users.settings.cse.identities)
- [REST Resource: v1.users.settings.cse.keypairs](https://developers.google.com/workspace/gmail/api/reference/rest#v1.users.settings.cse.keypairs)
- [REST Resource: v1.users.settings.delegates](https://developers.google.com/workspace/gmail/api/reference/rest#v1.users.settings.delegates)
- [REST Resource: v1.users.settings.filters](https://developers.google.com/workspace/gmail/api/reference/rest#v1.users.settings.filters)
- [REST Resource: v1.users.settings.forwardingAddresses](https://developers.google.com/workspace/gmail/api/reference/rest#v1.users.settings.forwardingAddresses)
- [REST Resource: v1.users.settings.sendAs](https://developers.google.com/workspace/gmail/api/reference/rest#v1.users.settings.sendAs)
- [REST Resource: v1.users.settings.sendAs.smimeInfo](https://developers.google.com/workspace/gmail/api/reference/rest#v1.users.settings.sendAs.smimeInfo)
- [REST Resource: v1.users.threads](https://developers.google.com/workspace/gmail/api/reference/rest#v1.users.threads)

## Service: gmail.googleapis.com

To call this service, we recommend that you use the Google-provided [client libraries](https://cloud.google.com/apis/docs/client-libraries-explained). If your application needs to use your own libraries to call this service, use the following information when you make the API requests.

### Discovery document

A [Discovery Document](https://developers.google.com/discovery/v1/reference/apis) is a machine-readable specification for describing and consuming REST APIs. It is used to build client libraries, IDE plugins, and other tools that interact with Google APIs. One service may provide multiple discovery documents. This service provides the following discovery document:

- <https://gmail.googleapis.com/$discovery/rest?version=v1>

### Service endpoint

A [service endpoint](https://cloud.google.com/apis/design/glossary#api_service_endpoint) is a base URL that specifies the network address of an API service. One service might have multiple service endpoints. This service has the following service endpoint and all URIs below are relative to this service endpoint:

- `https://gmail.googleapis.com`

## REST Resource: [v1.users](https://developers.google.com/workspace/gmail/api/reference/rest/v1/users)

| Methods ||
|---|---|
| `https://developers.google.com/workspace/gmail/api/reference/rest/v1/users/getProfile` | `GET /gmail/v1/users/{userId}/profile` Gets the current user's Gmail profile. |
| `https://developers.google.com/workspace/gmail/api/reference/rest/v1/users/stop` | `POST /gmail/v1/users/{userId}/stop` Turn off push notification delivery for the given user mailbox. |
| `https://developers.google.com/workspace/gmail/api/reference/rest/v1/users/watch` | `POST /gmail/v1/users/{userId}/watch` Set up or update a push notification watch on the given user mailbox. |

## REST Resource: [v1.users.drafts](https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.drafts)

| Methods ||
|---|---|
| `https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.drafts/create` | `POST /gmail/v1/users/{userId}/drafts` `POST /upload/gmail/v1/users/{userId}/drafts` Creates a draft with the `DRAFT` label. |
| `https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.drafts/delete` | `DELETE /gmail/v1/users/{userId}/drafts/{id}` Immediately and permanently deletes the specified draft. |
| `https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.drafts/get` | `GET /gmail/v1/users/{userId}/drafts/{id}` Gets the specified draft. |
| `https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.drafts/list` | `GET /gmail/v1/users/{userId}/drafts` Lists the drafts in the user's mailbox. |
| `https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.drafts/send` | `POST /gmail/v1/users/{userId}/drafts/send` `POST /upload/gmail/v1/users/{userId}/drafts/send` Sends the specified, existing draft to the recipients in the `To`, `Cc`, and `Bcc` headers. |
| `https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.drafts/update` | `PUT /gmail/v1/users/{userId}/drafts/{id}` `PUT /upload/gmail/v1/users/{userId}/drafts/{id}` Replaces a draft's content. |

## REST Resource: [v1.users.history](https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.history)

| Methods ||
|---|---|
| `https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.history/list` | `GET /gmail/v1/users/{userId}/history` Lists the history of all changes to the given mailbox. |

## REST Resource: [v1.users.labels](https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.labels)

| Methods ||
|---|---|
| `https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.labels/create` | `POST /gmail/v1/users/{userId}/labels` Creates a label. |
| `https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.labels/delete` | `DELETE /gmail/v1/users/{userId}/labels/{id}` Immediately and permanently deletes the specified label and removes it from any messages and threads that it's applied to. |
| `https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.labels/get` | `GET /gmail/v1/users/{userId}/labels/{id}` Gets the specified label. |
| `https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.labels/list` | `GET /gmail/v1/users/{userId}/labels` Lists all labels in the user's mailbox. |
| `https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.labels/patch` | `PATCH /gmail/v1/users/{userId}/labels/{id}` Patch the specified label. |
| `https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.labels/update` | `PUT /gmail/v1/users/{userId}/labels/{id}` Updates the specified label. |

## REST Resource: [v1.users.messages](https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.messages)

| Methods ||
|---|---|
| `https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.messages/batchDelete` | `POST /gmail/v1/users/{userId}/messages/batchDelete` Deletes many messages by message ID. |
| `https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.messages/batchModify` | `POST /gmail/v1/users/{userId}/messages/batchModify` Modifies the labels on the specified messages. |
| `https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.messages/delete` | `DELETE /gmail/v1/users/{userId}/messages/{id}` Immediately and permanently deletes the specified message. |
| `https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.messages/get` | `GET /gmail/v1/users/{userId}/messages/{id}` Gets the specified message. |
| `https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.messages/import` | `POST /gmail/v1/users/{userId}/messages/import` `POST /upload/gmail/v1/users/{userId}/messages/import` Imports a message into only this user's mailbox, with standard email delivery scanning and classification similar to receiving via SMTP. |
| `https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.messages/insert` | `POST /gmail/v1/users/{userId}/messages` `POST /upload/gmail/v1/users/{userId}/messages` Directly inserts a message into only this user's mailbox similar to `IMAP APPEND`, bypassing most scanning and classification. |
| `https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.messages/list` | `GET /gmail/v1/users/{userId}/messages` Lists the messages in the user's mailbox. |
| `https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.messages/modify` | `POST /gmail/v1/users/{userId}/messages/{id}/modify` Modifies the labels on the specified message. |
| `https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.messages/send` | `POST /gmail/v1/users/{userId}/messages/send` `POST /upload/gmail/v1/users/{userId}/messages/send` Sends the specified message to the recipients in the `To`, `Cc`, and `Bcc` headers. |
| `https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.messages/trash` | `POST /gmail/v1/users/{userId}/messages/{id}/trash` Moves the specified message to the trash. |
| `https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.messages/untrash` | `POST /gmail/v1/users/{userId}/messages/{id}/untrash` Removes the specified message from the trash. |

## REST Resource: [v1.users.messages.attachments](https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.messages.attachments)

| Methods ||
|---|---|
| `https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.messages.attachments/get` | `GET /gmail/v1/users/{userId}/messages/{messageId}/attachments/{id}` Gets the specified message attachment. |

## REST Resource: [v1.users.settings](https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.settings)

| Methods ||
|---|---|
| `https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.settings/getAutoForwarding` | `GET /gmail/v1/users/{userId}/settings/autoForwarding` Gets the auto-forwarding setting for the specified account. |
| `https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.settings/getImap` | `GET /gmail/v1/users/{userId}/settings/imap` Gets IMAP settings. |
| `https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.settings/getLanguage` | `GET /gmail/v1/users/{userId}/settings/language` Gets language settings. |
| `https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.settings/getPop` | `GET /gmail/v1/users/{userId}/settings/pop` Gets POP settings. |
| `https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.settings/getVacation` | `GET /gmail/v1/users/{userId}/settings/vacation` Gets vacation responder settings. |
| `https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.settings/updateAutoForwarding` | `PUT /gmail/v1/users/{userId}/settings/autoForwarding` Updates the auto-forwarding setting for the specified account. |
| `https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.settings/updateImap` | `PUT /gmail/v1/users/{userId}/settings/imap` Updates IMAP settings. |
| `https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.settings/updateLanguage` | `PUT /gmail/v1/users/{userId}/settings/language` Updates language settings. |
| `https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.settings/updatePop` | `PUT /gmail/v1/users/{userId}/settings/pop` Updates POP settings. |
| `https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.settings/updateVacation` | `PUT /gmail/v1/users/{userId}/settings/vacation` Updates vacation responder settings. |

## REST Resource: [v1.users.settings.cse.identities](https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.settings.cse.identities)

| Methods ||
|---|---|
| `https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.settings.cse.identities/create` | `POST /gmail/v1/users/{userId}/settings/cse/identities` Creates and configures a client-side encryption identity that's authorized to send mail from the user account. |
| `https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.settings.cse.identities/delete` | `DELETE /gmail/v1/users/{userId}/settings/cse/identities/{cseEmailAddress}` Deletes a client-side encryption identity. |
| `https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.settings.cse.identities/get` | `GET /gmail/v1/users/{userId}/settings/cse/identities/{cseEmailAddress}` Retrieves a client-side encryption identity configuration. |
| `https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.settings.cse.identities/list` | `GET /gmail/v1/users/{userId}/settings/cse/identities` Lists the client-side encrypted identities for an authenticated user. |
| `https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.settings.cse.identities/patch` | `PATCH /gmail/v1/users/{userId}/settings/cse/identities/{emailAddress}` Associates a different key pair with an existing client-side encryption identity. |

## REST Resource: [v1.users.settings.cse.keypairs](https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.settings.cse.keypairs)

| Methods ||
|---|---|
| `https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.settings.cse.keypairs/create` | `POST /gmail/v1/users/{userId}/settings/cse/keypairs` Creates and uploads a client-side encryption S/MIME public key certificate chain and private key metadata for the authenticated user. |
| `https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.settings.cse.keypairs/disable` | `POST /gmail/v1/users/{userId}/settings/cse/keypairs/{keyPairId}:disable` Turns off a client-side encryption key pair. |
| `https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.settings.cse.keypairs/enable` | `POST /gmail/v1/users/{userId}/settings/cse/keypairs/{keyPairId}:enable` Turns on a client-side encryption key pair that was turned off. |
| `https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.settings.cse.keypairs/get` | `GET /gmail/v1/users/{userId}/settings/cse/keypairs/{keyPairId}` Retrieves an existing client-side encryption key pair. |
| `https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.settings.cse.keypairs/list` | `GET /gmail/v1/users/{userId}/settings/cse/keypairs` Lists client-side encryption key pairs for an authenticated user. |
| `https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.settings.cse.keypairs/obliterate` | `POST /gmail/v1/users/{userId}/settings/cse/keypairs/{keyPairId}:obliterate` Deletes a client-side encryption key pair permanently and immediately. |

## REST Resource: [v1.users.settings.delegates](https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.settings.delegates)

| Methods ||
|---|---|
| `https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.settings.delegates/create` | `POST /gmail/v1/users/{userId}/settings/delegates` Adds a delegate with its verification status set directly to `accepted`, without sending any verification email. |
| `https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.settings.delegates/delete` | `DELETE /gmail/v1/users/{userId}/settings/delegates/{delegateEmail}` Removes the specified delegate (which can be of any verification status), and revokes any verification that may have been required for using it. |
| `https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.settings.delegates/get` | `GET /gmail/v1/users/{userId}/settings/delegates/{delegateEmail}` Gets the specified delegate. |
| `https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.settings.delegates/list` | `GET /gmail/v1/users/{userId}/settings/delegates` Lists the delegates for the specified account. |

## REST Resource: [v1.users.settings.filters](https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.settings.filters)

| Methods ||
|---|---|
| `https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.settings.filters/create` | `POST /gmail/v1/users/{userId}/settings/filters` Creates a filter. |
| `https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.settings.filters/delete` | `DELETE /gmail/v1/users/{userId}/settings/filters/{id}` Immediately and permanently deletes the specified filter. |
| `https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.settings.filters/get` | `GET /gmail/v1/users/{userId}/settings/filters/{id}` Gets a filter. |
| `https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.settings.filters/list` | `GET /gmail/v1/users/{userId}/settings/filters` Lists the message filters of a Gmail user. |

## REST Resource: [v1.users.settings.forwardingAddresses](https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.settings.forwardingAddresses)

| Methods ||
|---|---|
| `https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.settings.forwardingAddresses/create` | `POST /gmail/v1/users/{userId}/settings/forwardingAddresses` Creates a forwarding address. |
| `https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.settings.forwardingAddresses/delete` | `DELETE /gmail/v1/users/{userId}/settings/forwardingAddresses/{forwardingEmail}` Deletes the specified forwarding address and revokes any verification that may have been required. |
| `https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.settings.forwardingAddresses/get` | `GET /gmail/v1/users/{userId}/settings/forwardingAddresses/{forwardingEmail}` Gets the specified forwarding address. |
| `https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.settings.forwardingAddresses/list` | `GET /gmail/v1/users/{userId}/settings/forwardingAddresses` Lists the forwarding addresses for the specified account. |

## REST Resource: [v1.users.settings.sendAs](https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.settings.sendAs)

| Methods ||
|---|---|
| `https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.settings.sendAs/create` | `POST /gmail/v1/users/{userId}/settings/sendAs` Creates a custom "from" send-as alias. |
| `https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.settings.sendAs/delete` | `DELETE /gmail/v1/users/{userId}/settings/sendAs/{sendAsEmail}` Deletes the specified send-as alias. |
| `https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.settings.sendAs/get` | `GET /gmail/v1/users/{userId}/settings/sendAs/{sendAsEmail}` Gets the specified send-as alias. |
| `https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.settings.sendAs/list` | `GET /gmail/v1/users/{userId}/settings/sendAs` Lists the send-as aliases for the specified account. |
| `https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.settings.sendAs/patch` | `PATCH /gmail/v1/users/{userId}/settings/sendAs/{sendAsEmail}` Patch the specified send-as alias. |
| `https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.settings.sendAs/update` | `PUT /gmail/v1/users/{userId}/settings/sendAs/{sendAsEmail}` Updates a send-as alias. |
| `https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.settings.sendAs/verify` | `POST /gmail/v1/users/{userId}/settings/sendAs/{sendAsEmail}/verify` Sends a verification email to the specified send-as alias address. |

## REST Resource: [v1.users.settings.sendAs.smimeInfo](https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.settings.sendAs.smimeInfo)

| Methods ||
|---|---|
| `https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.settings.sendAs.smimeInfo/delete` | `DELETE /gmail/v1/users/{userId}/settings/sendAs/{sendAsEmail}/smimeInfo/{id}` Deletes the specified S/MIME config for the specified send-as alias. |
| `https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.settings.sendAs.smimeInfo/get` | `GET /gmail/v1/users/{userId}/settings/sendAs/{sendAsEmail}/smimeInfo/{id}` Gets the specified S/MIME config for the specified send-as alias. |
| `https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.settings.sendAs.smimeInfo/insert` | `POST /gmail/v1/users/{userId}/settings/sendAs/{sendAsEmail}/smimeInfo` Insert (upload) the given S/MIME config for the specified send-as alias. |
| `https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.settings.sendAs.smimeInfo/list` | `GET /gmail/v1/users/{userId}/settings/sendAs/{sendAsEmail}/smimeInfo` Lists S/MIME configs for the specified send-as alias. |
| `https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.settings.sendAs.smimeInfo/setDefault` | `POST /gmail/v1/users/{userId}/settings/sendAs/{sendAsEmail}/smimeInfo/{id}/setDefault` Sets the default S/MIME config for the specified send-as alias. |

## REST Resource: [v1.users.threads](https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.threads)

| Methods ||
|---|---|
| `https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.threads/delete` | `DELETE /gmail/v1/users/{userId}/threads/{id}` Immediately and permanently deletes the specified thread. |
| `https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.threads/get` | `GET /gmail/v1/users/{userId}/threads/{id}` Gets the specified thread. |
| `https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.threads/list` | `GET /gmail/v1/users/{userId}/threads` Lists the threads in the user's mailbox. |
| `https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.threads/modify` | `POST /gmail/v1/users/{userId}/threads/{id}/modify` Modifies the labels applied to the thread. |
| `https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.threads/trash` | `POST /gmail/v1/users/{userId}/threads/{id}/trash` Moves the specified thread to the trash. |
| `https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.threads/untrash` | `POST /gmail/v1/users/{userId}/threads/{id}/untrash` Removes the specified thread from the trash. |


