type tag = 'Work' | 'Personal' | 'Meeting' | 'Shopping' | 'Todo'

export interface Note {
    id: number,
    title: string,
    content: string,
    tag: tag
}

export interface newNote {
    title: string,
    content: string,
    tag: tag,
}

// {
    // "notes": [
    //     {
    //     "id": 1,
    //     "title": "Sample Note",
    //     "content": "This is a sample note content.",
    //     "createdAt": "2022-01-01T00:00:00Z",
    //     "updatedAt": "2022-01-01T00:00:00Z",
    //     "tag": "Todo"
    //     }
    // ],
    // "totalPages": 5
// }