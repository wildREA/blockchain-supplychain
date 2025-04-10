// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SupplyChain {
    struct Order {
        uint256 id;
        string product;
        uint256 quantity;
        address owner;
        bool fulfilled;
    }
    
    // Mapping from order ID to Order
    mapping(uint256 => Order) public orders;
    
    // Counter to generate unique order IDs
    uint256 public orderCount = 0;
    
    // Events
    event OrderCreated(uint256 id, string product, uint256 quantity, address owner);
    event OrderFulfilled(uint256 id);
    
    // Create a new order
    function createOrder(string memory _product, uint256 _quantity) public returns (uint256) {
        orderCount++;
        
        orders[orderCount] = Order({
            id: orderCount,
            product: _product,
            quantity: _quantity,
            owner: msg.sender,
            fulfilled: false
        });
        
        emit OrderCreated(orderCount, _product, _quantity, msg.sender);
        return orderCount;
    }
    
    // Mark an order as fulfilled
    function fulfillOrder(uint256 _orderId) public {
        require(_orderId > 0 && _orderId <= orderCount, "Invalid order ID");
        Order storage order = orders[_orderId];
        
        // Add any necessary validation (e.g., only certain roles can fulfill)
        // require(msg.sender == someAuthorizedRole, "Not authorized");
        
        order.fulfilled = true;
        emit OrderFulfilled(_orderId);
    }
    
    // Get a specific order
    function getOrder(uint256 _orderId) public view returns (
        uint256 id, 
        string memory product, 
        uint256 quantity, 
        address owner, 
        bool fulfilled
    ) {
        require(_orderId > 0 && _orderId <= orderCount, "Invalid order ID");
        Order storage order = orders[_orderId];
        
        return (
            order.id,
            order.product,
            order.quantity,
            order.owner,
            order.fulfilled
        );
    }
    
    // Get total number of orders
    function getOrderCount() public view returns (uint256) {
        return orderCount;
    }
}
