export interface EventItem{
    id: number
    category: string
    title: string
    description: string
    location: string
    date: string
    time: string
    organizer: EventOrganizer
    petsAllowed: boolean
}

export interface EventOrganizer{
      id: number
      name: string
    }
    