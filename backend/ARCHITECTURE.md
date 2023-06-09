# Database Architecture

## Table of Contents

- [User](#user)

## User

| Field | Type | Description |
| ----- | ---- | ----------- |
| id | Integer | Unique identifier for the user |
| email | String | Email of the user |
| password | String | Password of the user |
| name | String | First name of the user |
| summary | String | Summary of the user |
| social_links | Array[SocialLinks] | Social links of the user |
| role | String | Role of the user |
| experience | Array[Experience] | Experience of the user |
| skills | Array[String] | Skills of the user |
| organization | Integer | Organization of the user |
| created_at | DateTime | Date and time of user creation |
| updated_at | DateTime | Date and time of user update |
