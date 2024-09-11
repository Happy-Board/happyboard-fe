export const HISTORY_ACTIVITIES_CODE = {
    CI01: 'You have created an idea',
    SI01: 'You have saved a draft',
    EI01: 'You have edited your idea',
    DI01: 'You have deleted your idea',
    VI01: 'You have voted for an idea',
    CC01: 'You have commented on an idea',
    EC01: 'You have edited the comment',
    DC01: 'You have delete your comment',
    RC01: 'You replied to a comment',
    RC02: 'You reacted to a comment',
}

export const NOTIFICATIONS_CODE = {
    idea: {
        comment: 'NI01',
        up: 'NI02', // up vote
    },
    comment: {
        reaction: 'NC01'
    }
}


export const SANITIZE_ALLOWED_TAGS = []