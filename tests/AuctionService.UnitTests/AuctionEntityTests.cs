using AuctionService.Entities;

namespace AuctionService.UnitTests;

public class AuctionEntityTests
{
    [Fact]
    public void HasReservePrice_ReservePriceGtZero_True()
    {
        var auction = new Auction
        {
            Id= Guid.NewGuid(),
            ReservePrice = 1
        };

        var result = auction.HasReservePrice();

        Assert.True(result);
    }

    [Fact]
    public void HasReservePrice_ReservePriceIsZero_True()
    {
        var auction = new Auction
        {
            Id= Guid.NewGuid(),
            ReservePrice = 0
        };

        var result = auction.HasReservePrice();

        Assert.False(result);
    }
}