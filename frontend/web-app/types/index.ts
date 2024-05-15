export type PagedResult<T> = {
    results: T[]
    pageCount: number
    totalCount: number
}

export type Auction = {
    reservePrice: number
    seller: string
    winner?: string
    soldAmount: number
    currentHighBid: number
    createdAt: string
    updatedAt: string
    auctionEnd: string
    status: string
    make: string
    model: string
    year: number
    color: string
    mileage: number
    imageUrl: string
    id: string
}

export type Bid = {
    amount: number
    bidder: string
    auctionId: string
    id: string
    bidTime: string
    bidStatus: string
}

export type AuctionFinished = {
    auctionId: string
    winner?: string
    itemSold: boolean
    amount?: number,
    seller: string
}