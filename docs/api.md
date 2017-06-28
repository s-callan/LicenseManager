# LicenseManager API documentation

## Clients

### List all clients

#### Call

GET /lic/clients

### Returns

Returns list of { ID, name }

### Get client details

#### Call

GET /lic/clients/{id}

#### Returns

*   name: name of client
*   ID: Client identifier
*   description: description of customer.
*   licenses: list of license IDs.

### Create client

#### Call

POST /lic/clients

*   name: name of client
*   ID: ID of client
*   description: Description of client

### Update client

#### Call

POST /lic/clients/{id}

*   name: name of client
*   description: Description of client

## Licenses

### List all licenses

#### Call

GET /lic/licenses

### Create license

#### Call

PUT /lic/licenses

*   system_id: identifier. Unique for this client
*   client_id: Client identifier.
*   level: `bronze`, `silver` or `gold`

### Get License details

#### Call

GET /lic/licences/{id}

### Update full license.

PUT /lic/licenses/{id}

### Update some fields in license.

PATCH /lic/licenses/{id}