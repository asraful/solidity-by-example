pragma solidity ^0.4.23;

/*
@author : asraful
*/

contract Hello {
    
    /*  
    behind the scene this will create a 
    similar method like getMessage(), as we put public 
    access modefier
    */
    
    string public greetings;

    constructor(string initialMessage) public {
        greetings = initialMessage;
    }
    
    function setMessage(string newMessage) public{
        greetings = newMessage;
    }

    //view : this function returns data and 
    //does not modify the contracts data    

    function getMessage() public view returns (string) {
        return greetings;
    }

}