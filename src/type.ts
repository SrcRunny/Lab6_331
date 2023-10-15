export interface EventItem{
    id: number
    category: string
    title: string
    description: string
    location: string
    date: string
    time: string
    organizer: EventOrganizer
    images: string[]
    petsAllowed: boolean
}

export interface EventOrganizer{
      id: number
      name: string
      roles: string[]
    }
    