import type { BidItem } from "./bid"
export interface AuctionItem{
    id: number
    description: string
    type: string
    bids: BidItem
    successfulbid: AuctionItemSuccessfulDTO

}

export interface AuctionItemSuccessfulDTO{
    id: number
    amount: number
    datetime: Date
}