const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SupplyChain", function () {
    let SupplyChain;
    let supplyChain;
    let owner;
    let addr1;
    let addr2;

    beforeEach(async function () {
        SupplyChain = await ethers.getContractFactory("SupplyChain");
        [owner, addr1, addr2] = await ethers.getSigners();
        supplyChain = await SupplyChain.deploy();
    });

    describe("Order Management", function () {
        it("Should create an order", async function () {
            await supplyChain.createOrder("Product A", 100);
            const order = await supplyChain.orders(1);
            expect(order.product).to.equal("Product A");
            expect(order.quantity).to.equal(100);
            expect(order.owner).to.equal(owner.address);
        });

        it("Should retrieve an order", async function () {
            await supplyChain.createOrder("Product A", 100);
            await supplyChain.createOrder("Product B", 200);
            const order = await supplyChain.orders(2);
            expect(order.product).to.equal("Product B");
            expect(order.quantity).to.equal(200);
            expect(order.owner).to.equal(owner.address);
        });

        it("Should fulfill an order", async function () {
            await supplyChain.createOrder("Product A", 100);
            await supplyChain.fulfillOrder(1);
            const order = await supplyChain.orders(1);
            expect(order.fulfilled).to.equal(true);
        });

        it("Should get order details", async function () {
            await supplyChain.createOrder("Product A", 100);
            const [id, product, quantity, orderOwner, fulfilled] = await supplyChain.getOrder(1);
            expect(id).to.equal(1);
            expect(product).to.equal("Product A");
            expect(quantity).to.equal(100);
            expect(orderOwner).to.equal(owner.address);
            expect(fulfilled).to.equal(false);
        });
    });
});
