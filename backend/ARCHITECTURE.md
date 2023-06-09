# Database Architecture

## Table of Contents

- [User](#user)

## User

| Field | Type | Description |
| ----- | ---- | ----------- |
| id | ObjectId | Unique identifier for the user |
| email | String | Email of the user |
| password | String | Password of the user |
| name | String | First name of the user |
| summary | String | Summary of the user |
| social_links | Array[SocialLinks] | Social links of the user |
| experience | Array[Experience] | Experience of the user |
| skills | Array[String] | Skills of the user |
| organization | ObjectId | Organization of the user |
| created_at | DateTime | Date and time of user creation |

## Organization

| Field | Type | Description |
| ----- | ---- | ----------- |
| id | ObjectId | Unique identifier for the organization |
| name | String | Name of the organization |
| description | String | Description of the organization |
| created_by | Integer | User who created the organization |
| admins | Array[ObjectId] | Admins of the organization |
| members | Array[ObjectId] | Members of the organization |
| created_at | DateTime | Date and time of organization creation |
