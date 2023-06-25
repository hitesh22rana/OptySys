# Database Architecture

## Table of Contents

- [User](#user)
- [Organization](#organization)
- [Opportunity](#opportunity)

## User

| Field | Type | Description |
| ----- | ---- | ----------- |
| id | ObjectId | Unique identifier for the user |
| email | String | Email of the user |
| password | String | Password of the user |
| name | String | First name of the user |
| summary | String | Summary of the user |
| social_links | Array[SocialLinks] | Social links of the user |
| experiences | Array[Experience] | Experience of the user |
| skills | Array[String] | Skills of the user |
| achievements | Array[String] | Achievements of the user |
| organizations | Array[ObjectId] | Organization of the user |
| opportunities | Array[ObjectId] | Opportunities of the user |
| activated | Boolean | Whether the user is activated or not |
| created_at | DateTime | Date and time of user creation |

## Organization

| Field | Type | Description |
| ----- | ---- | ----------- |
| id | ObjectId | Unique identifier for the organization |
| name | String | Name of the organization |
| description | String | Description of the organization |
| private | Boolean | Whether the organization is private or not |
| created_by | Integer | User who created the organization |
| admins | Array[ObjectId] | Admins of the organization |
| members | Array[ObjectId] | Members of the organization |
| opportunities | Array[ObjectId] | Opportunities for the members of the organization |
| created_at | DateTime | Date and time of organization creation |

## Opportunity

| Field | Type | Description |
| ----- | ---- | ----------- |
| id | ObjectId | Unique identifier for the opportunity |
| title | String | Title of the opportunity |
| company | String | Company name |
| description | String | Description of the opportunity |
| location | String | Location of the opportunity |
| link | String | Link to the opportunity |
| requirements | Array[String] | List of requirements for the opportunity |
| organization_id | ObjectId | Id of the organization |
| created_by | ObjectId | Creator of the organization |
| created_at | DateTime | Created at timestamp of the organization |
